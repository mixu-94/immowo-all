import type { GlobalConfig } from 'payload'

type Role = 'admin'
type UserLike = { role?: Role } | null

const canEditGlobals = ({ req }: any) => {
  const user = (req.user ?? null) as UserLike
  return Boolean(user?.role === 'admin')
}

export const Impressum: GlobalConfig = {
  slug: 'impressum',
  label: 'Impressum',
  admin: {
    group: 'Rechtliches',
    hidden: ({ user }) => (user as any)?.role !== 'admin',
    description: 'Strukturierte Pflichtangaben gema\u00df \u00a7 5 TMG. Alle Felder erscheinen direkt auf der Impressum-Seite.',
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
          label: 'Firmendaten',
          fields: [
            {
              name: 'company',
              type: 'text',
              label: 'Firmenname',
              required: true,
              defaultValue: 'Immowo Ventures GmbH',
            },
            {
              name: 'streetAddress',
              type: 'text',
              label: 'Stra\u00dfe + Hausnummer',
              defaultValue: 'Dossenbergerstra\u00dfe 5',
            },
            {
              name: 'city',
              type: 'text',
              label: 'PLZ + Ort',
              defaultValue: '89312 G\u00fcnzburg',
            },
            {
              name: 'country',
              type: 'text',
              label: 'Land',
              defaultValue: 'Deutschland',
            },
            {
              name: 'ceo',
              type: 'text',
              label: 'Gesch\u00e4ftsf\u00fchrer',
              defaultValue: 'Johannes Wopfner',
            },
            {
              name: 'responsible',
              type: 'text',
              label: 'Inhaltlich Verantwortlicher',
              admin: {
                description: 'Gem\u00e4\u00df \u00a7 55 Abs. 2 RStV. Leer lassen wenn identisch mit Gesch\u00e4ftsf\u00fchrer.',
              },
            },
          ],
        },
        {
          label: 'Kontakt',
          fields: [
            {
              name: 'phone',
              type: 'text',
              label: 'Telefon',
              admin: {
                placeholder: 'z.B. +49 8221 123456',
              },
            },
            {
              name: 'email',
              type: 'email',
              label: 'E-Mail',
              admin: {
                placeholder: 'z.B. info@immowo-ventures.de',
              },
            },
          ],
        },
        {
          label: 'Registereintrag',
          fields: [
            {
              name: 'registergericht',
              type: 'text',
              label: 'Registergericht',
              admin: {
                placeholder: 'z.B. Amtsgericht Memmingen',
                description: 'Zust\u00e4ndiges Handelsregistergericht.',
              },
            },
            {
              name: 'hrb',
              type: 'text',
              label: 'HRB-Nummer',
              admin: {
                placeholder: 'z.B. HRB 12345',
              },
            },
            {
              name: 'ustId',
              type: 'text',
              label: 'USt-IdNr.',
              admin: {
                placeholder: 'z.B. DE123456789',
                description: 'Umsatzsteuer-Identifikationsnummer gem\u00e4\u00df \u00a7 27a UStG. Leer lassen falls noch nicht vorhanden.',
              },
            },
          ],
        },
        {
          label: 'Erlaubnis & Weiteres',
          fields: [
            {
              name: 'gewo34cText',
              type: 'textarea',
              label: '\u00a7 34c GewO Erlaubnis-Angaben',
              admin: {
                placeholder: 'z.B. Erlaubnisbeh\u00f6rde: Landratsamt G\u00fcnzburg, Erlaubnis erteilt am ...',
                description: 'Nur ausf\u00fcllen wenn Immobilienmakler-T\u00e4tigkeit nach \u00a7 34c GewO ausgef\u00fchrt wird (was hier der Fall ist).',
              },
            },
            {
              name: 'streitbeilegung',
              type: 'richText',
              label: 'Streitbeilegungstext',
              admin: {
                description: 'Optionaler Freitext zur Verbraucherschlichtung. Standard-Text wird angezeigt wenn leer.',
              },
            },
            {
              name: 'lastUpdated',
              type: 'text',
              label: 'Letztes Update',
              defaultValue: '23.02.2026',
              admin: {
                description: 'Datum der letzten inhaltlichen \u00c4nderung (z.B. "23.02.2026").',
              },
            },
          ],
        },
      ],
    },
  ],
}
