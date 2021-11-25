import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';

import LoginLayout from '../LoginLayout';
import useInput from '../../hooks/useInput';
import style from '../../styles/css/loginForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST, SIGNUP_CHANGE_DISPLAY } from '../../reducers/user';

const Login = () => {
  const dispatch = useDispatch();
  const { logInFailed, signUpDone } = useSelector((state) => state.user);

  const [id, onchangeId, setId] = useInput('');
  const [password, onchangePassword, setPassword] = useInput('');

  useEffect(() => {
    if (signUpDone) {
      dispatch({
        type: SIGNUP_CHANGE_DISPLAY,
      });
    }
  }, [signUpDone]);

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
          type="text"
          placeholder="아이디를 입력해주세요"
          value={id}
          onChange={onchangeId}
        />
        {logInFailed ? null : id ? null : (
          <div className={style.signupCheck}>{`*아이디를 입력해주세요.`}</div>
        )}

        <input
          name="mem_pw"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={onchangePassword}
          type="password"
        />
        {logInFailed ? null : password ? null : (
          <div className={style.signupCheck}>{`*비밀번호를 입력해주세요.`}</div>
        )}

        {logInFailed ? null : id && password ? (
          <div className={style.signupCheck}>{`계정을 다시 입력해주세요.`}</div>
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

        <Link href="/signup">
          <a>
            <button>회원가입</button>
          </a>
        </Link>
      </div>
    </LoginLayout>
  );
};

export default Login;
