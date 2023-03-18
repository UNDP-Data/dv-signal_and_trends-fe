/* eslint-disable no-underscore-dangle */
import { AuthenticatedTemplate, useMsal } from '@azure/msal-react';
import { Dropdown, MenuProps } from 'antd';

interface Props {
  signOutClickHandler: () => void;
}

function Name() {
  const { accounts } = useMsal();
  const { name, username } = accounts[0];
  return name?.split(' ')[0] || username;
}

export function SignOutButton(props: Props) {
  const { signOutClickHandler } = props;
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <button
          className='undp-button button-tertiary'
          type='button'
          onClick={() => {
            signOutClickHandler();
          }}
        >
          Sign Out
        </button>
      ),
    },
  ];
  return (
    <AuthenticatedTemplate>
      <Dropdown
        menu={{ items }}
        placement='bottomRight'
        className='undp-button-dropdown'
        overlayClassName='undp-dropdown-menu'
      >
        <div>Hi {Name()}</div>
      </Dropdown>
    </AuthenticatedTemplate>
  );
}
