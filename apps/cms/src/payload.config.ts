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
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '• Admin',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeDashboard: ['@/components/payload-admin/BeforeDashboard'],
    },
  },
  collections: [Users, Media, Immobilien, Referenzen],
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
