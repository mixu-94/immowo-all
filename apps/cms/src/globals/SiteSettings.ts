import type { GlobalConfig } from 'payload'

type Role = 'admin'
type UserLike = { role?: Role } | null

const canEditGlobals = ({ req }: any) => {
  const user = (req.user ?? null) as UserLike
  return Boolean(user?.role === 'admin')
}

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  label: 'Website Einstellungen',
  admin: {
    group: 'Website',
    hidden: ({ user }) => (user as any)?.role !== 'admin',
    description: 'Zentrale Daten für Footer, Kontakt, Branding und Socials.',
  },
  access: {
    read: () => true,
    update: canEditGlobals,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand',
          fields: [
            {
              name: 'brandName',
              type: 'text',
              label: 'Markenname',
              required: true,
              defaultValue: 'Immowo',
            },
            { name: 'tagline', type: 'text', label: 'Tagline (optional)' },
            {
              name: 'logo',
              type: 'upload',
              label: 'Logo',
              relationTo: 'media',
            },
            {
              name: 'accentLabel',
              type: 'text',
              label: 'Accent Label (optional)',
              admin: { description: 'Nur Anzeige/Info. Farben werden im Frontend gesetzt.' },
            },
          ],
        },
        {
          label: 'Kontakt',
          fields: [
            {
              name: 'company',
              type: 'text',
              label: 'Firma',
              required: true,
              defaultValue: 'Immowo Ventures GmbH',
            },
            {
              name: 'addressLine1',
              type: 'text',
              label: 'Adresse (Zeile 1)',
              defaultValue: 'Dossenbergerstra\u00dfe 5',
            },
            {
              name: 'addressLine2',
              type: 'text',
              label: 'Adresse (Zeile 2)',
              defaultValue: '89312 G\u00fcnzburg, Deutschland',
            },
            { name: 'phone', type: 'text', label: 'Telefon' },
            { name: 'email', type: 'email', label: 'E-Mail' },
            { name: 'whatsapp', type: 'text', label: 'WhatsApp (optional)' },
          ],
        },
        {
          label: 'Socials',
          fields: [
            {
              name: 'socials',
              type: 'array',
              label: 'Social Links',
              fields: [
                { name: 'label', type: 'text', label: 'Name', required: true },
                { name: 'url', type: 'text', label: 'URL', required: true },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerHeadline',
              type: 'text',
              label: 'Footer Überschrift',
              defaultValue: 'Sprechen wir über Ihr Projekt.',
            },
            {
              name: 'footerText',
              type: 'textarea',
              label: 'Footer Text',
              defaultValue:
                'Wir begleiten Sie transparent, strukturiert und mit einem hohen Anspruch an Qualität – vom Erstgespräch bis zur Übergabe.',
            },
            {
              name: 'legalLinksHint',
              type: 'text',
              label: 'Hinweis (optional)',
              defaultValue: 'Rechtliche Seiten werden aus den Legal-Globals gezogen.',
            },
          ],
        },
      ],
    },
  ],
}
