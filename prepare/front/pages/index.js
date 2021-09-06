import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import useinput from '../hooks/useinput';

import MainLayout from '../components/MainLayout';
import '../styles/scss/mainPage.module.scss';
import LoginForm from '../components/login/LoginForm';
import Loading from '../pages/loading';

const Home = () => {
  return <>{false ? <MainLayout></MainLayout> : <LoginForm />}</>;
};

Home.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default Home;
