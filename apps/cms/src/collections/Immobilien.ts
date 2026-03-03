import type { Access, CollectionConfig } from 'payload'

type Role = 'admin' | 'editor' | 'makler'

type UserLike = {
  id?: string | number
  role?: Role
} | null

function getUser(reqUser: unknown): UserLike {
  if (!reqUser || typeof reqUser !== 'object') return null
  return reqUser as UserLike
}

const canEditContent: Access = ({ req }) => {
  const user = getUser(req.user)
  return Boolean(
    user?.role && (user.role === 'admin' || user.role === 'editor' || user.role === 'makler'),
  )
}

const canReadPublishedOrEditors: Access = ({ req }) => {
  const user = getUser(req.user)

  // Admin/Editor/Makler dürfen alles sehen (auch Entwürfe)
  if (user?.role === 'admin' || user?.role === 'editor' || user?.role === 'makler') return true

  // Öffentlich nur veröffentlichte Inhalte
  return { _status: { equals: 'published' } }
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/(^-|-$)/g, '')
}

export const Immobilien: CollectionConfig = {
  slug: 'immobilien',
  labels: {
    singular: 'Immobilie',
    plural: 'Immobilien',
  },
  admin: {
    useAsTitle: 'title',
    // ⚠️ wichtig: NICHT "status" — Payload nutzt intern _status (draft/published)
    defaultColumns: ['title', 'vermarktungsStatus', 'location', 'price', 'updatedAt'],
    description: 'Immobilien verwalten: anlegen, bearbeiten, veröffentlichen.',
  },
  access: {
    read: canReadPublishedOrEditors,
    create: canEditContent,
    update: canEditContent,
    delete: ({ req }) => {
      const user = getUser(req.user)
      return Boolean(user?.role === 'admin')
    },
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basis',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Titel',
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
              label: 'Slug',
              required: true,
              unique: true,
              index: true,
              admin: {
                description: 'Wird automatisch aus dem Titel erzeugt (kann angepasst werden).',
                position: 'sidebar',
              },
              hooks: {
                beforeValidate: [
                  ({ value, data }) => {
                    if (typeof value === 'string' && value.trim().length > 0) return value
                    const title = (data as { title?: unknown } | undefined)?.title
                    if (typeof title === 'string' && title.trim().length > 0) return slugify(title)
                    return value
                  },
                ],
              },
            },

            // ✅ umbenannt: vorher "status" → kollidiert mit Payload enums (_status)
            {
              name: 'vermarktungsStatus',
              type: 'select',
              label: 'Vermarktungsstatus',
              required: true,
              defaultValue: 'verfuegbar',
              options: [
                { label: 'Verfügbar', value: 'verfuegbar' },
                { label: 'Reserviert', value: 'reserviert' },
                { label: 'Verkauft', value: 'verkauft' },
                { label: 'In Bau', value: 'in_bau' },
              ],
              admin: { position: 'sidebar' },
            },

            {
              name: 'location',
              type: 'text',
              label: 'Ort / Region',
              required: true,
            },
            {
              name: 'price',
              type: 'number',
              label: 'Preis (EUR)',
              admin: { description: 'Leer lassen = „Preis auf Anfrage“.' },
            },

            {
              type: 'row',
              fields: [
                { name: 'livingArea', type: 'number', label: 'Wohnfläche (m²)' },
                { name: 'plotArea', type: 'number', label: 'Grundstück (m²)' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'rooms', type: 'number', label: 'Zimmer' },
                { name: 'bedrooms', type: 'number', label: 'Schlafzimmer' },
                { name: 'bathrooms', type: 'number', label: 'Bäder' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'yearBuilt', type: 'number', label: 'Baujahr' },
                { name: 'availability', type: 'text', label: 'Verfügbarkeit' },
              ],
            },
            {
              name: 'badge',
              type: 'text',
              label: 'Badge (optional)',
              admin: { description: 'Kleine Zusatzinfo im Header (z. B. \u201eNeubau\u201c).' },
            },
            {
              name: 'ansprechpartner',
              type: 'relationship',
              label: 'Ansprechpartner (Makler)',
              relationTo: 'makler',
              admin: {
                position: 'sidebar',
                description: 'Makler, der auf der Objektseite angezeigt wird.',
              },
            },
          ],
        },

        {
          label: 'Medien',
          fields: [
            {
              name: 'heroMedia',
              type: 'upload',
              label: 'Hero Medium (Bild/Video)',
              relationTo: 'media',
            },
            {
              name: 'gallery',
              type: 'array',
              label: 'Galerie',
              fields: [
                {
                  name: 'item',
                  type: 'upload',
                  label: 'Medium',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            {
              name: 'documents',
              type: 'group',
              label: 'Dokumente',
              fields: [
                {
                  name: 'exposePdf',
                  type: 'upload',
                  label: 'Exposé (PDF)',
                  relationTo: 'media',
                  filterOptions: {
                    mimeType: { contains: 'pdf' },
                  },
                },
              ],
            },
          ],
        },

        {
          label: 'Inhalte',
          fields: [
            {
              name: 'description',
              type: 'richText',
              label: 'Beschreibung',
            },
            {
              name: 'highlights',
              type: 'array',
              label: 'Highlights',
              fields: [{ name: 'text', type: 'text', label: 'Highlight', required: true }],
            },
            {
              name: 'features',
              type: 'array',
              label: 'Ausstattung',
              fields: [{ name: 'text', type: 'text', label: 'Ausstattungspunkt', required: true }],
            },
          ],
        },

        {
          label: 'Energie',
          fields: [
            {
              name: 'energy',
              type: 'group',
              label: 'Energieausweis',
              fields: [
                {
                  name: 'certificateType',
                  type: 'select',
                  label: 'Ausweistyp',
                  options: [
                    { label: 'Bedarfsausweis', value: 'bedarf' },
                    { label: 'Verbrauchsausweis', value: 'verbrauch' },
                  ],
                },
                { name: 'value', type: 'number', label: 'Endenergie (kWh/(m²a))' },
                { name: 'class', type: 'text', label: 'Energieklasse (A+ … H)' },
                { name: 'carrier', type: 'text', label: 'Energieträger' },
                { name: 'year', type: 'number', label: 'Baujahr laut Ausweis' },
              ],
            },
          ],
        },

        {
          label: 'Provision',
          fields: [
            {
              name: 'buyerCommission',
              type: 'group',
              label: 'Käuferprovision',
              fields: [
                {
                  name: 'kind',
                  type: 'select',
                  label: 'Art',
                  required: true,
                  defaultValue: 'percent',
                  options: [
                    { label: 'Prozent', value: 'percent' },
                    { label: 'Festbetrag', value: 'fixed' },
                  ],
                },
                { name: 'value', type: 'number', label: 'Wert', required: true },
                { name: 'vatIncluded', type: 'checkbox', label: 'inkl. MwSt.' },
                { name: 'vatRate', type: 'number', label: 'MwSt. Satz (%)', defaultValue: 19 },
                { name: 'due', type: 'text', label: 'Fälligkeit (optional)' },
                { name: 'basis', type: 'text', label: 'Berechnungsbasis (optional)' },
                { name: 'note', type: 'textarea', label: 'Hinweis (optional)' },
              ],
            },
          ],
        },

        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              type: 'group',
              label: 'SEO',
              fields: [
                { name: 'metaTitle', type: 'text', label: 'Meta Titel' },
                { name: 'metaDescription', type: 'textarea', label: 'Meta Beschreibung' },
                {
                  name: 'ogImage',
                  type: 'upload',
                  label: 'OG Bild',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
