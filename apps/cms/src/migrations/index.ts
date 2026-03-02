import * as migration_20260302_180702 from './20260302_180702';

export const migrations = [
  {
    up: migration_20260302_180702.up,
    down: migration_20260302_180702.down,
    name: '20260302_180702'
  },
];
