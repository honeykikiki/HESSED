import React from 'react';
import PropTypes from 'prop-types';

import { baseURL } from '../../config/config';

const ProfilePostImages = ({ myPost, number, index }) => {
  return (
    <>
      {myPost.length > 1 ? (
        <span>
          <img src="/icon/more.png" alt="moreIcon" />
        </span>
      ) : null}
      {<img src={`${baseURL}/${myPost[0].bo_img_location}`} alt="PostImg" />}
    </>
  );
};

ProfilePostImages.propTypes = {
  mypost: PropTypes.arrayOf(PropTypes.object),
};

export default ProfilePostImages;
