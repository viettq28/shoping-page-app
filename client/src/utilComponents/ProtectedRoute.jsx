import { useEffect } from 'react';
import { useNavigate, Outlet, useOutletContext } from 'react-router-dom';
import useIsLoggedIn from '../hook/useIsLoggedIn';
import Spinner from '../UI/Spinner';
// Chuyển hướng người dùng đến LoginPage nếu người dùng truy cập vào các Route không cho phép
const ProtectedRoute = ({ authorities }) => {
  const outletProp = useOutletContext();
  const navigate = useNavigate();
  const { currentUser, isFetching } = useIsLoggedIn();

  useEffect(() => {
    if (!isFetching) {
      if (!currentUser) {
        navigate('/login', { state: { msg: 'Please login first to access this page!!!' } });
      } else if (authorities && !(authorities.includes(currentUser.role))) {
        navigate('/');
      }
    }
  }, [currentUser, navigate, isFetching, authorities]);

  return isFetching ? <Spinner /> : <Outlet context={outletProp} />;
};
export default ProtectedRoute;
