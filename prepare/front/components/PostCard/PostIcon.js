import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import style from '../../styles/css/postIcon.module.css';

const PostIcon = ({ post }) => {
  return (
    <article className={style.postIcon}>
      <div>
        {false ? (
          <img src="/icon/heartOn.svg" />
        ) : (
          <img src="/icon/heartOff.svg" />
        )}
      </div>
      <div>
        <Link href={`/${post.id}/comment`}>
          <a>
            <div>{<img src="/icon/comment.svg" />}</div>
          </a>
        </Link>
      </div>
      <div>
        <img src="/icon/share.svg" />
      </div>
      <div>
        {false ? (
          <img src="/icon/saveOn.svg" />
        ) : (
          <img src="/icon/saveOff.svg" />
        )}
      </div>
    </article>
  );
};

PostIcon.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostIcon;
