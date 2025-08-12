import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Index from '../pages/Index';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Index />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;