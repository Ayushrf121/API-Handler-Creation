import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import store from '../redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
// import App15 from './App15';
import App14 from './App14';
import { LoadingProvider } from './context/LoadingContext';
// import App13 from './App13';
// import App11 from './App11';
// import App12 from './App12';
// import App10 from './App10';
// import App9 from './App9';
// import App8 from './App8';
// import App7 from './App7'
// import App6 from './App6'
// import App from './App.jsx'
// import App2 from './App2.jsx'
// import App3 from './App3.jsx'
// import App4 from './App4.jsx'
// import App5 from './App5.jsx'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      {/* <App /> */}
      {/* <App2 /> */}
      {/* <App3/> */}
      {/* <App4/> */}
      {/* <App5/> */}
      {/* <App6/> */}
      {/* <App7 /> */}
      {/* <App8/> */}
      {/* <App9 /> */}
      {/* <App10/> */}
      {/* <App11/> */}
      {/* <App12/> */}
      {/* <App13/> */}
      <Provider store={store}>
        <LoadingProvider>

          <App14 />

        </LoadingProvider>
        {/* <App15 /> */}
      </Provider>
    </BrowserRouter>
  </GoogleOAuthProvider>
)
