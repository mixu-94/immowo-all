import type { Access, CollectionConfig } from 'payload'

type Role = 'admin' | 'editor'

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
  return Boolean(user?.role && (user.role === 'admin' || user.role === 'editor'))
}

const canReadPublishedOrEditors: Access = ({ req }) => {
  const user = getUser(req.user)
  if (user?.role === 'admin' || user?.role === 'editor') return true
  return { _status: { equals: 'published' } }
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/(^-|-$)/g, '')
}

export const Referenzen: CollectionConfig = {
  slug: 'referenzen',
  labels: {
    singular: 'Referenz',
    plural: 'Referenzen',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year', 'isFeatured', 'updatedAt'],
    description: 'Referenzprojekte verwalten: Neubau, Sanierung, Verkauf, Projektentwicklung.',
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
            {
              name: 'subtitle',
              type: 'text',
              label: 'Untertitel (optional)',
            },
            {
              name: 'category',
              type: 'select',
              label: 'Kategorie',
              required: true,
              options: [
                { label: 'Neubau', value: 'Neubau' },
                { label: 'Sanierung', value: 'Sanierung' },
                { label: 'Projektentwicklung', value: 'Projektentwicklung' },
                { label: 'Verkauf', value: 'Verkauf' },
                { label: 'Kapitalanlage', value: 'Kapitalanlage' },
                { label: 'Gewerbe', value: 'Gewerbe' },
              ],
              admin: { position: 'sidebar' },
            },
            {
              name: 'year',
              type: 'text',
              label: 'Jahr',
              required: true,
              admin: { position: 'sidebar' },
            },
            {
              name: 'isFeatured',
              type: 'checkbox',
              label: 'Featured',
              defaultValue: false,
              admin: {
                position: 'sidebar',
                description: 'Featured Projekte erscheinen zuerst.',
              },
            },
            {
              name: 'sortOrder',
              type: 'number',
              label: 'Sortierung (optional)',
              admin: {
                position: 'sidebar',
                description: 'Höhere Zahl = weiter oben.',
              },
            },

            {
              name: 'location',
              type: 'group',
              label: 'Standort (diskret)',
              fields: [
                {
                  name: 'region',
                  type: 'text',
                  label: 'Region (z. B. "Schwaben")',
                },
                {
                  name: 'label',
                  type: 'text',
                  label: 'Anzeige-Ort (z. B. "Augsburg (Region)")',
                },
                {
                  name: 'geo',
                  type: 'group',
                  label: 'Geo-Koordinaten (optional, grob)',
                  fields: [
                    { name: 'lat', type: 'number', label: 'Breitengrad' },
                    { name: 'lng', type: 'number', label: 'Längengrad' },
                  ],
                },
              ],
            },

            {
              name: 'description',
              type: 'textarea',
              label: 'Kurzbeschreibung (2–3 Sätze)',
              required: true,
            },

            {
              name: 'highlights',
              type: 'array',
              label: 'Highlights / Badges',
              admin: { description: 'Kurze Schlagworte für Karten und Hero.' },
              fields: [{ name: 'text', type: 'text', label: 'Highlight', required: true }],
            },
          ],
        },

        {
          label: 'Medien',
          fields: [
            {
              name: 'coverImage',
              type: 'upload',
              label: 'Cover-Bild',
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
                {
                  name: 'alt',
                  type: 'text',
                  label: 'Alt-Text (optional)',
                },
              ],
            },
            {
              name: 'documents',
              type: 'group',
              label: 'Dokumente',
              fields: [
                {
                  name: 'caseStudyPdf',
                  type: 'upload',
                  label: 'Case Study (PDF)',
                  relationTo: 'media',
                  filterOptions: { mimeType: { contains: 'pdf' } },
                },
                {
                  name: 'exposeSample',
                  type: 'upload',
                  label: 'Exposé Muster (PDF)',
                  relationTo: 'media',
                  filterOptions: { mimeType: { contains: 'pdf' } },
                },
                {
                  name: 'brochure',
                  type: 'upload',
                  label: 'Broschüre (PDF)',
                  relationTo: 'media',
                  filterOptions: { mimeType: { contains: 'pdf' } },
                },
              ],
            },
          ],
        },

        {
          label: 'Inhalte',
          fields: [
            {
              name: 'facts',
              type: 'group',
              label: 'Eckdaten',
              fields: [
                { name: 'units', type: 'text', label: 'Einheiten (z. B. "6 WE")' },
                { name: 'livingArea', type: 'text', label: 'Wohnfläche (z. B. "165 m²")' },
                { name: 'plotArea', type: 'text', label: 'Grundstück (z. B. "520 m²")' },
                { name: 'rooms', type: 'text', label: 'Zimmer (z. B. "5 Zimmer")' },
                { name: 'buildTime', type: 'text', label: 'Bauzeit (z. B. "11 Monate")' },
                {
                  name: 'status',
                  type: 'select',
                  label: 'Projektstatus',
                  options: [
                    { label: 'Fertiggestellt', value: 'fertiggestellt' },
                    { label: 'Verkauft', value: 'verkauft' },
                    { label: 'Reserviert', value: 'reserviert' },
                    { label: 'In Bau', value: 'in bau' },
                  ],
                },
              ],
            },

            {
              name: 'kpis',
              type: 'array',
              label: 'KPIs (Kacheln)',
              fields: [
                { name: 'label', type: 'text', label: 'Label', required: true },
                { name: 'value', type: 'text', label: 'Wert', required: true },
              ],
            },

            {
              name: 'services',
              type: 'select',
              label: 'Leistungen',
              hasMany: true,
              options: [
                { label: 'Projektentwicklung', value: 'Projektentwicklung' },
                { label: 'Bauträger', value: 'Bauträger' },
                { label: 'Vermarktung', value: 'Vermarktung' },
                { label: 'Sanierung', value: 'Sanierung' },
                { label: 'Architektur', value: 'Architektur' },
                { label: 'Innenausbau', value: 'Innenausbau' },
                { label: 'Finishing', value: 'Finishing' },
                { label: 'Fotografie', value: 'Fotografie' },
                { label: 'Branding', value: 'Branding' },
                { label: 'UI/Website', value: 'UI/Website' },
              ],
            },
          ],
        },

        {
          label: 'Case Study',
          fields: [
            {
              name: 'timeline',
              type: 'array',
              label: 'Projektverlauf / Timeline',
              fields: [
                { name: 'title', type: 'text', label: 'Phase', required: true },
                { name: 'text', type: 'textarea', label: 'Beschreibung', required: true },
              ],
            },

            {
              name: 'sections',
              type: 'array',
              label: 'Textabschnitte',
              fields: [
                { name: 'heading', type: 'text', label: 'Überschrift', required: true },
                { name: 'content', type: 'textarea', label: 'Inhalt', required: true },
              ],
            },

            {
              name: 'caseStudy',
              type: 'group',
              label: 'Case Study (strukturiert)',
              fields: [
                { name: 'challenge', type: 'textarea', label: 'Herausforderung' },
                { name: 'approach', type: 'textarea', label: 'Vorgehen' },
                { name: 'result', type: 'textarea', label: 'Ergebnis' },
              ],
            },

            {
              name: 'testimonial',
              type: 'group',
              label: 'Testimonial (optional)',
              fields: [
                { name: 'quote', type: 'textarea', label: 'Zitat' },
                { name: 'author', type: 'text', label: 'Person (anonymisiert)' },
                { name: 'role', type: 'text', label: 'Rolle / Typ' },
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
