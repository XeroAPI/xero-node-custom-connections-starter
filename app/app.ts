require('dotenv').config();
import express from 'express';
import { Request, Response } from 'express';
import jwtDecode from 'jwt-decode';
import { TokenSet } from 'openid-client';
import { XeroAccessToken, XeroClient } from 'xero-node';

const session = require('express-session');

const client_id: string = process.env.CLIENT_ID;
const client_secret: string = process.env.CLIENT_SECRET;
const grant_type: string = 'client_credentials';

const xero = new XeroClient({
  clientId: client_id,
  clientSecret: client_secret,
  grantType: grant_type,
});

if (!client_id || !client_secret) {
  throw Error('Environment Variables not all set - please check your .env file in the project root or create one!')
}

const app: express.Application = express();

app.use(express.static(__dirname + '/build'));

app.use(session({
  secret: 'something crazy',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));

const authenticationData: any = (req: Request, res: Response) => {
  return {
    decodedAccessToken: req.session.decodedAccessToken,
    tokenSet: req.session.tokenSet
  };
};

app.get('/', async (req: Request, res: Response) => {
  try {
    const tokenSet: TokenSet = await xero.getClientCredentialsToken();
    const decodedAccessToken: XeroAccessToken = jwtDecode(tokenSet.access_token);
    req.session.decodedAccessToken = decodedAccessToken;
    req.session.tokenSet = tokenSet;
    const authData: any = authenticationData(req, res);
    res.json(authData);
  } catch (err) {
    res.json(err);
  }
});

app.get('/invoices', async (req: Request, res: Response) => {
  try {
    const tokenSet: TokenSet = await xero.readTokenSet();
    console.log(tokenSet.expired() ? 'expired' : 'valid');

    const response: any = await xero.accountingApi.getInvoices('');
    res.json(response.body);
  } catch (err) {
    res.json(err);
  }
});

app.get('/contacts', async (req: Request, res: Response) => {
  try {
    const tokenSet: TokenSet = await xero.readTokenSet();
    console.log(tokenSet.expired() ? 'expired' : 'valid');

    const response: any = await xero.accountingApi.getContacts('');
    res.json(response.body);
  } catch (err) {
    res.json(err);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});