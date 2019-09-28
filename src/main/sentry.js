import { init } from '@sentry/electron';

init({ dsn: process.env.SENTRY_DSN });
