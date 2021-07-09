import { Session } from 'express-session'
import { TokenSet } from 'openid-client';
import { XeroAccessToken } from 'xero-node';

declare module 'express-session' {
  interface Session {
    decodedAccessToken: XeroAccessToken;
    tokenSet: TokenSet;
  }
}