import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../Config';

export function SignInButtonForHeader() {
  const { instance } = useMsal();

  const handleLogin = (loginType: string) => {
    if (loginType === 'popup') {
      instance.loginPopup(loginRequest).catch(e => {
        // eslint-disable-next-line no-console
        console.log(e);
      });
    }
  };
  return (
    <button
      className='undp-button button-secondary'
      onClick={() => handleLogin('popup')}
      type='button'
      style={{ width: 'fit-content' }}
    >
      Sign in
    </button>
  );
}
