import type { CollectionAfterChangeHook, CollectionConfig } from 'payload'

const windowToTime: Record<string, string> = {
  '09-12': '09:00',
  '12-15': '12:00',
  '15-18': '15:00',
  '18-20': '18:00',
}

// Creates a Termin whenever a new Anfrage arrives with a preferredDate.
// makler is optional — left empty until a Makler "takes over" the Anfrage.
const autoCreateTermin: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== 'create') return doc
  if (!doc.preferredDate) return doc

  const maklerId =
    doc.assignedMakler != null
      ? typeof doc.assignedMakler === 'object'
        ? doc.assignedMakler.id
        : doc.assignedMakler
      : undefined

  const startTime: string =
    (typeof doc.preferredTime === 'string' && doc.preferredTime.trim()) ||
    windowToTime[doc.preferredTimeWindow as string] ||
    '09:00'

  try {
    await req.payload.create({
      collection: 'termine',
      overrideAccess: true, // hook runs in system context — no authenticated user on public form submissions
      data: {
        date: doc.preferredDate,
        startTime,
        durationMinutes: doc.durationMinutes ?? 30,
        ...(maklerId != null ? { makler: maklerId } : {}),
        customerName: doc.name,
        customerEmail: doc.email,
        customerPhone: doc.phone ?? '',
        customerMessage: doc.message ?? '',
        sourceAnfrage: doc.id,
        status: 'geplant',
      },
      req,
    })
  } catch (err) {
    req.payload.logger.error({ err, msg: 'autoCreateTermin: failed to create Termin from Anfrage' })
  }

  return doc
}

// When a Makler is assigned (or changed) on an Anfrage, sync the change to the linked Termin.
const syncTerminMakler: CollectionAfterChangeHook = async ({ doc, previousDoc, operation, req }) => {
  if (operation !== 'update') return doc

  const prevId =
    previousDoc?.assignedMakler == null
      ? null
      : typeof previousDoc.assignedMakler === 'object'
        ? previousDoc.assignedMakler?.id
        : previousDoc.assignedMakler
  const newId =
    doc.assignedMakler == null
      ? null
      : typeof doc.assignedMakler === 'object'
        ? doc.assignedMakler?.id
        : doc.assignedMakler

  // eslint-disable-next-line eqeqeq
  if (prevId == newId) return doc // no change
  if (newId == null) return doc   // unassigning — don't clear termin.makler

  try {
    const result = await req.payload.find({
      collection: 'termine',
      overrideAccess: true,
      where: { sourceAnfrage: { equals: doc.id } },
      limit: 1,
      req,
    })
    const termin = result.docs[0]
    if (!termin) return doc
    await req.payload.update({
      collection: 'termine',
      overrideAccess: true,
      id: termin.id,
      data: { makler: newId },
      req,
    })
  } catch (err) {
    req.payload.logger.error({ err, msg: 'syncTerminMakler: failed to sync Termin makler' })
  }

  return doc
}

type UserLike = {
  id?: string | number
  role?: 'admin' | 'editor' | 'makler'
  maklerProfile?: string | number | { id: string | number }
} | null

function getUser(reqUser: unknown): UserLike {
  if (!reqUser || typeof reqUser !== 'object') return null
  return reqUser as UserLike
}

function getMaklerProfileId(user: UserLike): string | number | null {
  if (!user) return null
  const mp = user.maklerProfile
  if (!mp) return null
  if (typeof mp === 'object') return mp.id ?? null
  return mp
}

