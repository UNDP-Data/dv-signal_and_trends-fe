import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../Config';

interface Props {
  buttonText?: string;
}
export function SignInButton(props: Props) {
  const { buttonText } = props;
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
      className='undp-button button-secondary button-arrow'
      onClick={() => handleLogin('popup')}
      type='button'
      style={{ width: 'fit-content' }}
    >
      {buttonText || 'Sign in'}
    </button>
  );
}
