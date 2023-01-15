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
      //  form.reset();
       toast.success('Signed up successfully')
        const userInfo = {
        displayName: data.name
       }
       updateUser(userInfo)
       .then(() =>{
           saveUser(data.name, data.email);
       })
       .catch(err => console.log(err));
    })
    .catch(error => {
      console.log(error)
      setSignUpError(error.message)
      setLoading(false);
    })
  };

  const saveUser = (name, email) =>{
      const user = {name, email};
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
    <div className='h-[800px] flex justify-center items-center'>
       <div className='w-96 px-10 pb-10 shadow-lg rounded-lg'>
          <h2 className='text-4xl text-center mb-8 text-secondary'>Sign Up</h2>

          <form onSubmit={handleSubmit(handleSignUp)}>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input type="name" {...register("name", {
                   required: 'Name is Required'
                })}
                className="input input-bordered w-full max-w-xs" />
                  {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
            </div>

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" {...register("email", {
                   required: 'Email Address is required'
                })}
                className="input input-bordered w-full max-w-xs" />
                {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
            </div>

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" {...register("password",{
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be 6 characters long'},
                    pattern: {value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special character'}
                })} 
                className="input input-bordered w-full max-w-xs mb-5"/>
                {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
            </div>
              <button className='btn btn-accent w-full' type="submit"> {loading ? <Loading></ Loading>:'Sign Up'
              }  </button>
              {signUpError && <p className='text-red-600'>{signUpError}</p>}
          </form>

          <p className='my-2'><small>Allready have an account?</small> <Link className='text-secondary' to="/login">Please Login </Link></p> 
          <div className="divider my-6">OR</div>
         <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE </button>
      </div>
    </div>
  );
};

export default SignUp;