export const msalConfig = {
  auth: {
    clientId: 'b2654b80-5b9a-4452-bc77-f39f3e834d4d',
    redirectUri: 'http://localhost:5173/',
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ['User.Read'],
};

export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};
