import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function CheckAuth({ children, isLoading }) {
    const location = useLocation();
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    // Wait for PersistLogin to finish loading
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // If the user is not authenticated
    if (!isAuthenticated) {
        const publicRoutes = ["/login", "/register", "/admin/login", "/manager/login"];
        if (publicRoutes.includes(location.pathname)) {
            return <>{children}</>;
        }
        if (location.pathname.includes("/admin")) {
            return <Navigate to="/admin/login" replace />;
        }
        if (location.pathname.includes("/manager")) {
            return <Navigate to="/manager/login" replace />;
        }
        return <Navigate to="/login" replace />;
    }

    // Role-based authentication
    if (user?.role === "Admin") {
        if (location.pathname.includes("/admin")) {
            return <>{children}</>;
        }
        return <Navigate to="/unauthorized" replace />;
    }

    if (user?.role === "Manager") {
        if (location.pathname.includes("/manager")) {
            return <>{children}</>;
        }
        return <Navigate to="/unauthorized" replace />;
    }

    if (location.pathname.includes("/admin") || location.pathname.includes("/manager")) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
}

export default CheckAuth;