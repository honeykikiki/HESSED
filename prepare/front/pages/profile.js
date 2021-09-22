import React, { useCallback, useState } from 'react';
import faker from 'faker';
import Router from 'next/router';

import MainLayout from '../components/MainLayout';

import style from '../styles/css/profile.module.css';

const a = Array(10)
  .fill(faker.image.image())
  .map((v, i) => v + (i + 1));

const b = [
  {
    nickname: faker.name.firstName(),
    image: faker.image.image(),
  },
  {
    nickname: faker.name.firstName(),
    image: faker.image.image(),
  },
  {
    nickname: faker.name.firstName(),
    image: faker.image.image(),
  },
  {
    nickname: faker.name.firstName(),
    image: faker.image.image(),
  },
  {
    nickname: faker.name.firstName(),
    image: faker.image.image(),
  },
  {
    nickname: faker.name.firstName(),
    image: faker.image.image(),
  },
  {
    nickname: faker.name.firstName(),
    image: faker.image.image(),
  },
  {
    nickname: faker.name.firstName(),
    image: faker.image.image(),
  },
  {
    nickname: faker.name.firstName(),
    image: faker.image.image(),
  },
  {
    nickname: faker.name.firstName(),
    image: faker.image.image(),
  },
  {
    nickname: faker.name.firstName(),
    image: faker.image.image(),
  },
];

console.log(b[0].nickname);

const Profile = () => {
  const [followPage, setFollowPage] = useState(true);

  const onClickRouter = useCallback((e) => {
    e.preventDefault();
    setFollowPage((prev) => !prev);
  }, []);

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
              <p>{faker.name.findName()}</p>
            </div>

            <ul>
              <li>
                게시글
                <p>0</p>
              </li>

              <li onClick={onClickRouter}>
                팔로워
                <p>0</p>
              </li>
              <li onClick={onClickRouter}>
                팔로잉
                <p>0</p>
              </li>
            </ul>
          </div>

          <div className={style.profileNameReSet}>프로필수정</div>
          {followPage ? (
            <div className={style.upLoadImageBox}>
              {a.map((v, i) => {
                if (i % 3 === 0) {
                  // i = 0 3 6 9
                  return (
                    <ul className={style.upLoadImage}>
                      <li>{<img src={`${a[i + 0]}`} />}</li>
                      {a[i + 1] && <li>{<img src={`${a[i + 1]}`} />}</li>}
                      {a[i + 2] && <li>{<img src={`${a[i + 2]}`} />}</li>}
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
                  {b.map((v, i) => {
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
                  {b.map((v, i) => {
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
