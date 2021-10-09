import React from 'react';
import Link from 'next/link';

import style from '../../styles/css/profile.module.css';

const ProfilePost = ({ myPost }) => {
  console.log(myPost);
  return (
    <>
      <div className={style.upLoadImageBox}>
        {myPost.map((v, i) => {
          // console.log(v);
          // console.log(v[i + 1]);
          if (i % 3 === 0) {
            // i = 0 3 6 9
            // console.log(i);
            return (
              <ul className={style.upLoadImage} key={v.id}>
                <li>
                  <Link href={`post/${myPost[i].id}`}>
                    <a>{<img src={`${myPost[i].Images[0].url}`} />}</a>
                  </Link>
                </li>
                {myPost[i + 1] && (
                  <li>
                    <Link href={`post/${myPost[i + 1].id}`}>
                      <a>{<img src={`${myPost[i + 1].Images[0].url}`} />}</a>
                    </Link>
                  </li>
                )}
                {myPost[i + 2] && (
                  <li>
                    <Link href={`post/${myPost[i + 2].id}`}>
                      <a>{<img src={`${myPost[i + 2].Images[0].url}`} />}</a>
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
