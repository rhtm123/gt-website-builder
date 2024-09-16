
import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { useSession, signIn } from "next-auth/react";

import Loading from './Loading';

const LoginRequired = ({ children }) => {

  const { data: session } = useSession()

  // Replace this with your actual authentication check
  const isAuthenticated = () => {
    return session !== null;
  };


  React.useEffect(() => {
    if (!isAuthenticated()) {
      signIn();
    }
  }, [session]);

  return isAuthenticated() ? (
    <>
      {children}
    </>
  ) :
  <div className='flex justify-center items-center h-screen'>
  <Loading />
  </div> 
  ;
};

export default LoginRequired;
