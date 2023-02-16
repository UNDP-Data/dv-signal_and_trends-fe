import undpLogo from './assets/undp-logo-blue.svg';

function App() {
  return (
    <div className='undp-container flex-div flex-wrap flex-hor-align-center margin-top-13 margin-bottom-13'>
      <div>
        <img
          src={undpLogo}
          className='logo react'
          alt='React logo'
          width='72px'
          style={{ margin: 'auto' }}
        />
      </div>
      <h3
        className='undp-typography'
        style={{ textAlign: 'center', width: '100%' }}
      >
        This is template for building visualization and frontend project for
        UNDP Data Futures Platform
      </h3>
    </div>
  );
}

export default App;
