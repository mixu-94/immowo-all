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

const isAdmin: Access = ({ req }) => {
  const user = getUser(req.user)
  return Boolean(user?.role === 'admin')
}

const isAdminOrSelf: Access = ({ req, id }) => {
  const user = getUser(req.user)
  if (!user?.id) return false
  if (user.role === 'admin') return true
  return String(user.id) === String(id)
}

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Benutzer',
    plural: 'Benutzer',
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
    create: isAdmin,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      label: 'Rolle',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor (Kunde)', value: 'editor' },
        { label: 'Makler', value: 'makler' },
      ],
      saveToJWT: true,
      access: {
        // nur Admin darf Rollen sehen/ändern
        read: ({ req }) => Boolean(getUser(req.user)?.role === 'admin'),
        update: ({ req }) => Boolean(getUser(req.user)?.role === 'admin'),
      },
      admin: {
        description: 'Editor kann Inhalte pflegen, Admin verwaltet System & Benutzer. Makler kann Immobilien anlegen und bearbeiten.',
      },
    },
    {
      name: 'maklerProfile',
      type: 'relationship',
      label: 'Makler-Profil',
      relationTo: 'makler',
      saveToJWT: true,
      admin: {
        description: 'Verkn\u00fcpftes Makler-Profil (nur bei Rolle "Makler" relevant).',
        condition: (data) => data?.role === 'makler',
      },
      access: {
        read: ({ req }) => Boolean(getUser(req.user)?.role === 'admin'),
        update: ({ req }) => Boolean(getUser(req.user)?.role === 'admin'),
      },
    },
  ],
}
