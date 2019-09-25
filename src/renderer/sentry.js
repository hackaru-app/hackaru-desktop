import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [new Integrations.Vue({ Vue, attachProps: true })]
});
