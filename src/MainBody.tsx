import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AddNewSignalEl, AddNewTrendEl } from './AddNew';
import { AdminPanel } from './AdminPanel';
import Context from './Context/Context';
import { EditSignal } from './Signals/EditSignal';
import { EditTrend } from './Trends/EditTrend';
import { HomePage } from './HomePage';
import { SignalDetail } from './Signals/SignalDetail';
import { SignalsListing } from './Signals';
import { TrendDetail } from './Trends/TrendDetail';
import { TrendsListing } from './Trends';
import { MyDrafts } from './MyDrafts';

function MainBody() {
  const { name } = useContext(Context);
  return (
    <>
      <AuthenticatedTemplate>
        {name ? (
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
        ) : (
          <div className='undp-loader-container'>
            <div className='undp-loader' />
          </div>
        )}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
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
      </UnauthenticatedTemplate>
    </>
  );
}

export default MainBody;
