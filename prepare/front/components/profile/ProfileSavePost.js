import React, { useEffect } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import style from '../../styles/css/profile.module.css';
import ProfilePostImages from './ProfilePostImage';

import {
  USER_SAVE_POST_MORE_GET_REQUEST,
  MY_SAVE_POST_MORE_GET_REQUEST,
} from '../../reducers/userPost';

const ProfileSavePost = ({ myPosts, bool, userId }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.userInfo);
  const {
    mySavePostMoreGetLoading,
    mySavePostPageNumber,
    mySavePostMoreGetFailed,
    userSavePostMoreGetLoading,
    userSavePostPageNumber,
    userSavePostMoreGetFailed,
  } = useSelector((state) => state.userPost);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }

    if (
      inView &&
      !mySavePostMoreGetLoading &&
      mySavePostMoreGetFailed &&
      bool
    ) {
      const formData = new FormData();
      formData.append('page', mySavePostPageNumber);
      formData.append('mem_id', me?.id);
      dispatch({
        type: MY_SAVE_POST_MORE_GET_REQUEST,
        data: formData,
      });
    }

    if (
      inView &&
      !userSavePostMoreGetLoading &&
      userSavePostMoreGetFailed &&
      !bool
    ) {
      const formData = new FormData();
      formData.append('page', userSavePostPageNumber);
      formData.append('mem_id', userId);
      dispatch({
        type: USER_SAVE_POST_MORE_GET_REQUEST,
        data: formData,
      });
    }
  }, [
    inView,
    mySavePostMoreGetLoading,
    mySavePostPageNumber,
    mySavePostMoreGetFailed,
    me,
    bool,
    userSavePostMoreGetLoading,
    userSavePostPageNumber,
    userSavePostMoreGetFailed,
    userId,
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
          ref={
            !mySavePostMoreGetLoading && mySavePostMoreGetFailed
              ? ref
              : undefined
          }
        />
        <div
          ref={
            !userSavePostMoreGetLoading && userSavePostMoreGetFailed
              ? ref
              : undefined
          }
        />
      </div>
    </>
  );
};

// ProfilePost.propTypes =j {
//   myPosts: PropTypes.arrayOf,
// };

export default ProfileSavePost;
