import type { GlobalConfig } from 'payload'

type Role = 'admin'
type UserLike = { role?: Role } | null

const canEditGlobals = ({ req }: any) => {
  const user = (req.user ?? null) as UserLike
  return Boolean(user?.role === 'admin')
}

export const Datenschutz: GlobalConfig = {
  slug: 'datenschutz',
  label: 'Datenschutz',
  admin: {
    group: 'Rechtliches',
    hidden: ({ user }) => (user as any)?.role !== 'admin',
    description: 'Datenschutzerklärung Inhalte (DE).',
  },
  access: {
    read: () => true,
    update: canEditGlobals,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      defaultValue: 'Datenschutzerklärung',
      required: true,
    },
    { name: 'content', type: 'richText', label: 'Inhalt' },
  ],
}
