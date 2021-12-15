import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

import { baseURL } from '../../config/config';

const ProfilePostImages = ({ myPosts, number, index }) => {
  return (
    <>
      {myPosts?.length > 1 ? (
        <span>
          <Image src="/icon/more.png" alt="moreIcon" />
        </span>
      ) : null}
      {<Image src={`${baseURL}${myPosts}`} alt="PostImg" />}
    </>
  );
};

ProfilePostImages.propTypes = {
  myPosts: PropTypes.string,
};

export default ProfilePostImages;
