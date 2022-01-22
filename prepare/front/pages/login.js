import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Router from 'next/router';
import LoginLayout from '../components/LoginLayout';
import useinput from '../hooks/useinput';
import style from '../styles/css/loginForm.module.css';
import { LOG_IN_REQUEST } from '../reducers/userInfo';
import { SIGN_UP_REQUEST } from '../reducers/userSign';
import { LOAD_POSTS_REQUEST } from '../reducers/postMainAction';

import wrapper from '../store/configureStore';

const Login = () => {
  const dispatch = useDispatch();
  const { signUpDone } = useSelector((state) => state.userSign);
  const { logInFailed } = useSelector((state) => state.userInfo);
  const { me } = useSelector((state) => state.userInfo);

  const [id, onchangeId] = useinput('');
  const [password, onchangePassword] = useinput('');
  const [phoneMode, setPhoneModel] = useState('');

  useEffect(() => {
    if (me) {
      Router.push('/');
    }
    if (signUpDone) {
      dispatch({
        type: SIGN_UP_REQUEST,
      });
    }
    if (navigator) {
      setPhoneModel(navigator.userAgent.toLowerCase());
    }
  }, [signUpDone, me]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('mem_id', id);
      formData.append('mem_pw', password);

      dispatch({
        type: LOG_IN_REQUEST,
        data: formData,
      });
    },
    [id, password],
  );

  return (
    <LoginLayout>
      <form className={style.form} onSubmit={onSubmit}>
        <input
          name="mem_id"
          type="email"
          placeholder="아이디를 입력해주세요"
          value={id}
          onChange={onchangeId}
        />
        {logInFailed ? null : id ? null : (
          <div className={style.signupCheck}>*아이디를 입력해주세요.</div>
        )}

        <input
          name="mem_pw"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={onchangePassword}
          type="password"
        />
        {logInFailed ? null : password ? null : (
          <div className={style.signupCheck}>*비밀번호를 입력해주세요.</div>
        )}

        {logInFailed ? null : id && password ? (
          <div className={style.signupCheck}>계정을 다시 입력해주세요.</div>
        ) : null}

        <button type="submit">로그인</button>
      </form>
      <div className={style.div}>
        <Link href="/login/loginInfo">
          <a>
            <p>
              로그인 정보를 잊으셨나요?
              <span>
                <em>ID / PW</em>
              </span>
            </p>
          </a>
        </Link>
        <br />

        <Link href="/signup">
          <a>
            <button>회원가입</button>
          </a>
        </Link>
      </div>
      {/* 홈화면 추가 팝압창 */}
      {phoneMode.indexOf('iphone') > -1 ? (
        <div className={style.homePlus}>
          {/* <img src="/icon/postAddTwo.svg" alt="upLoadicon" /> */}
          <p>하단의 버튼을 클릭해서 홈화면 추가를 해주세요!</p>
          <span />
        </div>
      ) : (
        phoneMode.indexOf('android') > -1 && (
          <div className={style.homePlus}>
            <img src="/popup/chrome-plus.png" alt="더보기 버튼" />
            <img src="/popup/samsung-plus.png" alt="더보기 버튼" />
            <p>더보기 버튼을 클릭해서 홈화면 추가를 해주세요!</p>
          </div>
        )
      )}
    </LoginLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const cookie = req ? req.headers.cookie : '';
      axios.defaults.headers.Cookie = '';
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      store.dispatch({
        type: LOG_IN_REQUEST,
      });
      // store.dispatch({
      //   type: LOAD_POSTS_REQUEST,
      // });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    },
);

export default Login;
