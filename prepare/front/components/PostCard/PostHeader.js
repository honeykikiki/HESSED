import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const PostHeader = ({ post }) => {
  const { me } = useSelector((state) => state.userInfo);

  return (
    <>
      {me.id === post.User.id ? (
        <div>
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
        </div>
      ) : (
        <div>
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
        </div>
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
