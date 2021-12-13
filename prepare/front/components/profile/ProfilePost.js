import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

import PropTypes from 'prop-types';

import style from '../../styles/css/profile.module.css';
import ProfilePostImages from './ProfilePostImage';
import Router from 'next/router';

import { useDispatch, useSelector } from 'react-redux';
import {
  MY_POST_MORE_GET_REQUEST,
  USER_POST_MORE_GET_REQUEST,
} from '../../reducers/userPost';

const ProfilePost = ({ myPosts, bool }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.userInfo);
  const {
    myPostMoreGetLoading,
    myPostPageNumber,
    myPostMoreGetFailed,
    userPostMoreGetLoading,
    userPostMoreGetFailed,
  } = useSelector((state) => state.userPost);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }

    if (inView && !myPostMoreGetLoading && myPostMoreGetFailed && bool) {
      const formData = new FormData();
      formData.append('page', myPostPageNumber);
      formData.append('mem_id', me?.id);
      dispatch({
        type: MY_POST_MORE_GET_REQUEST,
        data: formData,
      });
    }

    if (inView && !userPostMoreGetLoading && userPostMoreGetFailed && !bool) {
      const formData = new FormData();
      formData.append('page', myPostPageNumber);
      // formData.append('mem_id', me?.id);
      dispatch({
        type: USER_POST_MORE_GET_REQUEST,
        data: formData,
      });
    }
  }, [
    inView,
    myPostMoreGetLoading,
    myPostMoreGetFailed,
    myPostPageNumber,
    me,
    bool,
    userPostMoreGetLoading,
    userPostMoreGetFailed,
  ]);

  return (
    <>
      <div className={style.upLoadImageBox}>
        {myPosts.map((v, i) => {
          if (i % 3 === 0) {
            // i = 0 3 6 9
            return (
              <ul className={style.upLoadImage} key={v.id}>
                <li>
                  <Link href={`post/${myPosts[i].id}`}>
                    {/* <Link href={`user/post`}> */}
                    <a>
                      <ProfilePostImages myPosts={myPosts[i].Images} />
                    </a>
                  </Link>
                </li>
                {myPosts[i + 1] && (
                  <li>
                    <Link href={`post/${myPosts[i + 1].id}`}>
                      {/* <Link href={`user/post`}> */}
                      <a>
                        <ProfilePostImages myPosts={myPosts[i + 1].Images} />
                      </a>
                    </Link>
                  </li>
                )}
                {myPosts[i + 2] && (
                  <li>
                    <Link href={`post/${myPosts[i + 2].id}`}>
                      {/* <Link href={`user/post`}> */}
                      <a>
                        <ProfilePostImages myPosts={myPosts[i + 2].Images} />
                      </a>
                    </Link>
                  </li>
                )}
              </ul>
            );
          }
        })}

        <div
          ref={!myPostMoreGetLoading && myPostMoreGetFailed ? ref : undefined}
        />
      </div>
    </>
  );
};

// ProfilePost.propTypes =j {
//   myPosts: PropTypes.arrayOf,
// };

export default ProfilePost;
