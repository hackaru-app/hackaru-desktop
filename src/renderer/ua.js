import ua from 'universal-analytics';
import { machineIdSync } from 'node-machine-id';

const visitor = ua(process.env.GOOGLE_ANALYTICS_ID, machineIdSync(), {
  strictCidFormat: false
});

export default function pageView({ path, name }) {
  visitor.pageview(path, 'http://localhost', name).send();
}
