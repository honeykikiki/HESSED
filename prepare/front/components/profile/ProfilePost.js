import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

import PropTypes from 'prop-types';

import style from '../../styles/css/profile.module.css';
import ProfilePostImages from './ProfilePostImage';
import Router from 'next/router';

import { useDispatch, useSelector } from 'react-redux';
import { MY_POST_MORE_GET_REQUEST } from '../../reducers/userPost';
import { MY_SAVE_POST_MORE_GET_REQUEST } from '../../reducers/userPost';

const ProfilePost = ({ myPosts, postToSave }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.userInfo);
  const {
    myPostMoreGetLoading,
    myPostPageNumber,
    myPostMoreGetFailed,
    mySavePostMoreGetLoading,
    mySavePostPageNumber,
    mySavePostMoreGetFailed,
  } = useSelector((state) => state.userPost);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }

    if (inView && !myPostMoreGetLoading && myPostMoreGetFailed) {
      const formData = new FormData();
      formData.append('page', myPostPageNumber);
      formData.append('mem_id', me?.id);
      dispatch({
        type: MY_POST_MORE_GET_REQUEST,
        data: formData,
      });
    }

    if (inView && !mySavePostMoreGetLoading && mySavePostMoreGetFailed) {
      const formData = new FormData();
      formData.append('page', mySavePostPageNumber);
      formData.append('mem_id', me?.id);
      dispatch({
        type: MY_SAVE_POST_MORE_GET_REQUEST,
        data: formData,
      });
    }
  }, [
    inView,
    myPostMoreGetLoading,
    myPostMoreGetFailed,
    myPostPageNumber,
    mySavePostMoreGetLoading,
    mySavePostMoreGetFailed,
    me,
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
        {postToSave ? (
          <div
            ref={
              postToSave && !myPostMoreGetLoading && myPostMoreGetFailed
                ? ref
                : undefined
            }
          />
        ) : (
          <div
            ref={
              !postToSave &&
              !mySavePostMoreGetLoading &&
              mySavePostMoreGetFailed
                ? ref
                : undefined
            }
          />
        )}
      </div>
    </>
  );
};

// ProfilePost.propTypes = {
//   myPosts: PropTypes.arrayOf,
// };

export default ProfilePost;
