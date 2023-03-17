import { useMsal } from '@azure/msal-react';
import { Dropdown, MenuProps } from 'antd';

function UserName() {
  const { accounts } = useMsal();
  const { name, username } = accounts[0];
  return name?.split(' ')[0] || username;
}

export function SignOutButton() {
  const { instance } = useMsal();

  const handleLogout = (logoutType: string) => {
    if (logoutType === 'popup') {
      instance.logoutPopup({
        postLogoutRedirectUri: '/',
        mainWindowRedirectUri: '/',
      });
    }
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <button
          className='undp-button button-tertiary'
          type='button'
          onClick={() => handleLogout('popup')}
        >
          Sign Out
        </button>
      ),
    },
  ];
  return (
    <Dropdown
      menu={{ items }}
      placement='bottomRight'
      className='undp-button-dropdown'
      overlayClassName='undp-dropdown-menu'
    >
      <div>Hi {UserName()}</div>
    </Dropdown>
  );
}
