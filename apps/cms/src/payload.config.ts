import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Immobilien } from './collections/Immobilien'
import { Referenzen } from './collections/Referenzen'
import { Makler } from './collections/Makler'
import { Anfragen } from './collections/Anfragen'
import { Termine } from './collections/Termine'

import { Home } from './globals/Home'
import { Unternehmen } from './globals/Unternehmen'
import { SiteSettings } from './globals/SiteSettings'

import { Impressum } from './globals/Impressum'
import { Datenschutz } from './globals/Datenschutz'
import { AGB } from './globals/AGB'
import { Widerruf } from './globals/Widerruf'
import { Cookies } from './globals/Cookies'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  cors: [
    process.env.PAYLOAD_CORS_ORIGIN || 'http://localhost:3001',
    'http://localhost:3001',
  ],
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '\u2022 Immowo Admin',
      favicon: '/favicon.ico',
    },
    css: path.resolve(dirname, 'styles/admin.css'),
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '@/components/payload-admin/Logo',
        Icon: '@/components/payload-admin/Icon',
      },
      beforeDashboard: ['@/components/payload-admin/BeforeDashboard'],
      beforeLogin: ['@/components/payload-admin/BeforeLogin'],
    },
  },
  collections: [Users, Media, Immobilien, Referenzen, Makler, Anfragen, Termine],
  globals: [SiteSettings, Home, Unternehmen, Impressum, Datenschutz, AGB, Widerruf, Cookies],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
