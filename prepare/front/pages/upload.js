/* eslint-disable no-loop-func */
import React, { useCallback, useEffect } from 'react';
import Router from 'next/router';

import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../components/MainLayout';
import style from '../styles/css/upload.module.css';
import useinput from '../hooks/useinput';
import FormUpload from '../components/postUpload/FormUpload';

import { POST_CARD } from '../reducers/menu';

const Upload = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.userInfo);

  const { addPostDone, postCompleat } = useSelector((state) => state.postAdd);

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

  return (
    <>
      <MainLayout>
        <div style={{ paddingTop: '24px' }} />
        <article className={style.a}>
          <section className={style.maxWidth}>
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
          </section>
        </article>
        <div style={{ paddingBottom: '44px' }} />
      </MainLayout>
    </>
  );
};

export default Upload;
