import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import LoginLayout from '../LoginLayout';
import useinput from '../../hooks/useinput';
import style from '../../styles/css/loginForm.module.css';
import { LOG_IN_REQUEST } from '../../reducers/userInfo';
import { SIGN_UP_REQUEST } from '../../reducers/userSign';

const Login = () => {
  const dispatch = useDispatch();
  const { signUpDone } = useSelector((state) => state.userSign);
  const { logInFailed } = useSelector((state) => state.userInfo);

  const [id, onchangeId] = useinput('');
  const [password, onchangePassword] = useinput('');

  useEffect(() => {
    if (signUpDone) {
      dispatch({
        type: SIGN_UP_REQUEST,
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
    </LoginLayout>
  );
};

export default Login;
