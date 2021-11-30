import * as path from 'path'
import Store from 'electron-store'
import { sort as semverSort } from 'semver'
import { TypedStore } from '~/config/migrations/1.5.0'

export const schema: Store.Schema<TypedStore> = {
  stopTimerOnSuspend: {
    type: 'boolean',
  },
  stopTimerOnShutdown: {
    type: 'boolean',
  },
  remindTimerOnUnlocked: {
    type: 'boolean',
  },
  alwaysOnTop: {
    type: 'boolean',
  },
  showMiniTimer: {
    type: 'boolean',
  },
  enableAutoLaunch: {
    type: 'boolean',
  },
}

const defaults: TypedStore = {
  stopTimerOnSuspend: true,
  stopTimerOnShutdown: true,
  remindTimerOnUnlocked: true,
  alwaysOnTop: false,
  showMiniTimer: true,
  enableAutoLaunch: true,
}

export const trackingConfigKeys: (keyof TypedStore)[] = [
  'stopTimerOnSuspend',
  'stopTimerOnShutdown',
  'remindTimerOnUnlocked',
  'alwaysOnTop',
  'showMiniTimer',
  'enableAutoLaunch',
]

function getMigrationVersions(filePaths: string[]): string[] {
  const versions = filePaths.map((filePath) => path.parse(filePath).name)
  return semverSort(versions)
}

function createMirgrations() {
  const context = require.context('~/config/migrations', false, /\.ts$/)
  return getMigrationVersions(context.keys()).reduce(
    (migrations, version) => ({
      ...migrations,
      [version]: context(`./${version}.ts`).migration,
    }),
    {}
  )
}

export const config = new Store<TypedStore>({
  schema,
  defaults,
  name: process.env.NODE_ENV,
  serialize: (value) => JSON.stringify(value, null, '  '),
  migrations: createMirgrations(),
})
