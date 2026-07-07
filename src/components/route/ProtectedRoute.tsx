import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login", {
                replace: true,
                state: {
                    message: "Anda belum login! Silakan login terlebih dahulu.",
                },
            });
        }
    }, [user, navigate]);

    if (!user) {
        return null;
    }

    return <Outlet />;
};

export default ProtectedRoute;