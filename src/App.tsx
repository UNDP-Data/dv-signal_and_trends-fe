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
    <div className='undp-container'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signals' element={<SignalsListing />} />
        <Route path='/signals/:id' element={<SignalDetail />} />
        <Route path='/trends' element={<TrendsListing />} />
        <Route path='/trends/:id' element={<TrendDetail />} />
        <Route path='/add-new-signal' element={<AddNewSignalEl />} />
        <Route path='/edit-signal/:id' element={<EditSignal />} />
        <Route path='/add-new-trend' element={<AddNewTrendEl />} />
        <Route path='/edit-trend/:id' element={<EditTrend />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
