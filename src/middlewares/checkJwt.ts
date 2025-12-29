import { auth } from 'express-oauth2-jwt-bearer';
import ConfigAuth0 from '../config/configAuth0.js';

const checkJwt = auth({
  audience: ConfigAuth0.apiIdentifier,
  issuerBaseURL: ConfigAuth0.domain,
  tokenSigningAlg: 'RS256',
});

export default checkJwt;
