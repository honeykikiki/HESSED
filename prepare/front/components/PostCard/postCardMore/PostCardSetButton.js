import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import style from '../../../styles/css/postCard.module.css';

import { REMOVE_POST_REQUEST } from '../../../reducers/postAdd';

const PostCardSetButton = ({ post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.userInfo);
  const [optionButton, setOptionButton] = useState(true);

  useEffect(() => {
    if (!optionButton) {
      document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      };
    }
  }, [optionButton]);

  const onClickOptionOpen = useCallback(() => {
    if (optionButton) {
      setOptionButton(false);
    }
  }, [optionButton]);
  const onClickOptionClose = useCallback(() => {
    if (!optionButton) {
      setOptionButton(true);
    }
  }, [optionButton]);

  const onClickPostCardRemove = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: { postId: post.id },
      // data: { bo_no: post.bo_no },
    });
  }, []);

  const onClickPostUpdate = useCallback(() => {
    Router.push(`/updatePost/${post.id}`);
  }, [post]);

  return (
    <>
      <div className={style.menu} onClick={onClickOptionOpen}>
        <Image src="/icon/btn.svg" alt="btnIcon" />

        {optionButton ? null : me.id === post.User.id ? (
          // post.User.id == me.id
          <div className={style.buttonWrap} onClick={onClickOptionClose}>
            <div
              className={style.optionButton}
              style={{ border: '1px solid black' }}
            >
              <div onClick={onClickPostCardRemove}>
                <p>삭제</p>
              </div>
              <div onClick={onClickPostUpdate}>
                <p>수정</p>
              </div>
              <div onClick={onClickOptionClose}>
                <p>취소</p>
              </div>
            </div>
          </div>
        ) : (
          <div className={style.buttonWrap} onClick={onClickOptionClose}>
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
