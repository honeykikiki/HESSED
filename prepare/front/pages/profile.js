import React, { useCallback, useEffect, useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';

import MainLayout from '../components/MainLayout';

import style from '../styles/css/profile.module.css';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { profile } = useSelector((state) => state.menu);
  const { me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me]);

  const myPost = mainPosts.filter((v) => v.User.id === me?.id);

  const [followPage, setFollowPage] = useState(true);

  const onClickRouter = useCallback((e) => {
    e.preventDefault();
    setFollowPage((prev) => !prev);
  }, []);
  console.log(myPost);
  return (
    <MainLayout>
      <div style={{ paddingTop: '10px' }}></div>
      <section className={style.a}>
        <article className={style.maxWidth}>
          <div className={style.profileImg}>
            <div>
              <div>
                <img src="icon/profle_img.png" />
              </div>
              <p>{me?.nickname}</p>
            </div>

            <ul>
              <li>
                게시글
                <p>{myPost.length ?? 0}</p>
              </li>

              <li onClick={onClickRouter}>
                팔로워
                <p>{me?.Followers.length ?? 0}</p>
              </li>
              <li onClick={onClickRouter}>
                팔로잉
                <p>{me?.Followings.length ?? 0}</p>
              </li>
            </ul>
          </div>

          <div className={style.profileNameReSet}>프로필수정</div>

          {followPage ? (
            <div className={style.upLoadImageBox}>
              {myPost.map((v, i) => {
                // console.log(v);
                // console.log(v[i + 1]);
                if (i % 3 === 0) {
                  // i = 0 3 6 9
                  // console.log(i);

                  return (
                    <ul className={style.upLoadImage}>
                      <li>
                        <Link href={`post/${myPost[i].id}`}>
                          <a>{<img src={`${myPost[i].Images[0].url}`} />}</a>
                        </Link>
                      </li>
                      {myPost[i + 1] && (
                        <li>
                          <Link href={`post/${myPost[i + 1].id}`}>
                            <a>
                              {<img src={`${myPost[i + 1].Images[0].url}`} />}
                            </a>
                          </Link>
                        </li>
                      )}
                      {myPost[i + 2] && (
                        <li>
                          <Link href={`post/${myPost[i + 2].id}`}>
                            <a>
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
          ) : (
            <div>
              <div className={style.follow}>
                <h2>팔로워</h2>
                <ul>
                  {me?.Followers.map((v, i) => {
                    return (
                      <li>
                        <div className={style.imageBox}>
                          {<img src={v.image} />}
                        </div>
                        <p>{v.nickname}</p>
                        <div className={style.cancle}>취소</div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={style.follow}>
                <h2>팔로잉</h2>
                <ul>
                  {me?.Followings.map((v, i) => {
                    return (
                      <li>
                        <div className={style.imageBox}>
                          {<img src={v.image} />}
                        </div>
                        <p>{v.nickname}</p>
                        <div className={style.cancle}>팔로잉</div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}

          {/* <ul className={style.upLoadImage}>
            

            <li>이미지 박스</li>
            <li>이미지 박스</li>
            <li>이미지 박스</li>

            <li>이미지 박스</li>
            <li>이미지 박스</li>
            <li>이미지 박스</li>

            <li>이미지 박스</li>
            <li>이미지 박스</li>
          </ul> */}
        </article>
      </section>
      <div style={{ paddingBottom: '54px' }}></div>
    </MainLayout>
  );
};

export default Profile;
