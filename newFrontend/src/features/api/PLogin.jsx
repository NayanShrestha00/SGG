import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshAccessToken } from "./AuthServices"; // Function to refresh token
import { startLoading, stopLoading } from "../../store/loading"; // Import actions

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.auth.accessToken);

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            dispatch(startLoading()); // Dispatch loading start
            try {
                await dispatch(refreshAccessToken()); // Fetch new token on refresh
            } catch (err) {
                console.error("Error refreshing token:", err);
            } finally {
                if (isMounted) {
                    console.log("test complete");
                    
                    setIsLoading(false);
                }
                dispatch(stopLoading());
            }
        };

        // If no accessToken, try refreshing the token
        if (!accessToken) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }

        return () => {
            isMounted = false;
        };
    }, [accessToken, dispatch]);

    return isLoading ? <p>Loading...</p> : <Outlet />;
};

export default PersistLogin;
