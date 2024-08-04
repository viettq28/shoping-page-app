import { useLocation } from 'react-router-dom';
import Login from '../components/Login';

const LoginPage = () => {
  const location = useLocation();
  return <Login notLoginMsg={location.state?.msg || ''} />;
};
export default LoginPage;