import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshAccessToken } from "./AuthServices";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const { auth } = useSelector(state => state.auth);

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await dispatch(refreshAccessToken());
            } catch (err) {
                console.error("Error refreshing token:", err);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        if (!auth?.accessToken) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }

        return () => {
            isMounted = false;
        };
    }, [auth, dispatch]);

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <Outlet />
            )}
        </>
    );
};

export default PersistLogin;