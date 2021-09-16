import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MainLayout from '../components/MainLayout';
import LoginForm from '../components/login/LoginForm';
import PostCart from '../components/PostCard/PostCard';

const Home = () => {
  return (
    <>
      {true ? (
        <MainLayout>
          <div style={{ paddingTop: '10px' }}></div>
          <PostCart />
          <PostCart />
          <PostCart />
          <PostCart />
          <div style={{ paddingBottom: '54px' }}></div>
        </MainLayout>
      ) : (
        <LoginForm />
      )}
    </>
  );
};

Home.propTypes = {};

export default Home;
