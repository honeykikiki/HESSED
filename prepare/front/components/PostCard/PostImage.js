/* eslint-disable no-const-assign */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';

import SwiperCore, { Pagination } from 'swiper';

import style from '../../styles/css/postImage.module.css';
import { baseURL } from '../../config/config';

SwiperCore.use([Pagination]);

const PostImages = ({ images }) => {
  return (
    <>
      <Swiper pagination={true} className={style.imageBox}>
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
