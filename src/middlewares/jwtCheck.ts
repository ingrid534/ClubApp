import { auth } from 'express-oauth2-jwt-bearer';

//TODO: what exactly does this do?
const jwtCheck = auth({
  audience: 'https://api.club-app',
  issuerBaseURL: 'https://dev-rk76qho04a1i6nys.us.auth0.com/',
  tokenSigningAlg: 'RS256',
});

export default jwtCheck;
