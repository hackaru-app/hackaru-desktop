import { schema } from 'normalizr';

export const project = new schema.Entity('projects');
export const tracker = new schema.Entity('trackers', {
  project
});
export const activity = new schema.Entity('activities', {
  project
});
