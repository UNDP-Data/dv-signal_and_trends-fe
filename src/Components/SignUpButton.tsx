import axios from 'axios';
import { useContext } from 'react';
import Context from '../Context/Context';

interface Props {
  unit: string;
  accLabs: boolean;
  setOpenModal: (_d: boolean) => void;
  accessTokenTemp: string;
  userRoleTemp: string;
}

export function SignUpButton(props: Props) {
  const { unit, setOpenModal, accLabs, accessTokenTemp, userRoleTemp } = props;
  const { userName, name, userID, updateUnit, updateIsAcceleratorLab } =
    useContext(Context);
  return (
    <button
      type='button'
      className='undp-button button-primary button-arrow'
      onClick={() => {
        axios({
          method: 'put',
          url: 'https://signals-and-trends-api.azurewebsites.net/v1/users/update',
          data: {
            email: userName,
            name,
            unit,
            role: userRoleTemp || 'User',
            id: userID,
            acclab: accLabs,
          },
          headers: {
            'Content-Type': 'application/json',
            access_token: accessTokenTemp,
          },
        }).then(() => {
          setOpenModal(false);
          updateUnit(unit);
          updateIsAcceleratorLab(accLabs);
        });
      }}
    >
      Sign Up
    </button>
  );
}
