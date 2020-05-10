import { init } from '@sentry/electron';

if (process.env.SENTRY_DSN) {
  init({ dsn: process.env.SENTRY_DSN });
}
