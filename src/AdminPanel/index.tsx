import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import { Pagination } from 'antd';
import { SignInButton } from '../Components/SignInButton';
import Context from '../Context/Context';
import { UserDataType } from '../Types';
import { UserListEl } from './userList';

export function AdminPanel() {
  const { role, accessToken } = useContext(Context);
  const [userList, setUserList] = useState<UserDataType[]>([]);
  const [paginationValue, setPaginationValue] = useState(1);
  const [totalNo, setTotalNo] = useState(0);
  useEffect(() => {
    if (role === 'Admin') {
      axios
        .get(
          'https://signals-and-trends-api.azurewebsites.net/v1/users/count?roles=Admin&roles=Curator&roles=Visitor',
          {
            headers: {
              access_token: accessToken,
            },
          },
        )
        .then((response: AxiosResponse) => {
          setTotalNo(response.data);
        });
    }
  }, [accessToken]);
  useEffect(() => {
    if (role === 'Admin') {
      axios
        .get(
          `https://signals-and-trends-api.azurewebsites.net/v1/users/list??offset=${
            50 * (paginationValue - 1)
          }&limit=50&roles=Visitor&roles=Curator&roles=Admin`,
          {
            headers: {
              access_token: accessToken,
            },
          },
        )
        .then((response: AxiosResponse) => {
          setUserList(response.data);
        });
    }
  }, [role, paginationValue, accessToken]);
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
      </div>
      <AuthenticatedTemplate>
        {role !== 'Admin' ? (
          <p className='undp-typography' style={{ color: 'var(--dark-red)' }}>
            You don&apos;t have enough right to see all users
          </p>
        ) : (
          <div>
            {userList ? (
              <>
                <UserListEl userList={userList} />
                <div className='flex-div flex-hor-align-center margin-top-07'>
                  <Pagination
                    className='undp-pagination'
                    onChange={e => {
                      setPaginationValue(e);
                    }}
                    defaultCurrent={1}
                    current={paginationValue}
                    total={totalNo}
                    pageSize={50}
                    showSizeChanger={false}
                  />
                </div>
              </>
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
    </div>
  );
}
