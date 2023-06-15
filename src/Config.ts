import { REDIRECT_URL } from './Constants';

export const msalConfig = {
  auth: {
    clientId: 'b2654b80-5b9a-4452-bc77-f39f3e834d4d',
    redirectUri: REDIRECT_URL,
    authority: 'https://login.microsoftonline.com/common',
  },
  cache: {
    cacheLocation: 'localStorage',
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ['User.Read'],
  prompt: 'select_account', // This is optional, but useful to ensure the user is prompted to sign in
  extraQueryParameters: {
    prompt: 'consent',
  },
};

export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};
