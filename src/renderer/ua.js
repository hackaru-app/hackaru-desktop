import ua from 'universal-analytics';
import { machineIdSync } from 'node-machine-id';

export default ua(process.env.GOOGLE_ANALYTICS_ID, machineIdSync(), {
  strictCidFormat: false
});
