/* eslint-disable no-loop-func */
import React, { useCallback, useEffect } from 'react';
import Router from 'next/router';

import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../components/MainLayout';
import style from '../styles/css/upload.module.css';
import useinput from '../hooks/useinput';
import FormUpload from '../components/postUpload/FormUpload';

import { POST_CARD } from '../reducers/menu';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.userInfo);

  const { addPostDone, postCompleat, addPostLoading } = useSelector(
    (state) => state.postAdd,
  );

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

  const checkboxClick = useCallback(() => {
    setNotice((prev) => !prev);
  }, [notice]);

  // const handleImage = useCallback(
  //   async (e) => {
  //     const temp = [];
  //     const photoToAdd = e.target.files;
  //     console.log(photoToAdd, '1');

  //     for (let i = 0; i < photoToAdd.length; i++) {
  //       console.log(photoToAdd[i].name.split('.')[1], '2');

  //       if (photoToAdd[i].name.split('.')[1] === 'HEIC') {
  //         // eslint-disable-next-line no-await-in-loop
  //         await heic2any({ blob: photoToAdd[i], toType: 'image/jpeg' }).then(
  //           (result) => {
  //             console.log('heic');
  //             console.log(result);
  //             const file = new File(
  //               [result],
  //               `${photoToAdd[i].name.split('.')[0]}.jpg`,
  //               {
  //                 type: 'image/jpeg',
  //                 lastModified: new Date().getTime(),
  //               },
  //             );

  //             temp.push({
  //               id: file.name,
  //               file,
  //               url: URL.createObjectURL(file),
  //             });
  //             console.log(temp);
  //           },
  //         );
  //       } else {
  //         console.log('jpg');
  //         temp.push({
  //           id: photoToAdd[i].name,
  //           file: photoToAdd[i],
  //           url: URL.createObjectURL(photoToAdd[i]),
  //         });
  //       }
  //     }
  //     if (temp.length > 10) {
  //       return alert('최대개수 10개가 넘어갔습니다');
  //     }
  //     if (temp.length + photoToAddList.length > 10) {
  //       return alert('최대개수 10개가 넘어갔습니다');
  //     }
  //     if (photoToAddList.length > 10) {
  //       return alert('최대개수 10개가 넘어갔습니다');
  //     }

  //     setPhotoToAddList(temp.concat(photoToAddList));
  //   },
  //   [photoToAddList],
  // );

  // const upLoadFormClick = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     if (photoToAddList.length === 0) {
  //       alert('이미지를 등록해주세요');
  //       return;
  //     }
  //     if (!content) {
  //       alert('내용을 등록해주세요');
  //       return;
  //     }

  //     const formData = new FormData();
  //     photoToAddList.forEach((p) => {
  //       formData.append('bo_image', p.file);
  //     });
  //     formData.append('bo_writer', me.id);
  //     formData.append('bo_content', content);

  //     console.log(photoToAddList);
  //     console.log(...formData);
  //     // if (addPostLoading) {
  //     //   return;
  //     // }

  //     dispatch({
  //       type: ADD_POST_REQUEST,
  //       data: formData,
  //     });
  //   },
  //   [photoToAddList, content, addPostDone, me],
  // );

  return (
    <>
      <MainLayout>
        <div style={{ paddingTop: '24px' }} />
        <section className={style.a}>
          <article className={style.maxWidth}>
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
            <FormUpload />

            {/* <form
              encType="multipart/form-data"
              onSubmit={upLoadFormClick}
              className={style.upLoadForm}
            >
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
              />

              <div className={style.textInput}>
                <textarea
                  name="bo_content"
                  type="text"
                  placeholder="문구를 입력해주세요"
                  ref={ref}
                  onInput={handleResizeHeight}
                  onChange={onChangeContent}
                />
                <button>게시</button>
              </div>
            </form> */}
          </article>
        </section>
        <div style={{ paddingBottom: '44px' }} />
      </MainLayout>
    </>
  );
};

export default Home;
