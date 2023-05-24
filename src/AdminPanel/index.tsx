import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import { Input, Pagination, Select } from 'antd';
import { SignInButton } from '../Components/SignInButton';
import Context from '../Context/Context';
import { UserDataType } from '../Types';
import { UserListEl } from './userList';

export function AdminPanel() {
  const { role, accessToken } = useContext(Context);
  const [userList, setUserList] = useState<UserDataType[] | undefined>(
    undefined,
  );
  const [paginationValue, setPaginationValue] = useState(1);
  const [filterRole, setFilterRole] = useState('All Roles');
  const [searchQuery, setSearchQuery] = useState<undefined | string>(undefined);
  const [error, setError] = useState<undefined | string>(undefined);
  const [filter, setFilter] = useState<undefined | string>(undefined);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    if (role === 'Admin') {
      setUserList(undefined);
      setError(undefined);
      /* eslint no-console: ["error", { allow: ["log", "error"] }] */
      console.log('filter', filter);
      const roleQueryParameter =
        filterRole === 'All Roles'
          ? 'roles=User&roles=Curator&roles=Admin'
          : `roles=${filterRole}`;
      const searchQueryParameter = filter ? `&query=${filter}` : '';
      axios
        .get(
          `https://signals-and-trends-api.azurewebsites.net/v1/users/list?&page=1&per_page=50&${roleQueryParameter}${searchQueryParameter}`,
          {
            headers: {
              access_token: accessToken,
            },
          },
        )
        .then((response: AxiosResponse) => {
          setUserList(response.data.data);
          setPaginationValue(1);
        })
        .catch(err => {
          if (err.response?.status === 404) {
            setUserList([]);
          } else {
            setError(
              `Error code ${err.response?.status}: ${err.response?.data}. ${
                err.response?.status === 500
                  ? 'Please try again in some time'
                  : ''
              }`,
            );
          }
        });
    }
  }, [role, accessToken, filterRole, filter]);
  useEffect(() => {
    if (role === 'Admin') {
      setUserList(undefined);
      setError(undefined);
      const roleQueryParameter =
        filterRole === 'All Roles'
          ? 'roles=User&roles=Curator&roles=Admin'
          : `roles=${filterRole}`;
      const searchQueryParameter = filter ? `&query=${filter}` : '';
      axios
        .get(
          `https://signals-and-trends-api.azurewebsites.net/v1/users/list?&page=${paginationValue}&per_page=50&${roleQueryParameter}${searchQueryParameter}`,
          {
            headers: {
              access_token: accessToken,
            },
          },
        )
        .then((response: AxiosResponse) => {
          setTotalCount(response.data.total_count);
          setUserList(response.data.data);
        });
    }
  }, [paginationValue]);
  const navigate = useNavigate();
  return (
    <div
      className='margin-top-13 padding-top-09'
      style={{
        width: '100%',
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
      <div
        className='flex-div flex-space-between margin-top-05 margin-bottom-09'
        style={{ alignItems: 'flex-end' }}
      >
        <h3 className='undp-typography margin-bottom-00'>All Users</h3>
        <div>
          <p className='undp-typography label'>Filter by roles</p>
          <Select
            className='undp-select'
            placeholder='Filter by role'
            onChange={e => {
              setFilterRole(e);
            }}
            value={filterRole}
            showSearch
            style={{ width: '15rem' }}
          >
            {['All Roles', 'Admin', 'Curator', 'User'].map((d, i) => (
              <Select.Option className='undp-select-option' key={i} value={d}>
                {d}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>

      <div
        style={{ width: '100%' }}
        className='flex-div gap-00 margin-bottom-09'
      >
        <Input
          placeholder='Search users'
          className='undp-input'
          size='large'
          value={searchQuery}
          onChange={d => {
            setSearchQuery(d.target.value);
          }}
          onPressEnter={() => {
            setFilter(searchQuery);
          }}
        />
        <button
          type='button'
          className='undp-button button-secondary'
          onClick={() => {
            setFilter(searchQuery);
          }}
        >
          Search
        </button>
      </div>
      {userList ? (
        <div className='margin-bottom-05'>
          {totalCount} {totalCount > 1 ? 'users' : 'user'}
        </div>
      ) : null}
      <AuthenticatedTemplate>
        {role !== 'Admin' ? (
          <p className='undp-typography' style={{ color: 'var(--dark-red)' }}>
            You don&apos;t have enough right to see all users
          </p>
        ) : (
          <div>
            {userList ? (
              userList.length > 0 ? (
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
                      total={totalCount}
                      pageSize={50}
                      showSizeChanger={false}
                    />
                  </div>
                </>
              ) : (
                <h5
                  className='undp-typography bold'
                  style={{
                    backgroundColor: 'var(--gray-200)',
                    textAlign: 'center',
                    padding: 'var(--spacing-07)',
                    width: 'calc(100% - 4rem)',
                    border: '1px solid var(--gray-400)',
                  }}
                >
                  No users available matching your criteria
                </h5>
              )
            ) : error ? (
              <p
                className='margin-top-00 margin-bottom-00'
                style={{ color: 'var(--dark-red)' }}
              >
                {error}
              </p>
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
