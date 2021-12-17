import React, { useCallback, useEffect, useRef, useState } from 'react';
import Router from 'next/router';

import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../components/MainLayout';
import style from '../styles/css/upload.module.css';
import useinput from '../hooks/useinput';

import { POST_CARD } from '../reducers/menu';
import UploadImages from '../components/postUpload/UploadImages';
import { ADD_POST_REQUEST } from '../reducers/postAdd';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.userInfo);

  const { addPostDone, postCompleat, addPostLoading } = useSelector(
    (state) => state.postAdd,
  );

  const [photoToAddList, setPhotoToAddList] = useState([]);
  const [content, onChangeContent, setContetn] = useinput();
  const [notice, onChangeNotice, setNotice] = useinput(false);

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
    if (postCompleat) {
      dispatch({
        type: POST_CARD,
      });
      if (addPostDone) {
        Router.push('/');
      }
    }
  }, [me, addPostDone, postCompleat]);

  const imageInput = useRef();
  const ref = useRef();
  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = '20px';
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, []); // 댓글창 크기 자동조절

  const checkboxClick = useCallback(() => {
    setNotice((prev) => !prev);
  }, [notice]);

  const handleImage = useCallback(
    (e) => {
      const temp = [];
      const photoToAdd = e.target.files;
      // eslint-disable-next-line no-plusplus
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

  const upLoadFormClick = useCallback(
    (e) => {
      e.preventDefault();
      if (!photoToAddList.length > 0 && photoToAddList === null) {
        alert('이미지를 등록해주세요');
        return;
      }
      if (!content) {
        alert('내용을 등록해주세요');
        return;
      }

      const formData = new FormData();
      photoToAddList.forEach((p) => {
        formData.append('bo_image', p.file);
      });
      formData.append('bo_writer', me.id);
      formData.append('bo_content', content);

      if (addPostLoading) {
        return;
      }

      dispatch({
        type: ADD_POST_REQUEST,
        data: formData,
      });
    },
    [photoToAddList, content, addPostDone, me],
  );

  return (
    <>
      <MainLayout>
        <div style={{ paddingTop: '24px' }} />
        <section className={style.a}>
          <article className={style.maxWidth}>
            <form
              encType="multipart/form-data"
              onSubmit={upLoadFormClick}
              className={style.upLoadForm}
            >
              {me?.grade === 'admin' && (
                <div className={style.notice}>
                  <div>
                    <p>공지</p>
                  </div>
                  <div className={style.switch}>
                    <input
                      name="mem_flag"
                      id="switch-1"
                      className={style.switchInput}
                      type="checkbox"
                      value={notice}
                      onClick={checkboxClick}
                    />
                    <label htmlFor="switch-1" className={style.switchLlabel}>
                      Switch
                    </label>
                  </div>
                </div>
              )}
              <div className={style.imageBox}>
                <ul>
                  <UploadImages
                    photoToAddList={photoToAddList}
                    imageInput={imageInput}
                    setPhotoToAddList={setPhotoToAddList}
                  />
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
                  required
                />
                <button>게시</button>
              </div>
            </form>
          </article>
        </section>
        <div style={{ paddingBottom: '44px' }} />
      </MainLayout>
    </>
  );
};

export default Home;
