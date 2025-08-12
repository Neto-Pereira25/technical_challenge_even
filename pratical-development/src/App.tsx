import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer position='top-right' autoClose={2500} />
    </BrowserRouter>
  );
}

export default App;
