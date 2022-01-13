/* eslint-disable no-const-assign */

import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import SwiperCore, { Pagination } from 'swiper';

import style from '../../styles/css/postImage.module.css';

SwiperCore.use([Pagination]);

const FormUploadTwo = ({ images, setPhotoToAddList }) => {
  const [imageCurrentNo, setImageCurrentNo] = useState(0);

  const onRemove = useCallback(
    (deleteUrl) => {
      setPhotoToAddList(images.filter((v) => v.url !== deleteUrl));
      if (imageCurrentNo === 0) {
        return;
      }

      if (imageCurrentNo + 1 === images.length) {
        setImageCurrentNo((prev) => prev - 1);
      }
    },
    [images, imageCurrentNo],
  );

  return (
    <>
      <Swiper pagination className={style.imageBox}>
        {images.map((v) => (
          <SwiperSlide className={style.imageInnerBox} key={v.url}>
            <div>
              <p className={style.remove} onClick={() => onRemove(v.url)}>
                x
              </p>
            </div>
            <img src={v.url} alt="PostImg" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

FormUploadTwo.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default FormUploadTwo;
