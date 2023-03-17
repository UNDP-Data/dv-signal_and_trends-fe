import { Route, Routes } from 'react-router-dom';
import { AddNewSignalEl, AddNewTrendEl } from './AddNew';
import { Footer } from './Components/FooterEl';
import { Header } from './Components/HeaderEl';
import { EditSignal } from './EditSignal';
import { EditTrend } from './EditTrend';
import { HomePage } from './HomePage';
import { SignalDetail } from './SignalDetail';
import { SignalsListing } from './Signals';
import { TrendDetail } from './TrendDetail';
import { TrendsListing } from './Trends';

function App() {
  return (
    <>
      <Header />
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
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
