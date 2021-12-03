import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import style from '../../styles/css/profile.module.css';
import { baseUrl } from '../../config/config';
import ProfilePostImages from './ProfilePostImage';

const ProfilePost = ({ myPosts }) => {
  return (
    <>
      <div className={style.upLoadImageBox}>
        {myPosts.map((v, i) => {
          if (i % 3 === 0) {
            // i = 0 3 6 9
            return (
              <ul className={style.upLoadImage} key={v.id}>
                <li>
                  <Link href={`post/${myPosts[i].id}`}>
                    {/* <Link href={`user/post`}> */}
                    <a>
                      <ProfilePostImages myPosts={myPosts[i].Images} />
                    </a>
                  </Link>
                </li>
                {myPosts[i + 1] && (
                  <li>
                    <Link href={`post/${myPosts[i + 1].id}`}>
                      {/* <Link href={`user/post`}> */}
                      <a>
                        <ProfilePostImages myPosts={myPosts[i + 1].Images} />
                      </a>
                    </Link>
                  </li>
                )}
                {myPosts[i + 2] && (
                  <li>
                    <Link href={`post/${myPosts[i + 2].id}`}>
                      {/* <Link href={`user/post`}> */}
                      <a>
                        <ProfilePostImages myPosts={myPosts[i + 2].Images} />
                      </a>
                    </Link>
                  </li>
                )}
              </ul>
            );
          }
        })}
      </div>
    </>
  );
};

// ProfilePost.propTypes = {
//   myPosts: PropTypes.arrayOf,
// };

export default ProfilePost;
