import type { CollectionConfig } from 'payload'

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

export const Termine: CollectionConfig = {
  slug: 'termine',
  labels: {
    singular: 'Termin',
    plural: 'Termine',
  },
  admin: {
    group: 'CRM',
    useAsTitle: 'customerName',
    defaultColumns: ['date', 'startTime', 'customerName', 'makler', 'status'],
    description: 'Besichtigungstermine und Kundentermine verwalten.',
  },
  access: {
    create: ({ req }) => {
      const user = getUser(req.user)
      return Boolean(
        user?.role === 'admin' || user?.role === 'editor' || user?.role === 'makler',
      )
    },
    read: ({ req }) => {
      const user = getUser(req.user)
      if (!user) return false
      if (user.role === 'admin' || user.role === 'editor') return true
      if (user.role === 'makler') {
        const mid = getMaklerProfileId(user)
        if (!mid) return false
        return { makler: { equals: mid } }
      }
      return false
    },
    update: ({ req }) => {
      const user = getUser(req.user)
      if (!user) return false
      if (user.role === 'admin' || user.role === 'editor') return true
      if (user.role === 'makler') {
        const mid = getMaklerProfileId(user)
        if (!mid) return false
        return { makler: { equals: mid } }
      }
      return false
    },
    delete: ({ req }) => {
      const user = getUser(req.user)
      return Boolean(user?.role === 'admin' || user?.role === 'editor')
    },
  },
  fields: [
    // Tabs (main content)
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Termin',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'date',
                  type: 'date',
                  label: 'Datum',
                  required: true,
                  admin: {
                    date: {
                      displayFormat: 'dd.MM.yyyy',
                    },
                  },
                },
                {
                  name: 'startTime',
                  type: 'text',
                  label: 'Uhrzeit',
                  required: true,
                  admin: {
                    placeholder: '09:00',
                    description: 'Format: HH:MM (z.B. 09:00)',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'durationMinutes',
                  type: 'number',
                  label: 'Dauer (Min.)',
                  defaultValue: 30,
                  admin: {
                    description: 'z.B. 30, 60, 90',
                  },
                },
                {
                  name: 'timezone',
                  type: 'text',
                  label: 'Zeitzone',
                  defaultValue: 'Europe/Berlin',
                },
              ],
            },
            {
              name: 'makler',
              type: 'relationship',
              label: 'Makler',
              relationTo: 'makler',
              required: true,
              admin: {
                description: 'Zust\u00e4ndiger Makler f\u00fcr diesen Termin',
              },
            },
            {
              name: 'listing',
              type: 'relationship',
              label: 'Immobilie (optional)',
              relationTo: 'immobilien',
              admin: {
                description: 'Besichtigungsobjekt (falls zutreffend)',
              },
            },
          ],
        },
        {
          label: 'Kunde',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'customerName',
                  type: 'text',
                  label: 'Name',
                  required: true,
                },
                {
                  name: 'customerEmail',
                  type: 'email',
                  label: 'E-Mail',
                  required: true,
                },
              ],
            },
            {
              name: 'customerPhone',
              type: 'text',
              label: 'Telefon (optional)',
            },
            {
              name: 'customerMessage',
              type: 'textarea',
              label: 'Nachricht des Kunden',
            },
          ],
        },
        {
          label: 'Notizen',
          fields: [
            {
              name: 'internalNotes',
              type: 'textarea',
              label: 'Interne Notizen',
              admin: {
                description: 'Nur intern sichtbar',
              },
            },
            {
              name: 'sourceAnfrage',
              type: 'relationship',
              label: 'Aus Anfrage erstellt',
              relationTo: 'anfragen',
              admin: {
                description: 'Zugeh\u00f6rige Kontaktanfrage, aus der dieser Termin entstand (optional)',
              },
            },
          ],
        },
      ],
    },
    // Sidebar
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'geplant',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Geplant', value: 'geplant' },
        { label: 'Best\u00e4tigt', value: 'bestaetigt' },
        { label: 'Absolviert', value: 'absolviert' },
        { label: 'Storniert', value: 'storniert' },
      ],
    },
  ],
}
