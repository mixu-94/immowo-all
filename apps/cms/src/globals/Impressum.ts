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
    description: 'Impressum Inhalte (DE).',
  },
  access: {
    read: () => true,
    update: canEditGlobals,
  },
  fields: [
    { name: 'title', type: 'text', label: 'Titel', defaultValue: 'Impressum', required: true },
    {
      name: 'content',
      type: 'richText',
      label: 'Inhalt',
    },
  ],
}
