import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import style from '../../styles/css/profile.module.css';
import { baseUrl } from '../../config/config';
import ProfilePostImages from './ProfilePostImage';

const ProfilePost = ({ myPost }) => {
  return (
    <>
      <div className={style.upLoadImageBox}>
        {myPost.map((v, i) => {
          if (i % 3 === 0) {
            // i = 0 3 6 9
            return (
              <ul className={style.upLoadImage} key={v.id}>
                <li>
                  <Link href={`post/${myPost[i].id}`}>
                    <a>
                      <ProfilePostImages myPost={myPost} index={i} number={0} />
                      {/* {myPost[i].Images.length > 1 ? (
                        <span>
                          <img src="/icon/more.png" />
                        </span>
                      ) : null}
                      {
                        <img
                          src={`${baseUrl}/${myPost[i].Images[0].bo_img_location}`}
                        />
                      } */}
                    </a>
                  </Link>
                </li>
                {myPost[i + 1] && (
                  <li>
                    <Link href={`post/${myPost[i + 1].id}`}>
                      <a>
                        <ProfilePostImages
                          myPost={myPost}
                          index={i}
                          number={1}
                        />
                        {/* {myPost[i + 1].Images.length > 1 ? (
                          <span>
                            <img src="/icon/more.png" />
                          </span>
                        ) : null}
                        {
                          <img
                            src={`${baseUrl}/${
                              myPost[i + 1].Images[0].bo_img_location
                            }`}
                          />
                        } */}
                      </a>
                    </Link>
                  </li>
                )}
                {myPost[i + 2] && (
                  <li>
                    <Link href={`post/${myPost[i + 2].id}`}>
                      <a>
                        <ProfilePostImages
                          myPost={myPost}
                          index={i}
                          number={2}
                        />
                        {/* {myPost[i + 2].Images.length > 1 ? (
                          <span>
                            <img src="/icon/more.png" />
                          </span>
                        ) : null}
                        {
                          <img
                            src={`${baseUrl}/${
                              myPost[i + 2].Images[0].bo_img_location
                            }`}
                          />
                        } */}
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

ProfilePost.propTypes = {
  mypost: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.object,
    content: PropTypes.string,
    data: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default ProfilePost;
