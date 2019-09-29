import { config } from '@vue/test-utils';

config.mocks['$t'] = () => {};
config.mocks['$ga'] = { event: () => Promise.resolve() };
