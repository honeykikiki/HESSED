import React from 'react';
import PropTypes from 'prop-types';

import { baseURL } from '../../config/config';

const ProfilePostImages = ({ myPosts }) => {
  return (
    <>
      {myPosts?.imageCount > 1 ? (
        <span>
          <img src="/icon/more.png" alt="moreIcon" />
        </span>
      ) : null}
      {<img src={`${baseURL}${myPosts.image}`} alt="PostImg" />}
    </>
  );
};

ProfilePostImages.propTypes = {
  myPosts: PropTypes.object,
};

export default ProfilePostImages;
