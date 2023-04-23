import {
  AuthenticationResult,
  PublicClientApplication,
} from '@azure/msal-browser';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { Modal, Select } from 'antd';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useReducer, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AddNewSignalEl, AddNewTrendEl } from './AddNew';
import { AdminPanel } from './AdminPanel';
import { Footer } from './Components/FooterEl';
import { Header } from './Components/HeaderEl';
import { SignUpButton } from './Components/SignUpButton';
import { msalConfig } from './Config';
import { UNITS } from './Constants';
import Context from './Context/Context';
import Reducer from './Context/Reducer';
import { EditSignal } from './Signals/EditSignal';
import { EditTrend } from './Trends/EditTrend';
import { HomePage } from './HomePage';
import { SignalDetail } from './Signals/SignalDetail';
import { SignalsListing } from './Signals';
import { TrendDetail } from './Trends/TrendDetail';
import { TrendsListing } from './Trends';
import { MyDrafts } from './MyDrafts';

function signOutClickHandler() {
  const msalInstance = new PublicClientApplication(msalConfig);
  const logoutRequest = {
    postLogoutRedirectUri: '/',
  };
  msalInstance.logoutRedirect(logoutRequest);
}

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
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

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
  const updateRole = (d?: 'Admin' | 'Curator' | 'Visitor') => {
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
  const { accounts, instance } = useMsal();
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
    }),
    [
      state,
      updateUserName,
      updateRole,
      updateUnit,
      updateName,
      updateAccessToken,
      updateExpiresOn,
    ],
  );
  return (
    <Context.Provider value={contextValue}>
      <Header signOutClickHandler={signOutClickHandler} />
      <div
        className='undp-container'
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/signals' element={<SignalsListing />} />
            <Route path='/signals/:id' element={<SignalDetail />} />
            <Route path='/signals/:id/edit' element={<EditSignal />} />
            <Route path='/trends' element={<TrendsListing />} />
            <Route path='/trends/:id' element={<TrendDetail />} />
            <Route path='/trends/:id/edit' element={<EditTrend />} />
            <Route path='/add-new-signal' element={<AddNewSignalEl />} />
            <Route path='/add-new-trend' element={<AddNewTrendEl />} />
            <Route path='/admin-panel' element={<AdminPanel />} />
            <Route path='/my-drafts' element={<MyDrafts />} />
          </Routes>
        </div>
        <Footer />
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
          {UNITS.map((d, i) => (
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
