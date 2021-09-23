import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import MainLayout from '../components/MainLayout';
import LoginForm from '../components/login/LoginForm';
import PostCard from '../components/PostCard/PostCard';

const Home = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <>
      {me ? (
        <MainLayout>
          <div style={{ paddingTop: '10px' }}></div>

          {mainPosts.map((v) => {
            return <PostCard key={v.id} post={v} />;
          })}

          <div style={{ paddingBottom: '54px' }}></div>
        </MainLayout>
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default Home;
