import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import useIsLoggedIn from "../hook/useIsLoggedIn";

const PreventAuth = () => {
  const navigate = useNavigate();
  const { currentUser } = useIsLoggedIn();

  useEffect(() => {
    if (currentUser) {navigate('/')}
  }, [currentUser, navigate]);

  return <Outlet />
};
export default PreventAuth