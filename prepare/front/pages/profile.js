import React from 'react';
import faker from 'faker';

import MainLayout from '../components/MainLayout';

import style from '../styles/css/profile.module.css';

const a = Array(10)
  .fill(faker.image.image())
  .map((v, i) => v + (i + 1));

const Profile = () => {
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
              <li>
                팔로워
                <p>0</p>
              </li>
              <li>
                팔로잉
                <p>0</p>
              </li>
            </ul>
          </div>

          <div className={style.profileNameReSet}>프로필수정</div>

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
