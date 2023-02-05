import React from 'react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../Shared/hooks/useToken';
import useTitle from '../../Shared/hooks/useTitle';
import { GoogleAuthProvider } from 'firebase/auth';
import logImg from '../../assets/extra/login.webp'

const Login = () => {
  useTitle('Login');
  const {register, formState: { errors }, handleSubmit} = useForm();
  const {signIn, providerLogin} = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');
  const [loginUserEmail, setLoginUserEmail] = useState('');
  const [token] = useToken(loginUserEmail);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';
  if(token){
    navigate(from, {replace: true});
  }

  const handleLogin = data =>{
    console.log(data);
    setLoginError('');
    signIn(data.email, data.password)
    .then(result => {
        const user = result.user;
        setLoginUserEmail(data.email);
    })
    .catch(error => {
      console.log(error.message)
      setLoginError(error.message);
    });
  }

  const googleProvider = new GoogleAuthProvider();
     
  const handleGoogleSignIn = () =>{
    providerLogin(googleProvider)
    .then(result => {
      const user = result.user; 
      navigate(from, {replace: true})
       console.log(user);
     })
     .catch(error => {
      console.error('error', error)
     })
     }

  return (
   <div className='sm:flex lg:gap-16 justify-center items-center mt-10 sm:mb-5 lg:mb-28'>
      <img className='w-2/4 h-full hidden sm:block ' src={logImg} alt="" /> 
    <div className='bg-gradient-to-r from-secondary to-accent rounded-lg'>
       <div className='w-full md:w-96 px-10 pb-10 shadow-lg rounded-lg'>
          <h2 className='text-4xl text-center my-6  text-white'>Log in</h2>

          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text text-white">Email</span>
                </label>
                <input type="email" {...register("email", {
                   required: 'Email Address is required'
                })}
                className="input input-bordered w-full" />
                {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
            </div>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text  text-white">Password</span>
                </label>
                <input type="password" {...register("password",{
                    required: 'Password is required'
                })} 
                className="input input-bordered w-full"/>
                <label className="label">
                    <span className="label-text text-accent">Forget Password</span>
                </label>
                {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
            </div>

            <div className="form-control w-ful mb-8">
                <label className="label">
                    <span className="label-text  text-white">user/seller</span>
                </label>
                <select
               {...register("role")}
               className="input input-bordered w-full">              
                <option>user</option>
                <option>seller</option>
                </select>
            </div>

              <input className='btn btn-accent w-full text-white' value="login"
              type="submit" />
              { loginError && <p className='text-red-600'>{loginError}</p>}
          </form>
          <p className='my-2'><small className='text-white mr-1'>New to TecMate?</small> <Link to='/signup' className=' text-accent outline px-1'>create new account </Link></p> 
         <div className="divider my-6">OR</div>
         <button onClick={handleGoogleSignIn} className='btn btn-outline w-full  text-white'>CONTINUE WITH GOOGLE </button>
      </div>
    </div>
   </div>
  );
};

export default Login;