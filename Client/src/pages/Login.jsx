import { useState, useContext } from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext'
import api from '../api/axios';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, getUserData } = useContext(AppContent);
  const [state, setState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {

      if (state === 'Sign Up') {
        const { data } = await api.post('/api/auth/register', { name, email, password });
        if (data.success) {
          setIsLoggedIn(true);
          await getUserData();
          navigate('/');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await api.post('/api/auth/login', { email, password });
        if (data.success) {
          setIsLoggedIn(true);
          await getUserData();
          navigate('/');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-800 to-purple-900'>
      <img onClick={() => navigate('/')} src={assets.authLogo} alt="logo_tudu" 
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'/>

      <div className='bg-[#2c2f3a] p-10 rounded-lg shadow-lg w-full sm:w-96 text-gray-100 text-sm'>
  <h2 className='text-3xl font-semibold text-white text-center mb-3'>
    {state === 'Sign Up' ? 'Create Account' : 'Login'}
  </h2>
  <p className='text-center text-sm mb-6'>
    {state === 'Sign Up' ? 'Create your account' : 'Login to your account!'}
  </p>

  <form onSubmit={onSubmitHandler}>
    {state === 'Sign Up' && (
      <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#3a3f50]'>
        <img src={assets.person_icon} alt="person" />
        <input type="text" name="Full Name" placeholder='Full Name' required 
          className='bg-transparent outline-none text-gray-100'
          onChange={e => setName(e.target.value)}
          value={name}/>
      </div>
    )}

    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#3f4458]'>
      <img src={assets.mail_icon} alt="email" />
      <input type="email" name="email" placeholder='Email id' required 
        className='bg-transparent outline-none text-gray-100'
        onChange={e => setEmail(e.target.value)}
        value={email}/>
    </div>

    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#353945]'>
      <img src={assets.lock_icon} alt="password" />
      <input type="password" name="password" placeholder='Password' required 
        className='bg-transparent outline-none text-gray-100'
        onChange={e => setPassword(e.target.value)}
        value={password}/>
    </div>

    <p onClick={()=> navigate('/reset-password')} className='mb-4 text-teal-400 cursor-pointer'>
      Forgot Password?
    </p>

    <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-medium'>
      {state}
    </button>
  </form>

  {state === 'Sign Up' ? (
    <p className='text-gray-400 text-center text-xs mt-4'>
      Already have an account?{" "}
      <span onClick={()=>setState('Login')} className='text-teal-400 cursor-pointer underline'>Login here</span>
    </p>
  ) : (
    <p className='text-gray-400 text-center text-xs mt-4'>
      Don't have an account?{" "}
      <span onClick={()=>setState('Sign Up')} className='text-teal-400 cursor-pointer underline'>Sign up</span>
    </p>
  )}
</div>

    </div>
  )
}

export default Login;
