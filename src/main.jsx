import { Suspense } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-toastify/dist/ReactToastify.css';
import { HelmetProvider } from 'react-helmet-async';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Slide, ToastContainer } from 'react-toastify';

import App from './app';
import { store } from './redux/store';
// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <HelmetProvider>
        <Provider store={store}>
            <Suspense>
                <App />
                <ToastContainer closeButton hideProgressBar position="top-right" transition={Slide} autoClose={3000} />
            </Suspense>
        </Provider>
    </HelmetProvider>
);
