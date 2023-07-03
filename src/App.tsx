import { AuthenticationResult } from '@azure/msal-browser';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { Modal, Select } from 'antd';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useReducer, useMemo, useState } from 'react';
import { Footer } from './Components/FooterEl';
import { SignUpButton } from './Components/SignUpButton';
import { API_ACCESS_TOKEN, CHOICES } from './Constants';
import Context from './Context/Context';
import Reducer from './Context/Reducer';
import MainBody from './MainBody';
import { CardsToPrintDataType, ChoicesDataType } from './Types';

import './App.css';

function App() {
  const isAuthenticated = useIsAuthenticated();
  const [openModal, setOpenModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<string | undefined>(
    undefined,
  );
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);
  const [expiresOn, setExpiresOn] = useState<Date | undefined>(undefined);
  const initialState = {
    userName: undefined,
    name: undefined,
    unit: undefined,
    role: undefined,
    accessToken: undefined,
    expiresOn: undefined,
    notificationText: undefined,
    choices: undefined,
    cardsToPrint: [],
  };

  const [state, dispatch] = useReducer(Reducer, initialState);
  const updateNotificationText = (d?: string) => {
    dispatch({
      type: 'UPDATE_NOTIFICATION_TEXT',
      payload: d,
    });
  };

  const updateChoices = (d?: ChoicesDataType) => {
    dispatch({
      type: 'UPDATE_CHOICES',
      payload: d,
    });
  };
  const updateCardsToPrint = (d: CardsToPrintDataType[]) => {
    dispatch({
      type: 'UPDATE_CARDS_TO_PRINT',
      payload: d,
    });
  };
  const updateUserName = (d?: string) => {
    dispatch({
      type: 'UPDATE_USERNAME',
      payload: d,
    });
  };
  const updateName = (d?: string) => {
    dispatch({
      type: 'UPDATE_NAME',
      payload: d,
    });
  };
  const updateUnit = (d?: string) => {
    dispatch({
      type: 'UPDATE_UNIT',
      payload: d,
    });
  };
  const updateRole = (d?: 'Admin' | 'Curator' | 'User') => {
    dispatch({
      type: 'UPDATE_ROLE',
      payload: d,
    });
  };
  const updateAccessToken = (d?: string) => {
    dispatch({
      type: 'UPDATE_ACCESS_TOKEN',
      payload: d,
    });
  };
  const updateExpiresOn = (d: Date) => {
    dispatch({
      type: 'UPDATE_EXPIRES_ON',
      payload: d,
    });
  };
  const updateUserID = (d?: number) => {
    dispatch({
      type: 'UPDATE_USER_ID',
      payload: d,
    });
  };
  const { accounts, instance } = useMsal();
  useEffect(() => {
    axios
      .get(`https://signals-and-trends-api.azurewebsites.net/v1/choices/list`, {
        headers: {
          access_token: API_ACCESS_TOKEN,
        },
      })
      .then((response: AxiosResponse) => {
        updateChoices(response.data);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.warn(err);
        updateChoices(CHOICES);
      });
  }, []);
  useEffect(() => {
    if (isAuthenticated) {
      const usernameFromMSAL = accounts[0].username;
      const nameFromMSAL = accounts[0].name;
      setUsername(usernameFromMSAL);
      setName(nameFromMSAL);
      const accessTokenRequest = {
        scopes: ['user.read'],
        account: accounts[0],
      };
      instance
        .acquireTokenSilent(accessTokenRequest)
        .then((accessTokenResponse: AuthenticationResult) => {
          updateAccessToken(accessTokenResponse.accessToken);
          setExpiresOn(accessTokenResponse.expiresOn as Date);
          updateExpiresOn(accessTokenResponse.expiresOn as Date);
          axios
            .get(
              'https://signals-and-trends-api.azurewebsites.net/v1/users/me',
              {
                headers: {
                  access_token: accessTokenResponse.accessToken,
                },
              },
            )
            .then((res: AxiosResponse) => {
              updateUserName(res.data.email);
              updateName(res.data.name);
              updateUnit(res.data.unit);
              updateRole(res.data.role);
              updateUserID(res.data.id);
            })
            .catch((err: AxiosError) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              if ((err.response?.data as any).detail === 'User not found.') {
                setOpenModal(true);
              }
            });
        });

      setInterval(async () => {
        const now = new Date().getTime() / 1000;
        if (expiresOn && expiresOn.getTime() / 1000 < now) {
          try {
            const refreshedAccessToken = await instance.acquireTokenSilent({
              ...accessTokenRequest,
              forceRefresh: true,
            });
            updateAccessToken(refreshedAccessToken.accessToken);
            setExpiresOn(refreshedAccessToken.expiresOn as Date);
            updateExpiresOn(refreshedAccessToken.expiresOn as Date);
          } catch (error) {
            // eslint-disable-next-line no-console
          }
        }
      }, 60000); // check every minute
    }
  }, [isAuthenticated, instance]);
  const contextValue = useMemo(
    () => ({
      ...state,
      updateUserName,
      updateName,
      updateRole,
      updateUnit,
      updateAccessToken,
      updateExpiresOn,
      updateUserID,
      updateNotificationText,
      updateCardsToPrint,
    }),
    [
      state,
      updateUserName,
      updateRole,
      updateUnit,
      updateName,
      updateAccessToken,
      updateExpiresOn,
      updateUserID,
      updateNotificationText,
      updateCardsToPrint,
    ],
  );
  return (
    <Context.Provider value={contextValue}>
      <div
        className='undp-container'
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <MainBody />
        <Footer />
        {}
      </div>
      <Modal open={openModal} className='undp-modal'>
        <h5 className='undp-typography bold margin-bottom-07'>
          Welcome to the UNDP Signal and Trends Portal
        </h5>
        <p className='undp-typography label'>
          Please select the unit you belong to
        </p>
        <Select
          className='undp-select margin-bottom-07'
          placeholder='Select a unit'
          onChange={e => {
            setSelectedUnit(e);
          }}
          value={selectedUnit}
          showSearch
        >
          {CHOICES.units.map((d, i) => (
            <Select.Option className='undp-select-option' key={i} value={d}>
              {d}
            </Select.Option>
          ))}
        </Select>
        {selectedUnit ? (
          <SignUpButton
            name={name}
            username={username as string}
            unit={selectedUnit}
            setOpenModal={setOpenModal}
          />
        ) : (
          <button
            type='button'
            className='undp-button primary-button button-arrow disabled'
            disabled
          >
            Sign Up
          </button>
        )}
      </Modal>
    </Context.Provider>
  );
}

export default App;
