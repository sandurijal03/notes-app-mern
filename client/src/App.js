import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import Notes from './components/Notes';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('tokenStore');
      if (token) {
        const verified = await fetch('/users/verify', {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });
        const data = await verified.json();
        console.log(data);
        // setIsLogin({});
      } else {
        setIsLogin(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <div className='App'>
      {isLogin ? (
        <Notes setIsLogin={setIsLogin} />
      ) : (
        <Login setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default App;
