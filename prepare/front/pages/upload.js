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
  const [imageCuurrentNo, setImageCuurrentNo] = useState(0);
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
    if (imageCuurrentNo < 0) {
      setImageCuurrentNo(0);
    }
  }, [me, imageCuurrentNo]);

  const onClickLeft = useCallback(() => {
    if (imageCuurrentNo > 0) {
      setImageCuurrentNo((prev) => prev - 1);
    }
  }, [imageCuurrentNo, photoToAddList]);

  const onClickRight = useCallback(() => {
    if (imageCuurrentNo < photoToAddList.length - 1) {
      setImageCuurrentNo((prev) => prev + 1);
    }
  }, [imageCuurrentNo, photoToAddList]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
    setImageCuurrentNo(0);
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
      setPhotoToAddList(temp.concat(photoToAddList));
    },
    [photoToAddList],
  );

  const onRemove = useCallback(
    (deleteUrl) => {
      setPhotoToAddList(photoToAddList.filter((v) => v.url !== deleteUrl));
      setImageCuurrentNo((prev) => prev - 1);
      if (imageCuurrentNo < 0) {
        setImageCuurrentNo(0);
      }
    },
    [photoToAddList, imageCuurrentNo],
  );

  const time = setTimeout(() => {
    console.log('start');
    if (addPostDone) {
      console.log('end');
      Router.push('/');
      dispatch({
        type: POST_CARD,
      });
    }
  }, 1000);

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
    },
    [photoToAddList, mainPosts, content, addPostDone],
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
                          <li
                            style={{
                              transform: `translate3d(-${
                                imageCuurrentNo * 100
                              }%, 0px, 0px)`,
                              transition: 'all .6s',
                            }}
                            key={v.url}
                          >
                            <div
                              className={style.remove}
                              onClick={() => onRemove(v.url)}
                            >
                              X
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
                </ul>
                {imageCuurrentNo >= 1 && (
                  <div className={style.left}>
                    <img src="/icon/left.png" onClick={onClickLeft} />
                  </div>
                )}

                {imageCuurrentNo < photoToAddList.length - 1 && (
                  <div className={style.right} onClick={onClickRight}>
                    <img src="/icon/right.png" />
                  </div>
                )}
                <span>
                  {`${imageCuurrentNo + 1} / ${photoToAddList.length}`}
                </span>
                {/*  */}
              </div>

              <div className={style.imageInput}>
                <div onClick={onClickImageUpload}>
                  <input
                    type="file"
                    accept="image/jpg, image/jpeg, image/png"
                    ref={imageInput}
                    onChange={handleImage}
                    hidden
                    multiple
                    required
                  />
                  <img src="/icon/addphoto.svg" />
                  <p>등록할 사진을 가지고와주세요.</p>
                </div>
              </div>

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
