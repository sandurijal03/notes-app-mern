import React, { useState } from 'react';

const Login = ({ setIsLogin }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setError('');
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...user }),
      });
      const data = await res.json();
      console.log(data);
      setUser({ name: '', email: '', password: '' });
      setError(data.msg);
    } catch (err) {
      console.log(err);
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...user }),
      });
      const data = await res.json();

      setUser({ email: '', password: '' });
      localStorage.setItem('tokenStore', data.token);
      setIsLogin(true);
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  const [onLogin, setOnLogin] = useState(false);
  const style = {
    visibility: onLogin ? 'visible' : 'hidden',
    opacity: onLogin ? 1 : 0,
  };

  return (
    <section>
      <div className='login'>
        <h2>Login</h2>
        <form onSubmit={loginSubmit}>
          <input
            type='email'
            name='email'
            onChange={onChangeInput}
            id='login-email'
            placeholder='email'
            required
            value={user.email}
          />

          <input
            type='password'
            name='password'
            onChange={onChangeInput}
            id='login-password'
            placeholder='password'
            required
            value={user.password}
          />

          <button type='submit'>Login</button>
          <p>
            You don't have an account
            <span onClick={() => setOnLogin(true)}> Register</span>
          </p>
        </form>
        <h3>{error}</h3>
      </div>
      <div className='register' style={style}>
        <h2>Register</h2>
        <form onSubmit={registerSubmit}>
          <input
            type='text'
            name='name'
            id='login-name'
            onChange={onChangeInput}
            placeholder='name'
            required
            value={user.name}
          />

          <input
            type='email'
            name='email'
            id='login-email'
            onChange={onChangeInput}
            placeholder='email'
            required
            value={user.email}
          />

          <input
            type='password'
            name='password'
            id='login-password'
            onChange={onChangeInput}
            placeholder='password'
            required
            value={user.password}
          />

          <button type='submit'>Register</button>

          <p>
            Have an account?
            <span onClick={() => setOnLogin(false)}> Login Now</span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
