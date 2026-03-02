import type { GlobalConfig } from 'payload'

type Role = 'admin'
type UserLike = { role?: Role } | null

const canEditGlobals = ({ req }: any) => {
  const user = (req.user ?? null) as UserLike
  return Boolean(user?.role === 'admin')
}

export const AGB: GlobalConfig = {
  slug: 'agb',
  label: 'AGB',
  admin: {
    group: 'Rechtliches',
    hidden: ({ user }) => (user as any)?.role !== 'admin',
    description: 'Allgemeine Geschäftsbedingungen (DE).',
  },
  access: {
    read: () => true,
    update: canEditGlobals,
  },
  fields: [
    { name: 'title', type: 'text', label: 'Titel', defaultValue: 'AGB', required: true },
    { name: 'content', type: 'richText', label: 'Inhalt' },
  ],
}
