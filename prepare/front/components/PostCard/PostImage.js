import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import style from '../../styles/css/postImage.module.css';
import { baseURL } from '../../config/config';

const PostImages = ({ images }) => {
  const [imageCuurrentNo, setImageCuurrentNo] = useState(0);
  const [position, setPosition] = useState('');

  const onClickLeft = useCallback(() => {
    if (imageCuurrentNo > 0) {
      setImageCuurrentNo((prev) => prev - 1);
    }
    if (position === 'right') {
      setImageCuurrentNo((prev) => prev - 1);
    }
  }, [imageCuurrentNo, position]);

  const onClickRight = useCallback(() => {
    if (imageCuurrentNo < images.length - 1) {
      setImageCuurrentNo((prev) => prev + 1);
    }
    if (position === 'left') {
      setImageCuurrentNo((prev) => prev - 1);
    }
  }, [imageCuurrentNo, position]);

  return (
    <>
      <div className={style.imageBox}>
        {imageCuurrentNo >= 1 && (
          <div className={style.left} onClick={onClickLeft}>
            <img src="/icon/left.png" alt="LeftIcon" />
          </div>
        )}

        {imageCuurrentNo < images.length - 1 && (
          <div className={style.right} onClick={onClickRight}>
            <img src="/icon/right.png" alt="RightIcon" />
          </div>
        )}
        {images.map((v, i) => {
          return (
            <div className={style.imageInnerBox} key={v?.bo_img_location}>
              <img
                src={`${baseURL}/${v.bo_img_location}`}
                style={{
                  transform: `translate3d(-${
                    imageCuurrentNo * 100
                  }%, -50%, 0px)`,
                  transition: 'all .4s',
                }}
                alt="PostImg"
              />
            </div>
          );
        })}
        {images.length === 1 ? null : (
          <span>{`${imageCuurrentNo + 1} / ${images.length}`}</span>
        )}
      </div>
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostImages;
