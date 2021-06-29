# Xero Node Custom Connection Starter
This NodeJS Typescript project is meant to get you started interacting with the Xero API using the xero-node SDK and OAuth 2.0 Client Credentials authorisation method. 

## How to use

### Configure with your credentials
Create an OAuth 2.0 app in Xero to get a *CLIENT_ID* and *CLIENT_SECRET*.

* Create a free Xero user account (if you don't have one) 
* Login to Xero Developer center https://developer.xero.com/myapps
* Click "New app"
* Select "Custom connection"
* Enter your app details
* Click "Create app"
* Follow the on-screen prompts to select scopes and appoint an authorised user
* The user will have to authorise via the email they received from Xero
* Return to the app details page to obtain your client ID and generate a client secret
* Create a `.env` file in the root of your project & add your client ID and client secret

```
CLIENT_ID=...
CLIENT_SECRET=...
```

### Build and run

```sh
npm install
npm run dev
```