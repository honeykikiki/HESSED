import React from 'react';
import PropTypes from 'prop-types';

import { baseURL } from '../../config/config';

const ProfilePostImages = ({ myPost, number, index }) => {
  return (
    <>
      {myPost[index].Images.length > 1 ? (
        <span>
          <img src="/icon/more.png" alt="moreIcon" />
        </span>
      ) : null}
      {
        <img
          src={`${baseURL}/${myPost[index + number].Images[0].bo_img_location}`}
          alt="PostImg"
        />
      }
    </>
  );
};

ProfilePostImages.propTypes = {
  mypost: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.object,
    content: PropTypes.string,
    data: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  number: PropTypes.number,
  index: PropTypes.number,
};

export default ProfilePostImages;
