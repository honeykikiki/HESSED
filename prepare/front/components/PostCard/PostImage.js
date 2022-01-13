/* eslint-disable no-const-assign */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import SwiperCore, { Pagination } from 'swiper';

import style from '../../styles/css/postImage.module.css';
import { baseURL } from '../../config/config';

SwiperCore.use([Pagination]);

const PostImages = ({ images }) => {
  return (
    <>
      <Swiper pagination className={style.imageBox}>
        {images.map((v) =>
          useMemo(
            () => (
              <SwiperSlide
                className={style.imageInnerBox}
                key={v?.bo_img_location}
              >
                <img src={`${baseURL}/${v.bo_img_location}`} alt="PostImg" />
              </SwiperSlide>
            ),
            [images],
          ),
        )}
      </Swiper>
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;
