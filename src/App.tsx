import { Route, Routes } from 'react-router-dom';
import { Footer } from './Components/FooterEl';
import { Header } from './Components/HeaderEl';
import { HomePage } from './HomePage';
import { SignalsListing } from './Signals';
import { TrendsListing } from './Trends';

function App() {
  return (
    <div className='undp-container'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signals' element={<SignalsListing />} />
        <Route path='/trends' element={<TrendsListing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
