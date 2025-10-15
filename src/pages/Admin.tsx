import type { Config } from '@keystatic/core';
import { Keystatic } from '@keystatic/core/ui';
import keystaticConfig from '../../keystatic.config';

const adminConfig = keystaticConfig as unknown as Config;

const Admin = () => {
  return <Keystatic config={adminConfig} />;
};

export default Admin;
