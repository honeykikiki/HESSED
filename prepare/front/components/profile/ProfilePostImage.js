import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

import { baseURL } from '../../config/config';

const ProfilePostImages = ({ myPosts }) => {
  return (
    <>
      {myPosts?.length > 1 ? (
        <span>
          <img src="/icon/more.png" alt="moreIcon" />
        </span>
      ) : null}
      {<img src={`${baseURL}${myPosts}`} alt="PostImg" />}
    </>
  );
};

ProfilePostImages.propTypes = {
  myPosts: PropTypes.object,
};

export default ProfilePostImages;
