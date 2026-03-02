import type { GlobalConfig } from 'payload'

type Role = 'admin'
type UserLike = { role?: Role } | null

const canEditGlobals = ({ req }: any) => {
  const user = (req.user ?? null) as UserLike
  return Boolean(user?.role === 'admin' || user?.role === 'editor')
}

export const Cookies: GlobalConfig = {
  slug: 'cookies',
  label: 'Cookies',
  admin: {
    group: 'Rechtliches',
    hidden: ({ user }) => (user as any)?.role !== 'admin',
    description: 'Cookie-Infos (DE).',
  },
  access: {
    read: () => true,
    update: canEditGlobals,
  },
  fields: [
    { name: 'title', type: 'text', label: 'Titel', defaultValue: 'Cookies', required: true },
    { name: 'content', type: 'richText', label: 'Inhalt' },
  ],
}
