import { useState, useEffect, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ServerContext from '../contexts/SeverContextProvider';
import { Link, useNavigate } from 'react-router-dom';
import banner from '../../public/resources/banner1.jpg';

import Spinner from '../UI/Spinner';
import Button from '../UI/Button';
import Input from '../UI/Input';

const Login = ({ notLoginMsg }) => {
  const serverHost = useContext(ServerContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (input) => {
      const url = `${serverHost}/api/v1/users/login`;
      const result = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      return result.json();
    },
    onSuccess: () => {},
  });
  // State kiểm tra nhập liệu lần đầu
  const [firstTime, setFirstTime] = useState(true);
  // State input email và password
  const [formInput, setFormInput] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formInput;
  // State thông báo
  const [msg, setMsg] = useState('');

  // Hiện thị thông báo không đúng yêu cầu, thông báo cập nhật mỗi khi người dùng nhập liệu
  useEffect(() => {
    if (email === '' || password === '') {
      setMsg((msg) => `${msg}\n- All input must be filled in`);
    }
    if (password.length <= 8) {
      setMsg((msg) => `${msg}\n- Password must be at least 8 characters`);
    }
    return () => setMsg('');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Người dùng nhập liệu không đúng thì người dùng mất lần đầu
    if (firstTime) {
      setFirstTime(false);
    }
    // Kiểm tra nếu có thông báo lỗi thì không cho post form, nếu không thì xóa input và cho post
    if (!msg.length) {
      const result = await mutateAsync(formInput);
      if (!result.ok) {
        setMsg(result.message);
      }
      if (result.status === 'success') {
        queryClient.invalidateQueries(['login']);
        setFormInput({
          fullname: '',
          email: '',
          password: '',
          phone: '',
        });
        navigate('/');
      }
    }
  };
  // setState khi thay đổi nhập liệu
  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const shadow =
    'shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px]';
  return (
    <div
      className="relative h-[800px] w-full bg-contain"
      style={{ backgroundImage: `url(${banner})` }}
    >
      {isPending ? (
        <Spinner />
      ) : (
        <div
          className={`absolute m-auto w-1/2 bg-white ${shadow} inset-1/2 h-3/4 -translate-x-1/2 rounded-md p-10 text-center`}
        >
          <p className="text-4xl font-light">Sign in</p>
          <form className="mt-20 [&_*]:not-italic" onSubmit={handleSubmit}>
            <div className="[&>*]:w-full [&>*]:p-5">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                handleChange={handleChange}
                value={email}
              />
              <Input
                id="password"
                type="password"
                placeholder="Password"
                handleChange={handleChange}
                value={password}
              />
              <p className="whitespace-pre text-xs italic text-red-500">
                {!firstTime && msg}
                {!msg.length ? notLoginMsg : ''}
              </p>
            </div>
            <Button
              className="w-full py-4 disabled:cursor-not-allowed disabled:bg-red-500"
              isDisabled={msg !== '' && !firstTime}
            >
              SIGN IN
            </Button>
          </form>
          <p className="mt-9 font-thin tracking-wide">
            Create An Account?{' '}
            <Link to="/register" className="text-sky-500">
              Sign up
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};
export default Login;
