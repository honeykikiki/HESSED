import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { USER_POST_AND_SAVE_POST_GET_REQUEST } from '../../reducers/userPost';

const PostHeader = ({ post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.userInfo);

  const getUserPost = useCallback(() => {
    dispatch({
      type: USER_POST_AND_SAVE_POST_GET_REQUEST,
      data: { mem_id: post.User.id },
    });
  }, [post]);
  return (
    <>
      {me?.id === post.User.id ? (
        <header>
          <div>
            <Link href={`profile`}>
              <a>
                {post.User.profileImg ? (
                  <img
                    src={`${baseURL}/${post.User.profileImg}`}
                    alt="profileImg"
                  />
                ) : (
                  <img src="/icon/profileBasic.svg" alt="profileImg" />
                )}
              </a>
            </Link>
          </div>
          <div>
            <Link href={`profile`}>
              <a>{`${post.User.nickname}`}</a>
            </Link>
          </div>
        </header>
      ) : (
        <header onClick={getUserPost}>
          <div>
            <Link href={`/user/${post.User.id}`}>
              <a>
                {post.User.profileImg ? (
                  <img
                    src={`${baseURL}/${post.User.profileImg}`}
                    alt="profileImg"
                  />
                ) : (
                  <img src="/icon/profileBasic.svg" alt="profileImg" />
                )}
              </a>
            </Link>
          </div>
          <div>
            <Link href={`/user/${post.User.id}`}>
              <a>{`${post.User.nickname}`}</a>
            </Link>
          </div>
        </header>
      )}
    </>
  );
};

PostHeader.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.object,
    content: PropTypes.string,
    data: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
export default PostHeader;
