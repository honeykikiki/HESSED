import React from 'react';
import Link from 'next/link';

import style from '../../styles/css/profile.module.css';

const ProfilePost = ({ myPost }) => {
  return (
    <>
      <div className={style.upLoadImageBox}>
        {myPost.map((v, i) => {
          // console.log(v);
          // console.log(v[i + 1]);
          if (i % 3 === 0) {
            // i = 0 3 6 9
            return (
              <ul className={style.upLoadImage} key={v.id}>
                <li>
                  <Link href={`post/${myPost[i].id}`}>
                    <a>
                      {myPost[i].Images.length > 1 ? (
                        <span>
                          <img src="/icon/more.png" />
                        </span>
                      ) : null}
                      {<img src={`${myPost[i].Images[0].url}`} />}
                    </a>
                  </Link>
                </li>
                {myPost[i + 1] && (
                  <li>
                    <Link href={`post/${myPost[i + 1].id}`}>
                      <a>
                        {myPost[i + 1].Images.length > 1 ? (
                          <span>
                            <img src="/icon/more.png" />
                          </span>
                        ) : null}
                        {<img src={`${myPost[i + 1].Images[0].url}`} />}
                      </a>
                    </Link>
                  </li>
                )}
                {myPost[i + 2] && (
                  <li>
                    <Link href={`post/${myPost[i + 2].id}`}>
                      <a>
                        {myPost[i + 2].Images.length > 1 ? (
                          <span>
                            <img src="/icon/more.png" />
                          </span>
                        ) : null}
                        {<img src={`${myPost[i + 2].Images[0].url}`} />}
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

export default ProfilePost;
