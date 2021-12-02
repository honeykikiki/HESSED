import React from 'react';
import PropTypes from 'prop-types';
import PostCard from '../../components/PostCard/PostCard';
import { useDispatch, useSelector } from 'react-redux';

const UersPosts = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  return (
    <>
      {
        // 반복문 만들기 유저의 게시물 가져와서
        <PostCard />
      }
    </>
  );
};

export default UersPosts;
