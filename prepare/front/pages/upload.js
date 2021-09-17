import React, { useCallback, useRef } from 'react';
import faker from 'faker';

import MainLayout from '../components/MainLayout';

import style from '../styles/css/upload.module.css';

const Home = () => {
  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);
  console.log(imageInput);
  return (
    <>
      <MainLayout>
        <div style={{ paddingTop: '24px' }}></div>
        <section className={style.a}>
          <article className={style.maxWidth}>
            <form className={style.upLoadForm}>
              <div className={style.imageBox}>
                <ul>
                  <li>
                    <img src={faker.image.image()} />
                  </li>
                  <li>
                    <img src={faker.image.image()} />
                  </li>
                  <li>
                    <img src={faker.image.image()} />
                  </li>
                  <li>
                    <img src={faker.image.image()} />
                  </li>
                </ul>
                <div className={style.left}>
                  <img src="/icon/left.png" />
                </div>
                <div className={style.right}>
                  <img src="/icon/right.png" />
                </div>
                <span>0 / 0</span>
              </div>

              <div className={style.imageInput}>
                <input
                  type="file"
                  name="image"
                  ref={imageInput}
                  hidden
                  multiple
                  required
                />
                <span onClick={onClickImageUpload}>
                  <img src="/icon/addphoto.svg" />
                  <p>등록할 사진을 가지고와주세요.</p>
                </span>
              </div>

              <div className={style.textInput}>
                <textarea
                  type="text"
                  name="text"
                  placeholder="문구를 입력해주세요"
                  maxLength={140}
                />
                <button>게시</button>
              </div>
            </form>
          </article>
        </section>
        <div style={{ paddingBottom: '44px' }}></div>
      </MainLayout>
    </>
  );
};

Home.propTypes = {};

export default Home;
