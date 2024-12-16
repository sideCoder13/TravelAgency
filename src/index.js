import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <App />
        <ToastContainer />
    </div>
);

