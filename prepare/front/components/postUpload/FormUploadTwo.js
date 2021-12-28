/* eslint-disable no-const-assign */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import style from '../../styles/css/postImage.module.css';

let startX;
let endX;

const FormUploadTwo = ({ images, setPhotoToAddList }) => {
  const [imageCuurrentNo, setImageCuurrentNo] = useState(0);
  const [curPos, setCurPos] = useState(0);

  const onClickLeft = useCallback(() => {
    if (imageCuurrentNo > 0) {
      setImageCuurrentNo((prev) => prev - 1);
    }
  }, [imageCuurrentNo, images]);

  const onClickRight = useCallback(() => {
    if (imageCuurrentNo < images.length - 1) {
      setImageCuurrentNo((prev) => prev + 1);
    }
  }, [imageCuurrentNo, images]);

  const Prev = useCallback(() => {
    if (curPos > 0) {
      if (imageCuurrentNo >= 0) {
        setImageCuurrentNo((prev) => prev - 1);
        setCurPos((prev) => prev - 1);
      }
    }
  }, [imageCuurrentNo, curPos, images]);

  const Next = useCallback(() => {
    if (curPos < 10) {
      if (imageCuurrentNo < images.length - 1) {
        setImageCuurrentNo((prev) => prev + 1);
        setCurPos((prev) => prev + 1);
      }
    }
  }, [imageCuurrentNo, curPos, images]);

  const touchStart = useCallback((event) => {
    startX = event.touches[0].pageX;
  }, []);

  const touchEnd = useCallback(
    (event) => {
      endX = event.changedTouches[0].pageX;
      if (
        startX === endX ||
        Math.abs(startX - endX) < 30 ||
        Math.abs(endX - startX) < 30
      ) {
        return;
      }
      if (startX > endX) {
        Next();
      } else {
        Prev();
      }
    },
    [imageCuurrentNo, curPos, images],
  );

  const onRemove = useCallback(
    (deleteUrl) => {
      setPhotoToAddList(images.filter((v) => v.url !== deleteUrl));
    },
    [images],
  );

  return (
    <>
      <div
        className={style.imageBox}
        onTouchStart={touchStart}
        onTouchEnd={touchEnd}
      >
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

        {images.map((v) => (
          <div className={style.imageInnerBox} key={v.url}>
            <div className={style.remove} onClick={() => onRemove(v.url)}>
              x
            </div>
            <img
              src={`${v.url}`}
              style={{
                transform: `translate3d(-${imageCuurrentNo * 100}%, -50%, 0px)`,
                transition: 'all .4s',
              }}
              alt="PostImg"
            />
          </div>
        ))}
        {images.length < 1 ? null : (
          <span>{`${imageCuurrentNo + 1} / ${images.length}`}</span>
        )}
      </div>
    </>
  );
};

FormUploadTwo.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default FormUploadTwo;
