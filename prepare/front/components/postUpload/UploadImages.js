import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import style from '../../styles/css/upload.module.css';

const UploadImages = ({ photoToAddList, imageInput, setPhotoToAddList }) => {
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onRemove = useCallback(
    (deleteUrl) => {
      setPhotoToAddList(photoToAddList.filter((v) => v.url !== deleteUrl));
    },
    [photoToAddList],
  );
  return (
    <>
      {photoToAddList
        ? photoToAddList.map((v) => {
            return (
              <li key={v.url}>
                <div className={style.remove} onClick={() => onRemove(v.url)}>
                  x
                </div>
                <img
                  src={v.url}
                  style={{
                    backgroundImage: `url(${v.url})`,
                  }}
                  alt="uploadImg"
                />
              </li>
            );
          })
        : null}
      <li onClick={onClickImageUpload}>
        <div className={style.imageInput}>
          <img
            src="/icon/addphoto.svg"
            className={style.addImg}
            alt="addPhotoIcon"
          />
        </div>
      </li>
    </>
  );
};

UploadImages.propTypes = {
  photoToAddList: PropTypes.shape({
    id: PropTypes.string,
    file: PropTypes.object,
    url: PropTypes.string,
  }),
  imageInput: PropTypes.object,
};

// PostCard.propTypes = {
//   post: PropTypes.shape({
//     id: PropTypes.number,
//     user: PropTypes.object,
//     content: PropTypes.string,
//     data: PropTypes.string,
//     comments: PropTypes.arrayOf(PropTypes.object),
//     Images: PropTypes.arrayOf(PropTypes.object),
//     Likers: PropTypes.arrayOf(PropTypes.object),
//   }).isRequired,
// };
export default UploadImages;
