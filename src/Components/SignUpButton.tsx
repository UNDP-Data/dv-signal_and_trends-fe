import axios from 'axios';
import { useContext } from 'react';
import { API_ACCESS_TOKEN } from '../Constants';
import Context from '../Context/Context';

interface Props {
  username: string;
  name?: string;
  unit: string;
  setOpenModal: (_d: boolean) => void;
}

export function SignUpButton(props: Props) {
  const { name, username, unit, setOpenModal } = props;
  const { updateName, updateRole, updateUnit, updateUserName } =
    useContext(Context);
  return (
    <button
      type='button'
      className='undp-button button-primary button-arrow'
      onClick={() => {
        axios({
          method: 'post',
          url: 'https://signals-and-trends-api.azurewebsites.net/v1/users/create',
          data: {
            email: username,
            name,
            unit,
          },
          headers: {
            'Content-Type': 'application/json',
            access_token: API_ACCESS_TOKEN,
          },
        }).then(() => {
          setOpenModal(false);
          updateName(name);
          updateRole('Visitor');
          updateUnit(unit);
          updateUserName(username);
        });
      }}
    >
      Sign Up
    </button>
  );
}
