import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import style from '../../styles/css/postImage.module.css';

const PostImages = ({ images }) => {
  const [imageCuurrentNo, setImageCuurrentNo] = useState(0);

  const onClickLeft = useCallback(() => {
    if (imageCuurrentNo > 0) {
      setImageCuurrentNo((prev) => prev - 1);
    }
  }, [imageCuurrentNo]);
  const onClickRight = useCallback(() => {
    if (imageCuurrentNo < images.length - 1) {
      setImageCuurrentNo((prev) => prev + 1);
    }
  }, [imageCuurrentNo]);

  return (
    <>
      <div className={style.imageBox}>
        {imageCuurrentNo >= 1 && (
          <div className={style.left} onClick={onClickLeft}>
            <img src="/icon/left.png" />
          </div>
        )}

        {imageCuurrentNo < images.length - 1 && (
          <div className={style.right} onClick={onClickRight}>
            <img src="/icon/right.png" />
          </div>
        )}
        {images.map((v, i) => {
          return (
            <img
              key={v?.bo_img_no}
              src={`http://211.244.21.147:8081/${v?.bo_img_location}`}
              style={{
                transform: `translate3d(-${imageCuurrentNo * 100}%, 0px, 0px)`,
                transition: 'all .4s',
              }}
            />
          );
        })}
        <span>{`${imageCuurrentNo + 1} / ${images.length}`}</span>
      </div>
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostImages;
