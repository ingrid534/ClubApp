import dotenv from 'dotenv';

dotenv.config();

interface ConfigAuth0 {
  apiIdentifier: string;
  domain: string;
}

const ConfigAuth0: ConfigAuth0 = {
  apiIdentifier: process.env.AUTH0_API_IDENTIFIER || '',
  domain: process.env.AUTH0_DOMAIN || '',
};

export default ConfigAuth0;
