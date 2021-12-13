import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import style from '../../styles/css/postImage.module.css';
import { baseURL } from '../../config/config';

const PostImages = ({ images }) => {
  const [imageCuurrentNo, setImageCuurrentNo] = useState(0);
  const [position, setPosition] = useState('');

  // let startCoord;

  // useEffect(() => {
  //   window.addEventListener('mousedown', (event) => {
  //     startCoord = [event.clientX, event.clientY];
  //   });
  //   window.addEventListener('mouseup', (event) => {
  //     const endCoord = [event.clientX, event.clientY];
  //     const diffX = endCoord[0] - startCoord[0];
  //     const diffY = endCoord[1] - startCoord[1];
  //     console.log()
  //     if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) {
  //       setPosition('left');
  //     } else if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
  //       setPosition('right');
  //     } else if (diffY > 0 && Math.abs(diffX) <= Math.abs(diffY)) {
  //       setPosition('down');
  //     } else if (diffY < 0 && Math.abs(diffX) <= Math.abs(diffY)) {
  //       setPosition('up');
  //     }
  //   });
  // }, []);

  // console.log(position);
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
            <img
              key={v?.bo_img_location}
              src={`${baseURL}/${v.bo_img_location}`}
              style={{
                transform: `translate3d(-${imageCuurrentNo * 100}%, 0px, 0px)`,
                transition: 'all .4s',
              }}
              alt="PostImg"
            />
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
