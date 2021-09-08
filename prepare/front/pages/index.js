import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MainLayout from '../components/MainLayout';
import '../styles/scss/mainPage.module.scss';
import LoginForm from '../components/login/LoginForm';
import PostCart from '../components/mainContent/PostCard';

const Home = () => {
  return (
    <>
      {true ? (
        <MainLayout>
          <PostCart />
        </MainLayout>
      ) : (
        <LoginForm />
      )}
    </>
  );
};

Home.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default Home;
