import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import { Input, Modal, Radio, Select } from 'antd';
import { SignInButton } from '../Components/SignInButton';
import Context from '../Context/Context';
import { UserDataType } from '../Types';
import { UserListEl } from './userList';
import { UNITS } from '../Constants';

export function AdminPanel() {
  const { role } = useContext(Context);
  const [userList, setUserList] = useState<undefined | UserDataType[]>(
    undefined,
  );
  const [openModal, setOpenModal] = useState(false);
  const [userName, setuserName] = useState<undefined | string>(undefined);
  const [newUserRole, setNewUserRole] = useState('Visitor');
  const [unit, setUnit] = useState<undefined | string>(undefined);
  const [name, setName] = useState<undefined | string>(undefined);
  useEffect(() => {
    if (role === 'Admin') {
      axios
        .get(
          'https://signals-and-trends-api.azurewebsites.net/v1/users/list?offset=0&limit=100&roles=Visitor&roles=Curator&roles=Admin',
          {
            headers: {
              access_token: import.meta.env.VITE_ACCESS_CODE,
            },
          },
        )
        .then((response: AxiosResponse) => {
          setUserList(response.data);
        });
    }
  }, [role]);
  const navigate = useNavigate();
  return (
    <div
      className='margin-top-13 padding-top-09'
      style={{
        maxWidth: '60rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    >
      <button
        className='undp-button button-tertiary'
        type='button'
        onClick={() => {
          navigate(-1);
        }}
      >
        ← Back
      </button>
      <div className='flex-div flex-vert-align-center flex-space-between margin-top-05 margin-bottom-05'>
        <h3 className='undp-typography margin-bottom-00'>All Users</h3>
        {role === 'Admin' ? (
          <button
            type='button'
            className='undp-button button-tertiary'
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Add New User
          </button>
        ) : null}
      </div>
      <AuthenticatedTemplate>
        {role !== 'Admin' ? (
          <p className='undp-typography' style={{ color: 'var(--dark-red)' }}>
            You don&apos;t have enough right to see all users
          </p>
        ) : (
          <div>
            {userList ? (
              <UserListEl userList={userList} />
            ) : (
              <div className='undp-loader-container'>
                <div className='undp-loader' />
              </div>
            )}
          </div>
        )}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <SignInButton buttonText='Sign In to View Admin Panel' />
      </UnauthenticatedTemplate>
      <Modal
        open={openModal}
        className='undp-modal'
        onCancel={() => {
          setOpenModal(false);
        }}
      >
        <h5 className='undp-typography'>Add a new user</h5>
        <div className='flex-div flex-wrap flex-space-between margin-top-07 margin-bottom-05'>
          <div
            style={{
              flexGrow: 1,
              flexBasis: '15rem',
              width: 'calc(50% - 2rem)',
            }}
          >
            <p className='undp-typography margin-bottom-02'>Name</p>
            <Input
              className='undp-input'
              value={name}
              placeholder='Enter name'
              onChange={e => {
                setName(e.target.value);
              }}
            />
          </div>
          <div
            style={{
              flexGrow: 1,
              flexBasis: '15rem',
              width: 'calc(50% - 2rem)',
            }}
          >
            <p className='undp-typography margin-bottom-02'>
              E-Mail (should be a UNDP ID)
            </p>
            <Input
              className='undp-input'
              value={userName}
              onChange={e => {
                setuserName(e.target.value);
              }}
            />
          </div>
        </div>
        <div className='flex-div flex-wrap flex-space-between margin-bottom-07'>
          <div
            style={{
              flexGrow: 1,
              flexBasis: '15rem',
              width: 'calc(50% - 2rem)',
            }}
          >
            <p className='undp-typography margin-bottom-02'>Unit</p>
            <Select
              className='undp-select margin-bottom-07'
              placeholder='Select a unit'
              onChange={e => {
                setUnit(e);
              }}
              value={unit}
              showSearch
            >
              {UNITS.map((d, i) => (
                <Select.Option className='undp-select-option' key={i} value={d}>
                  {d}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div
            style={{
              flexGrow: 1,
              flexBasis: '15rem',
              width: 'calc(50% - 2rem)',
            }}
          >
            <p className='undp-typography margin-bottom-02'>Role</p>
            <Radio.Group
              value={newUserRole}
              onChange={e => {
                setNewUserRole(e.target.value);
              }}
              className='undp-button-radio margin-bottom-07'
            >
              <Radio.Button value='Visitor'>Visitor</Radio.Button>
              <Radio.Button value='Curator'>Curator</Radio.Button>
              <Radio.Button value='Admin'>Admin</Radio.Button>
            </Radio.Group>
          </div>
        </div>
        <div className='flex-div flex-wrap flex-space-between'>
          <button
            type='button'
            className='undp-button button-primary button-arrow'
            onClick={() => {
              axios({
                method: 'post',
                url: 'https://signals-and-trends-api.azurewebsites.net/v1/users/create',
                data: {
                  email: userName,
                  name,
                  unit,
                  role: newUserRole,
                },
                headers: {
                  'Content-Type': 'application/json',
                  access_token: import.meta.env.VITE_ACCESS_CODE,
                },
              }).then(() => {
                setOpenModal(false);
                navigate(0);
              });
            }}
          >
            Add User
          </button>
          <button
            type='button'
            className='undp-button button-tertiary'
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
