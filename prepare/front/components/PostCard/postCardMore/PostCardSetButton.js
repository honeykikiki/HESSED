import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import style from '../../../styles/css/postCard.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_POST_REQUEST } from '../../../reducers/post';

const PostCardSetButton = ({ post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const [optionButton, setOptionButton] = useState(true);

  const onClickOptionOpen = useCallback(() => {
    if (optionButton) {
      setOptionButton(false);
      return;
    }
  }, [optionButton]);
  const onClickOptionClose = useCallback(() => {
    if (!optionButton) {
      setOptionButton(true);
      return;
    }
  }, [optionButton]);

  const onClickPostCardRemove = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: { postId: post.id },
    });
  }, []);

  return (
    <>
      <div className={style.menu} onClick={onClickOptionOpen}>
        <img src="/icon/btn.svg" />

        {optionButton ? null : me.id === post.User.id ? (
          // post.User.id == me.id
          <div
            className={style.optionButton}
            style={{ border: '1px solid black' }}
          >
            <div onClick={onClickPostCardRemove}>
              <p>삭제</p>
            </div>
            <div onClick={onClickOptionClose}>
              <p>취소</p>
            </div>
          </div>
        ) : (
          <div
            className={style.optionButton}
            style={{ border: '1px solid black' }}
          >
            <div style={{ color: 'red' }}>
              <p>신고</p>
            </div>
            <div onClick={onClickOptionClose}>
              <p>취소</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

PostCardSetButton.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCardSetButton;
