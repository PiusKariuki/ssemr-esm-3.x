import { getSyncLifecycle, defineConfigSchema } from '@openmrs/esm-framework';
import { configSchema } from './config/config-schema';
import { NavLink } from './components/superset-nav-icon.component';

const moduleName = '@ssemr/esm-superset-integration-config-app';

const options = {
  featureName: 'superset-integration-config-app',
  moduleName,
};

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');


export const navLinkComponent = getSyncLifecycle(NavLink, options)


export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}
