import React, { useCallback, useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import faker from 'faker';

import MainLayout from '../components/MainLayout';
import style from '../styles/css/upload.module.css';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST } from '../reducers/post';
import { POST_CARD } from '../reducers/menu';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, addPostDone } = useSelector((state) => state.post);

  const imageInput = useRef();
  const [photoToAddList, setPhotoToAddList] = useState([]);
  const [content, onChangeContent, setContetn] = useInput();

  const ref = useRef();
  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = '20px';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, []); //댓글창 크기 자동조절

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const handleImage = useCallback(
    (e) => {
      const temp = [];
      const photoToAdd = e.target.files;
      for (let i = 0; i < photoToAdd.length; i++) {
        temp.push({
          id: photoToAdd[i].name,
          file: photoToAdd[i],
          url: URL.createObjectURL(photoToAdd[i]),
        });
      }
      if (temp.length > 10) {
        return alert('최대개수 10개가 넘어갔습니다');
      }
      if (temp.length + photoToAddList.length > 10) {
        return alert('최대개수 10개가 넘어갔습니다');
      }
      if (photoToAddList.length > 10) {
        return alert('최대개수 10개가 넘어갔습니다');
      }

      setPhotoToAddList(temp.concat(photoToAddList));
    },
    [photoToAddList],
  );

  const onRemove = useCallback(
    (deleteUrl) => {
      setPhotoToAddList(photoToAddList.filter((v) => v.url !== deleteUrl));
    },
    [photoToAddList],
  );

  const upLoadFormClick = useCallback(
    (e) => {
      e.preventDefault();
      if (!photoToAddList.length > 0) {
        alert('이미지를 등록해주세요');
        return;
      }
      if (!content) {
        alert('이미지를 등록해주세요');
        return;
      }

      dispatch({
        type: ADD_POST_REQUEST,
        data: {
          id: mainPosts[0]?.id + 1 || 0,
          User: {
            id: me.id,
            nickname: me.nickname,
          },
          content,
          Images: photoToAddList,
          Likers: [],
          Comments: [],
        },
      });

      setTimeout(() => {
        if (addPostDone) {
          console.log('end');
          Router.push('/');
          dispatch({
            type: POST_CARD,
          });
        }
      }, 1000);
    },
    [photoToAddList, mainPosts, content, addPostDone, Router],
  );

  return (
    <>
      <MainLayout>
        <div style={{ paddingTop: '24px' }}></div>
        <section className={style.a}>
          <article className={style.maxWidth}>
            <form className={style.upLoadForm}>
              <div className={style.imageBox}>
                {/* /분리 */}
                <ul>
                  {photoToAddList
                    ? photoToAddList.map((v) => {
                        return (
                          <li key={v.url}>
                            <div
                              className={style.remove}
                              onClick={() => onRemove(v.url)}
                            >
                              x
                            </div>
                            <img
                              src={v.url}
                              style={{
                                backgroundImage: `url(${v.url})`,
                              }}
                            />
                          </li>
                        );
                      })
                    : null}
                  <li onClick={onClickImageUpload}>
                    <div className={style.imageInput}>
                      <img src="/icon/addphoto.svg" className={style.addImg} />
                    </div>
                  </li>
                </ul>
              </div>

              <input
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                ref={imageInput}
                onChange={handleImage}
                hidden
                multiple
                required
              />

              <div className={style.textInput}>
                <textarea
                  type="text"
                  placeholder="문구를 입력해주세요"
                  ref={ref}
                  onInput={handleResizeHeight}
                  onChange={onChangeContent}
                  maxLength={140}
                  required
                />
                <button onClick={upLoadFormClick}>게시</button>
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
