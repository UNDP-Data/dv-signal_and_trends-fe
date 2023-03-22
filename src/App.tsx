/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { PublicClientApplication } from '@azure/msal-browser';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { Modal, Select } from 'antd';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useReducer, useMemo, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AddNewSignalEl, AddNewTrendEl } from './AddNew';
import { AdminPanel } from './AdminPanel';
import { Footer } from './Components/FooterEl';
import { Header } from './Components/HeaderEl';
import { SignUpButton } from './Components/SignUpButton';
import { msalConfig } from './Config';
import { UNITS } from './Constants';
import Context from './Context/Context';
import Reducer from './Context/Reducer';
import { EditSignal } from './EditSignal';
import { EditTrend } from './EditTrend';
import { HomePage } from './HomePage';
import { SignalDetail } from './SignalDetail';
import { SignalsListing } from './Signals';
import { TrendDetail } from './TrendDetail';
import { TrendsListing } from './Trends';

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
  const initialState = {
    userName: undefined,
    name: undefined,
    unit: undefined,
    role: undefined,
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
  const { accounts } = useMsal();
  useEffect(() => {
    if (isAuthenticated) {
      const usernameFromMSAL = accounts[0].username;
      const nameFromMSAL = accounts[0].name;
      setUsername(usernameFromMSAL);
      setName(nameFromMSAL);
      axios
        .get(
          `https://signals-and-trends-api.azurewebsites.net/v1/users/fetch?email=${usernameFromMSAL}`,
          {
            headers: {
              access_token: import.meta.env.VITE_ACCESS_CODE,
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
    }
  }, [isAuthenticated]);
  const contextValue = useMemo(
    () => ({
      ...state,
      updateUserName,
      updateName,
      updateRole,
      updateUnit,
    }),
    [state, updateUserName, updateRole, updateUnit, updateName],
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
