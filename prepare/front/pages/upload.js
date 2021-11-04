import React, { useCallback, useEffect, useRef, useState } from 'react';
import Router from 'next/router';

import MainLayout from '../components/MainLayout';
import style from '../styles/css/upload.module.css';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST, LOAD_POSTS_REQUEST } from '../reducers/post';
import { POST_CARD } from '../reducers/menu';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, addPostDone } = useSelector((state) => state.post);

  const [photoToAddList, setPhotoToAddList] = useState([]);
  const [content, onChangeContent, setContetn] = useInput();
  const [notice, onChangeNotice, setNotice] = useInput(false);

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

  const checkboxClick = useCallback(() => {
    setNotice((prev) => !prev);
  }, [notice]);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  // const onChanfeImages = useCallback((e) => {
  //   console.log('images', e.target.files);
  //   const imageFormData = new FormData();
  //   [].forEach.call(e.target.files, (f) => {
  //     imageFormData.append('image', f);
  //   });
  //   dispatch({
  //     type: UPLOAD_IMAGES_REQUEST,
  //     data: imageFormData,
  //   });
  // }, []);

  const handleImage = useCallback(
    (e) => {
      const temp = [];
      const photoToAdd = e.target.files;
      for (let i = 0; i < photoToAdd.length; i++) {
        console.log(photoToAdd);
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

  // const onSubmit = useCallback(
  //   (e) => {
  //     e.preventDefault();

  //     // if (!photoToAddList.length > 0) {
  //     //   alert('이미지를 등록해주세요');
  //     //   return;
  //     // }
  //     if (!content) {
  //       alert('내용을 등록해주세요');
  //       return;
  //     }

  //     // const formData = new FormData();
  //     // imagePaths.forEach((p) => {
  //     //   formData.append('image', p);
  //     // });
  //     // formData.append('content', content);
  //     // formData.append('bo_writer', me.id);
  //     // console.log(...formData, 'formData');
  //     // return dispatch({
  //     //   type: ADD_POST_REQUEST,
  //     //   data: formData,
  //     // });
  //   },
  //   [me, imagePaths, content],
  // );

  const upLoadFormClick = useCallback(
    (e) => {
      e.preventDefault();
      if (!photoToAddList.length > 0) {
        alert('이미지를 등록해주세요');
        return;
      }
      if (!content) {
        alert('내용을 등록해주세요');
        return;
      }

      dispatch({
        type: ADD_POST_REQUEST,
        data: {
          bo_writer: me.id,
          bo_content: content,
          bo_image: photoToAddList,
        },
      });
      dispatch({
        type: LOAD_POSTS_REQUEST,
        data: {
          mem_id: me?.id,
        },
      });
      setTimeout(() => {
        if (addPostDone) {
          Router.push('/');
          dispatch({
            type: POST_CARD,
          });
        }
      }, 1000);
    },
    [photoToAddList, content, addPostDone],
  );

  return (
    <>
      <MainLayout>
        <div style={{ paddingTop: '24px' }}></div>
        <section className={style.a}>
          <article className={style.maxWidth}>
            <form
              encType="multipart/form-data"
              onSubmit={upLoadFormClick}
              className={style.upLoadForm}
            >
              {me?.grade === 'admin' && (
                <div>
                  <span>공지</span>
                  <input
                    name="mem_flag"
                    type="checkbox"
                    value={notice}
                    onClick={checkboxClick}
                    // required
                  />
                </div>
              )}
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
                name="bo_image"
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
                  name="bo_content"
                  type="text"
                  placeholder="문구를 입력해주세요"
                  ref={ref}
                  onInput={handleResizeHeight}
                  onChange={onChangeContent}
                  maxLength={140}
                  required
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
