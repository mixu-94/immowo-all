import type { CollectionConfig } from 'payload'

type Role = 'admin' | 'editor' | 'makler'

type UserLike = {
  id?: string | number
  role?: Role
} | null

function getUser(reqUser: unknown): UserLike {
  if (!reqUser || typeof reqUser !== 'object') return null
  return reqUser as UserLike
}

export const Makler: CollectionConfig = {
  slug: 'makler',
  labels: {
    singular: 'Makler',
    plural: 'Makler',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'titleRole', 'phone', 'email'],
    description: 'Ansprechpartner & Makler verwalten.',
    hidden: ({ user }) => (user as any)?.role === 'makler',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(getUser(req.user)?.role === 'admin'),
    update: ({ req }) => Boolean(getUser(req.user)?.role === 'admin'),
    delete: ({ req }) => Boolean(getUser(req.user)?.role === 'admin'),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
    },
    {
      name: 'titleRole',
      type: 'text',
      label: 'Titel / Rolle',
      admin: {
        description: 'z.B. "Immobilienberater" oder "Projektentwicklung"',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: 'Telefon',
        },
        {
          name: 'email',
          type: 'email',
          label: 'E-Mail',
        },
      ],
    },
    {
      name: 'photo',
      type: 'upload',
      label: 'Profilbild',
      relationTo: 'media',
    },
    {
      name: 'availability',
      type: 'text',
      label: 'Erreichbarkeit',
      admin: {
        description: 'z.B. "Mo\u2013Fr 9\u201318 Uhr"',
      },
    },
    {
      name: 'focus',
      type: 'array',
      label: 'Schwerpunkte',
      admin: {
        description: 'z.B. "Schl\u00fcsselfertig", "Kauf ab Plan", "Kapitalanlage"',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Schwerpunkt',
          required: true,
        },
      ],
    },
    {
      name: 'linkedUser',
      type: 'relationship',
      label: 'Verkn\u00fcpfter Benutzer-Account',
      relationTo: 'users',
      admin: {
        description: 'Login-Account des Maklers (nur Admin sichtbar).',
        condition: (_, __, { user }) => (user as any)?.role === 'admin',
      },
      access: {
        read: ({ req }) => Boolean(getUser(req.user)?.role === 'admin'),
        update: ({ req }) => Boolean(getUser(req.user)?.role === 'admin'),
      },
    },
  ],
}
