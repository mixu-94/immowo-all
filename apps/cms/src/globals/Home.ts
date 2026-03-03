import type { GlobalConfig } from 'payload'

type Role = 'admin' | 'editor'
type UserLike = { role?: Role } | null

const canEditGlobals = ({ req }: any) => {
  const user = (req.user ?? null) as UserLike
  return Boolean(user?.role === 'admin')
}

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Startseite',
  admin: {
    group: 'Website',
    description: 'Inhalte der Startseite: Hero, USPs, Sektionen, CTA.',
    hidden: ({ user }) => (user as any)?.role === 'makler',
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
          label: 'Hero',
          fields: [
            {
              name: 'badge',
              type: 'text',
              label: 'Badge',
              defaultValue: 'BAUTRÄGER • VERKAUF • PROJEKTENTWICKLUNG',
            },
            {
              name: 'headline',
              type: 'group',
              label: 'Headline',
              fields: [
                { name: 'before', type: 'text', label: 'Vorher', defaultValue: 'Immobilien, die' },
                { name: 'highlight', type: 'text', label: 'Highlight', defaultValue: 'überzeugen' },
                { name: 'after', type: 'text', label: 'Nachher', defaultValue: '.' },
              ],
            },
            {
              name: 'subline',
              type: 'group',
              label: 'Subline',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  label: 'Text',
                  defaultValue: 'Schlüsselfertige Objekte und Neubauprojekte',
                },
                {
                  name: 'highlight',
                  type: 'text',
                  label: 'Highlight',
                  defaultValue: 'Kauf ab Plan',
                },
              ],
            },
            {
              name: 'trustPills',
              type: 'array',
              label: 'Trust Pills',
              fields: [{ name: 'text', type: 'text', label: 'Pill', required: true }],
              defaultValue: [
                { text: 'Transparenter Prozess' },
                { text: 'Saubere Unterlagen' },
                { text: 'Qualität bis zur Übergabe' },
              ],
            },
            {
              name: 'scrollHint',
              type: 'text',
              label: 'Scroll Hinweis',
              defaultValue: 'Scrollen, um mehr zu entdecken',
            },
            {
              name: 'heroVideo',
              type: 'group',
              label: 'Hero Video',
              fields: [
                {
                  name: 'src',
                  type: 'text',
                  label: 'Quelle (Pfad/URL)',
                  defaultValue: '/assets/videos/beach.mp4',
                },
                { name: 'type', type: 'text', label: 'MIME Type', defaultValue: 'video/mp4' },
              ],
            },
            {
              name: 'primaryCta',
              type: 'group',
              label: 'Primary CTA',
              fields: [
                { name: 'label', type: 'text', label: 'Text', defaultValue: 'Angebote ansehen' },
                { name: 'href', type: 'text', label: 'Link', defaultValue: '/immobilien' },
              ],
            },
            {
              name: 'secondaryCta',
              type: 'group',
              label: 'Secondary CTA',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Text',
                  defaultValue: 'Unterlagen anfordern',
                },
                { name: 'href', type: 'text', label: 'Link', defaultValue: '/kontakt' },
              ],
            },
          ],
        },
        {
          label: 'Sektionen',
          fields: [
            {
              name: 'infoSections',
              type: 'array',
              label: 'Info Sektionen',
              fields: [
                { name: 'title', type: 'text', label: 'Titel', required: true },
                { name: 'text', type: 'textarea', label: 'Text', required: true },
                {
                  name: 'icon',
                  type: 'select',
                  label: 'Icon',
                  options: [
                    { label: 'Shield', value: 'shield' },
                    { label: 'Sparkles', value: 'sparkles' },
                    { label: 'Home', value: 'home' },
                    { label: 'Map', value: 'map' },
                  ],
                },
              ],
              defaultValue: [
                {
                  title: 'Transparenz',
                  text: 'Klare Kommunikation, saubere Unterlagen und nachvollziehbare Schritte – von Anfang an.',
                  icon: 'shield',
                },
                {
                  title: 'Qualität',
                  text: 'Hochwertige Ausführung und sorgfältige Auswahl – damit Werte langfristig bestehen.',
                  icon: 'sparkles',
                },
                {
                  title: 'Abwicklung',
                  text: 'Strukturierter Prozess, feste Ansprechpartner, professionelle Begleitung bis zur Übergabe.',
                  icon: 'home',
                },
              ],
            },
            {
              name: 'ctaBlock',
              type: 'group',
              label: 'CTA Block',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Titel',
                  defaultValue: 'Bereit für den nächsten Schritt?',
                },
                {
                  name: 'text',
                  type: 'textarea',
                  label: 'Text',
                  defaultValue:
                    'Lassen Sie uns Ihr Vorhaben besprechen – unverbindlich, klar und strukturiert.',
                },
                {
                  name: 'buttonLabel',
                  type: 'text',
                  label: 'Button Text',
                  defaultValue: 'Kontakt aufnehmen',
                },
                {
                  name: 'buttonHref',
                  type: 'text',
                  label: 'Button Link',
                  defaultValue: '/kontakt',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
