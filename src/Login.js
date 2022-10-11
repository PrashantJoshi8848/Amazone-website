import React, { useState } from 'react'
import './login.css'
import {Link} from 'react-router-dom'
function Login() {
    const[email,setemail]=useState('');
    const [password,setpassword]=('');

    const signIn=e=>{
        e.preventDefault();
        // firebase signin
    }

    const register = e=>{
        e.preventDefault();

        //firebase register
        

    }
  return (
    <div className='login'>
    <Link to='/'>
        <img 
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
            className='login__logo'
            alt='amz_logo'
        />
        </Link>
        <div className='login__container'>
            <h1>Sign-In</h1>

            <form>
                <h5>E-mail</h5>
                <input type='text' 
                value={email} 
                onChange={(e)=>{setemail(e.target.value)}}/>

                <h5>Password</h5>
                <input type='Password'
                value={password}
                onChange={(e)=>{setpassword(e.target.value)}}
                />
                <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
                <p>
                By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
                </p>
                <button onClick='register' className='login__registerButton'>Create your Amazone Account </button>
            </form>
        </div>
    </div>
  )
}

export default Login