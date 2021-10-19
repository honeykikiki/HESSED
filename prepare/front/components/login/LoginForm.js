import React, { useCallback } from 'react';
import Link from 'next/link';

import LoginLayout from '../LoginLayout';
import useInput from '../../hooks/useInput';
import style from '../../styles/css/loginForm.module.css';
import { useDispatch } from 'react-redux';
import { LOG_IN_REQUEST } from '../../reducers/user';

const Login = () => {
  const dispatch = useDispatch();

  const [id, onchangeId, setId] = useInput('');
  const [password, onchangePassword, setPassword] = useInput('');

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: LOG_IN_REQUEST,
        data: { MEM_ID: id, MEN_PW: password },
      });
    },
    [id, password],
  );

  return (
    <LoginLayout>
      <form className={style.form} onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="아이디를 입력해주세요"
          value={id}
          onChange={onchangeId}
          required
        />

        <input
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={onchangePassword}
          type="password"
          required
        />

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
