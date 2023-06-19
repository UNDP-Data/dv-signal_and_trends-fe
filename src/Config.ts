import { REDIRECT_URL } from './Constants';

export const msalConfig = {
  auth: {
    clientId: '4b179bfc-6621-409a-a1ed-ad141c12eb11',
    redirectUri: REDIRECT_URL,
    clientSecret: process.env.INPUT_CLIENT_SECRET_FOR_MSAL,
    authority:
      'https://login.microsoftonline.com/b3e5db5e-2944-4837-99f5-7488ace54319',
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
