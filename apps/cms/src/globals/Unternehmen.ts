import type { GlobalConfig } from 'payload'

type Role = 'admin'
type UserLike = { role?: Role } | null

const canEditGlobals = ({ req }: any) => {
  const user = (req.user ?? null) as UserLike
  return Boolean(user?.role === 'admin')
}

export const Unternehmen: GlobalConfig = {
  slug: 'unternehmen',
  label: 'Unternehmen',
  admin: {
    group: 'Website',
    description: 'Unternehmensseite: Hero, Highlights, Prozess, Werte, Zahlen, CTA.',
  },
  access: {
    read: () => true,
    update: canEditGlobals,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ─────────────────────────────────────────────────────────────────
        // HERO
        // ─────────────────────────────────────────────────────────────────
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
              name: 'headlineTop',
              type: 'text',
              label: 'Headline (Zeile 1)',
              defaultValue: 'Unternehmen',
            },
            {
              name: 'headlineMuted',
              type: 'text',
              label: 'Headline (gedämpft)',
              defaultValue: ' – Immobilien, die wir',
            },
            {
              name: 'headlineGradient',
              type: 'text',
              label: 'Headline (Gradient/Akzent)',
              defaultValue: 'bauen & verkaufen.',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Beschreibung',
              defaultValue:
                'Wir verbinden Bauträger-Kompetenz mit einem klaren Verkaufsprozess: Neubau „Kauf ab Plan", schlüsselfertige Immobilien und ausgewählte Bestandsobjekte – professionell, transparent und hochwertig präsentiert.',
            },
            {
              name: 'primaryCta',
              type: 'group',
              label: 'Primärer Button',
              fields: [
                { name: 'label', type: 'text', label: 'Text', defaultValue: 'Aktuelle Angebote' },
                { name: 'href', type: 'text', label: 'Link', defaultValue: '/immobilien' },
              ],
            },
            {
              name: 'secondaryCta',
              type: 'group',
              label: 'Sekundärer Button',
              fields: [
                { name: 'label', type: 'text', label: 'Text', defaultValue: 'Projekt anfragen' },
                { name: 'href', type: 'text', label: 'Link', defaultValue: '/kontakt' },
              ],
            },
            {
              name: 'heroCards',
              type: 'array',
              label: 'Hero Kacheln (max. 3)',
              maxRows: 3,
              fields: [
                { name: 'title', type: 'text', label: 'Titel', required: true },
                { name: 'text', type: 'text', label: 'Untertext', required: true },
              ],
              defaultValue: [
                { title: 'Bauträger', text: 'Planung → Bau → Übergabe' },
                { title: 'Verkauf', text: 'Klarer Prozess & Unterlagen' },
                { title: 'Qualität', text: 'Saubere Ausführung & Standards' },
              ],
            },
            {
              name: 'heroImages',
              type: 'group',
              label: 'Hero Bilder (4 Slots)',
              fields: [
                { name: 'a', type: 'upload', label: 'Bild A', relationTo: 'media' },
                { name: 'b', type: 'upload', label: 'Bild B', relationTo: 'media' },
                { name: 'c', type: 'upload', label: 'Bild C', relationTo: 'media' },
                { name: 'd', type: 'upload', label: 'Bild D', relationTo: 'media' },
              ],
            },
          ],
        },

        // ─────────────────────────────────────────────────────────────────
        // HIGHLIGHTS
        // ─────────────────────────────────────────────────────────────────
        {
          label: 'Highlights',
          fields: [
            {
              name: 'highlightsTitle',
              type: 'text',
              label: 'Überschrift',
              defaultValue: 'Warum Kunden mit uns arbeiten',
            },
            {
              name: 'highlightsDescription',
              type: 'textarea',
              label: 'Beschreibung',
              defaultValue:
                'Weil wir Immobilien nicht nur „vermitteln", sondern ganzheitlich denken: Bau, Qualität, Dokumentation und ein sauberer Prozess sind entscheidend.',
            },
            {
              name: 'highlightsImage',
              type: 'upload',
              label: 'Bild',
              relationTo: 'media',
            },
            {
              name: 'highlightsBullets',
              type: 'array',
              label: 'Bullet-Punkte',
              fields: [{ name: 'text', type: 'text', label: 'Punkt', required: true }],
              defaultValue: [
                { text: 'Bauträger-Projekte von der Planung bis zur Übergabe' },
                { text: 'Verkauf schlüsselfertiger Immobilien & ausgewählter Bestandsobjekte' },
                { text: 'Saubere Unterlagen, klare Kommunikation, strukturierte Abwicklung' },
                { text: 'Hochwertige Präsentation für schnelle, sichere Entscheidungen' },
              ],
            },
          ],
        },

        // ─────────────────────────────────────────────────────────────────
        // PROZESS
        // ─────────────────────────────────────────────────────────────────
        {
          label: 'Prozess',
          fields: [
            {
              name: 'processTitle',
              type: 'text',
              label: 'Überschrift',
              defaultValue: 'So läuft es bei uns',
            },
            {
              name: 'processDescription',
              type: 'textarea',
              label: 'Beschreibung',
              defaultValue:
                'Ein schlanker Prozess – egal ob schlüsselfertig oder Neubauprojekt (Kauf ab Plan). Klarheit gewinnt.',
            },
            {
              name: 'steps',
              type: 'array',
              label: 'Schritte',
              fields: [
                { name: 'title', type: 'text', label: 'Titel', required: true },
                { name: 'text', type: 'textarea', label: 'Text', required: true },
              ],
              defaultValue: [
                {
                  title: 'Erstgespräch & Bedarf',
                  text: 'Wir klären Ziel, Budget, Zeitplan und Anforderungen – ohne Umwege.',
                },
                {
                  title: 'Objekt / Projekt passend wählen',
                  text: 'Neubau (Kauf ab Plan) oder Bestandsobjekt – mit klaren Eckdaten und Unterlagen.',
                },
                {
                  title: 'Unterlagenpaket & Transparenz',
                  text: 'Exposé, Leistungsbeschreibung, Kosten-/Zeitplan (wo relevant) – sauber und nachvollziehbar.',
                },
                {
                  title: 'Besichtigung / Beratung',
                  text: 'Effizient geplant, gut vorbereitet – damit du schnell eine fundierte Entscheidung triffst.',
                },
                {
                  title: 'Abwicklung bis Übergabe',
                  text: 'Koordiniert, dokumentiert, fair – inklusive Support bis zum Abschluss.',
                },
              ],
            },
          ],
        },

        // ─────────────────────────────────────────────────────────────────
        // WERTE (Pillars)
        // ─────────────────────────────────────────────────────────────────
        {
          label: 'Werte',
          fields: [
            {
              name: 'pillarsTitle',
              type: 'text',
              label: 'Überschrift',
              defaultValue: 'Wofür wir stehen',
            },
            {
              name: 'pillarsDescription',
              type: 'textarea',
              label: 'Beschreibung',
              defaultValue:
                'Immobilien sind Vertrauenssache. Deshalb kombinieren wir Baukompetenz mit einem modernen, transparenten Verkaufsprozess – ohne unnötigen Schnickschnack.',
            },
            {
              name: 'pillars',
              type: 'array',
              label: 'Werte-Kacheln',
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  label: 'Icon',
                  required: true,
                  options: [
                    { label: 'Building', value: 'Building' },
                    { label: 'Sparkles', value: 'Sparkles' },
                    { label: 'Home', value: 'Home' },
                    { label: 'FileCheck2', value: 'FileCheck2' },
                  ],
                },
                { name: 'title', type: 'text', label: 'Titel', required: true },
                { name: 'text', type: 'textarea', label: 'Text', required: true },
              ],
              defaultValue: [
                {
                  icon: 'Building',
                  title: 'Bauträger-Projekte',
                  text: 'Von der Idee über Planung und Bau bis zur schlüsselfertigen Übergabe – effizient, strukturiert und mit klarem Qualitätsanspruch.',
                },
                {
                  icon: 'Sparkles',
                  title: 'Kauf ab Plan',
                  text: 'Frühzeitige Vermarktung inkl. Visuals, Unterlagenpaket und transparenter Käuferreise – ideal für Neubauprojekte.',
                },
                {
                  icon: 'Home',
                  title: 'Schlüsselfertige Immobilien',
                  text: 'Ausgewählte Objekte mit hochwertiger Ausstattung – sauber präsentiert, klar dokumentiert und professionell begleitet.',
                },
                {
                  icon: 'FileCheck2',
                  title: 'Unterlagen & Prozesse',
                  text: 'Exposé, Bau- und Leistungsbeschreibungen, Klarheit zu Ablauf und Konditionen – damit Entscheidungen schnell und sicher möglich sind.',
                },
              ],
            },
          ],
        },

        // ─────────────────────────────────────────────────────────────────
        // ZAHLEN (Stats)
        // ─────────────────────────────────────────────────────────────────
        {
          label: 'Zahlen',
          fields: [
            {
              name: 'stats',
              type: 'array',
              label: 'Kennzahlen',
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  label: 'Icon',
                  options: [
                    { label: 'Building2', value: 'Building2' },
                    { label: 'ShieldCheck', value: 'ShieldCheck' },
                    { label: 'Scale', value: 'Scale' },
                    { label: 'Handshake', value: 'Handshake' },
                  ],
                },
                { name: 'value', type: 'text', label: 'Wert', required: true },
                { name: 'label', type: 'text', label: 'Label', required: true },
              ],
              defaultValue: [
                { icon: 'Building2', label: 'Fokus', value: 'Bauträger & Verkauf' },
                { icon: 'ShieldCheck', label: 'Qualität', value: 'Saubere Standards' },
                { icon: 'Scale', label: 'Transparenz', value: 'Klare Unterlagen' },
                { icon: 'Handshake', label: 'Abwicklung', value: 'Zuverlässig & fair' },
              ],
            },
          ],
        },

        // ─────────────────────────────────────────────────────────────────
        // CTA
        // ─────────────────────────────────────────────────────────────────
        {
          label: 'CTA',
          fields: [
            {
              name: 'ctaTitle',
              type: 'text',
              label: 'Titel',
              defaultValue: 'Bereit für den nächsten Schritt?',
            },
            {
              name: 'ctaDescription',
              type: 'textarea',
              label: 'Beschreibung',
              defaultValue:
                'Ob Neubau (Kauf ab Plan) oder schlüsselfertiges Objekt – wir geben dir schnell Klarheit zu Ablauf, Unterlagen und Möglichkeiten.',
            },
            {
              name: 'ctaPrimaryLabel',
              type: 'text',
              label: 'Primärer Button Text',
              defaultValue: 'Kontakt aufnehmen',
            },
            {
              name: 'ctaPrimaryHref',
              type: 'text',
              label: 'Primärer Button Link',
              defaultValue: '/kontakt',
            },
            {
              name: 'ctaSecondaryLabel',
              type: 'text',
              label: 'Sekundärer Button Text',
              defaultValue: 'Angebote ansehen',
            },
            {
              name: 'ctaSecondaryHref',
              type: 'text',
              label: 'Sekundärer Button Link',
              defaultValue: '/immobilien',
            },
          ],
        },
      ],
    },
  ],
}
