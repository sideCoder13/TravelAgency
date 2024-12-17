import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastContainer } from 'react-toastify';
import AppContextProvider from './context/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppContextProvider>
        <App />
        <ToastContainer position='top-center' theme='dark'/>
    </AppContextProvider>
);

