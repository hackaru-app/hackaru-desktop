import ua from 'universal-analytics';
import { machineIdSync } from 'node-machine-id';

const visitor = ua(process.env.GOOGLE_ANALYTICS_ID, machineIdSync(), {
  strictCidFormat: false,
  enableBatching: false
});

export function pageView({ path, name }) {
  visitor.pageview(path, 'http://localhost', name).send();
}

export function event(category, action) {
  return new Promise((resolve, reject) => {
    visitor.event(category, action).send(error => {
      return error ? reject(error) : resolve();
    });
  });
}
