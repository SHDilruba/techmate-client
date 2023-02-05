import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import useToken from '../../Shared/hooks/useToken';
import useTitle from '../../Shared/hooks/useTitle';
import Loading from '../../Shared/Loading/Loading';

const SignUp = () => {
    useTitle('SignUp');
  const {register,  handleSubmit, formState: { errors } } = useForm();
  const {createUser, updateUser, loading, setLoading} = useContext(AuthContext);
  const [signUpError, setSignUpError] = useState('');
  const [success, setSuccess] = useState(false);
   
  const [createdUserEmail, setCreatedUserEmail] = useState('');
  const [token] = useToken(createdUserEmail);
  const navigate = useNavigate();

  if(token){
    navigate('/');
  }

  const handleSignUp = (data) =>{
    setSignUpError('');
    createUser(data.email, data.password)
    .then(result =>{
       const user = result.user;
       console.log(user);
       setSuccess(true); 
       toast.success('Signed up successfully')
        const userInfo = {
        displayName: data.name,
        role: data.role,
        user_quality: data.user_quality
       }
       updateUser(userInfo)
       .then(() =>{
           saveUser(data.name, data.email, data.role, data.user_quality);
           
       })
       .catch(err => console.log(err));
    })
    .catch(error => {
      console.log(error)
      setSignUpError(error.message)
      setLoading(false);
    })
  };

  const saveUser = (name, email, role) =>{
      const user = {name, email, role};
      fetch('http://localhost:5000/users', {
         method: 'POST',
         headers: {
               'content-type': 'application/json'
         },
         body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(data =>{
        setCreatedUserEmail(email);
      })
  }

  return (
    <div className='h-full flex justify-center items-center md:mt-8 sm:w-[36rem] mx-auto sm:mb-8 lg:mb-28'>
       <div className='w-full px-10  pb-10 shadow-lg rounded-lg bg-gradient-to-r from-secondary to-accent pt-10'>
          <h2 className='text-4xl text-center mb-5 text-white'>Sign Up</h2>

          <form onSubmit={handleSubmit(handleSignUp)}>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text text-white">Name</span>
                </label>
                <input type="name" {...register("name", {
                   required: 'Name is Required'
                })}
                className="input input-bordered w-full" />
                  {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
            </div>

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
                    <span className="label-text text-white">Password</span>
                </label>
                <input type="password" {...register("password",{
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be 6 characters long'},
                    pattern: {value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special character'}
                })} 
                className="input input-bordered w-full"/>
                {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
            </div>

            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text text-white">Want to be a seller/buyer? Please write in lowercase</span>
                </label>
                <input type="text" {...register("role", {
                    required: 'Please fill this option',
                })}
                className="input input-bordered w-full mb-7" />
                 {errors.role && <p className='text-red-600'>{errors.role?.message}</p>}
            </div>
            
              <button className='btn btn-accent text-white w-full' type="submit"> {loading ? <Loading></ Loading>:'Sign Up'
              }  </button>
              {signUpError && <p className='text-red-600'>{signUpError}</p>}
          </form>

          <p className='my-2'><small className='text-white'>Allready have an account?</small> <Link className='text-accent' to="/login">Please Login </Link></p> 
          <div className="divider mt-6">OR</div>
         <button className='btn btn-Ghost outline text-black bg-base-300 w-full mb-6'>CONTINUE WITH GOOGLE </button>
      </div>
    </div>
  );
};

export default SignUp;