export const Anfragen: CollectionConfig = {
  slug: 'anfragen',
  hooks: {
    afterChange: [autoCreateTermin, syncTerminMakler],
  },
  labels: {
    singular: 'Anfrage',
    plural: 'Anfragen',
  },
  admin: {
    group: 'CRM',
    useAsTitle: 'name',
    defaultColumns: ['name', 'topic', 'status', 'receivedAt', 'assignedMakler'],
    description: 'Eingehende Kontaktanfragen vom Website-Formular.',
  },
  access: {
    create: () => true,
    read: ({ req }) => {
      const user = getUser(req.user)
      if (!user) return false
      // All authenticated roles see all Anfragen (team can cover for each other)
      return user.role === 'admin' || user.role === 'editor' || user.role === 'makler'
    },
    update: ({ req }) => {
      const user = getUser(req.user)
      // Makler can update (change status, take over, add notes) — not just admin/editor
      return Boolean(user?.role === 'admin' || user?.role === 'editor' || user?.role === 'makler')
    },
    delete: ({ req }) => {
      return Boolean(getUser(req.user)?.role === 'admin')
    },
  },
  fields: [
    // Tabs (main content)
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Kontakt',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  label: 'Name',
                  required: true,
                },
                {
                  name: 'email',
                  type: 'email',
                  label: 'E-Mail',
                  required: true,
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'phone',
                  type: 'text',
                  label: 'Telefon',
                },
                {
                  name: 'contactPreference',
                  type: 'select',
                  label: 'Bevorzugter Kontakt',
                  options: [
                    { label: 'Telefon', value: 'telefon' },
                    { label: 'E-Mail', value: 'email' },
                  ],
                },
              ],
            },
            {
              name: 'topic',
              type: 'select',
              label: 'Thema',
              options: [
                { label: 'Allgemein', value: 'allgemein' },
                { label: 'Expos\u00e9 / Unterlagen', value: 'expose' },
                { label: 'Immobilie kaufen', value: 'kaufen' },
                { label: 'Neubau / Kauf ab Plan', value: 'neubau' },
                { label: 'Verkauf / Vermarktung', value: 'verkauf' },
              ],
            },
          ],
        },
        {
          label: 'Anfrage',
          fields: [
            {
              name: 'message',
              type: 'textarea',
              label: 'Nachricht',
            },
            {
              name: 'callbackRequested',
              type: 'checkbox',
              label: 'R\u00fcckruf gew\u00fcnscht',
              defaultValue: false,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'preferredDate',
                  type: 'date',
                  label: 'Wunschdatum',
                },
                {
                  name: 'preferredTimeWindow',
                  type: 'select',
                  label: 'Zeitfenster',
                  options: [
                    { label: '09:00 \u2013 12:00', value: '09-12' },
                    { label: '12:00 \u2013 15:00', value: '12-15' },
                    { label: '15:00 \u2013 18:00', value: '15-18' },
                    { label: '18:00 \u2013 20:00', value: '18-20' },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'preferredTime',
                  type: 'text',
                  label: 'Uhrzeit (optional)',
                  admin: {
                    placeholder: 'z.B. 10:30',
                  },
                },
                {
                  name: 'durationMinutes',
                  type: 'number',
                  label: 'Dauer (Min.)',
                },
              ],
            },
          ],
        },
        {
          label: 'Immobilie',
          fields: [
            {
              name: 'listing',
              type: 'relationship',
              label: 'Immobilie',
              relationTo: 'immobilien',
              admin: {
                description: 'Zugeh\u00f6rige Immobilie (optional)',
              },
            },
            {
              name: 'listingTitle',
              type: 'text',
              label: 'Objekttitel (denormalisiert)',
              admin: {
                description: 'Automatisch vom Kontaktformular \u00fcbernommener Titel.',
                readOnly: true,
              },
            },
          ],
        },
      ],
    },
    // Sidebar fields
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'neu',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Neu', value: 'neu' },
        { label: 'Gelesen', value: 'gelesen' },
        { label: 'Kontaktiert', value: 'kontaktiert' },
        { label: 'Termin vereinbart', value: 'termin_vereinbart' },
        { label: 'Bearbeitet', value: 'bearbeitet' },
        { label: 'Archiviert', value: 'archiviert' },
      ],
    },
    {
      name: 'assignedMakler',
      type: 'relationship',
      label: 'Zust\u00e4ndiger Makler',
      relationTo: 'makler',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      label: 'Interne Notizen',
      access: {
        read: ({ req }) => {
          const role = getUser(req.user)?.role
          return role === 'admin' || role === 'editor'
        },
      },
      admin: {
        position: 'sidebar',
        condition: (_, __, { user }) => (user as any)?.role !== 'makler',
      },
    },
    {
      name: 'receivedAt',
      type: 'date',
      label: 'Eingegangen am',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: {
          displayFormat: 'dd.MM.yyyy HH:mm',
        },
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      label: 'IP-Adresse',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'userAgent',
      type: 'text',
      label: 'User-Agent',
      admin: {
        hidden: true,
      },
    },
  ],
}
