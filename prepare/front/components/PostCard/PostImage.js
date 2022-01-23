import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';

import { useDispatch, useSelector } from 'react-redux';

import SwiperCore, { Pagination } from 'swiper';

import style from '../../styles/css/postImage.module.css';
import { baseURL } from '../../config/config';
import { LIKE_POST_REQUEST } from '../../reducers/postMainAction';

SwiperCore.use([Pagination]);

const PostImages = ({ post, images }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.userInfo);

  const doubleClickGoodRequest = useCallback(() => {
    if (post.liked[0]?.mem_id || post.liked?.mem_id === me?.id) {
      return;
    }
    dispatch({
      type: LIKE_POST_REQUEST,
      data: {
        bo_no: post.id,
        mem_id: me?.id,
      },
    });
  }, [post, me]);

  return (
    <>
      <Swiper
        pagination
        className={style.imageBox}
        onDoubleClick={doubleClickGoodRequest}
      >
        {images.map((v) => (
          <SwiperSlide className={style.imageInnerBox} key={v?.bo_img_location}>
            <div className={style.Swiper_ImageBox}>
              <img src={`${baseURL}/${v.bo_img_location}`} alt="PostImg" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;
