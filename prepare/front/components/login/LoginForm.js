import React, { useCallback } from 'react';
import Link from 'next/link';

import LoginLayout from '../LoginLayout';
import useInput from '../../hooks/useInput';
import style from '../../styles/css/loginForm.module.css';

const Login = () => {
  const [id, onchangeId, setId] = useInput('');
  const [password, onchangePassword, setPassword] = useInput('');

  const onSubmit = useCallback((e) => {
    e.preventdefault();
  }, []);

  return (
    <LoginLayout>
      <form className={style.form} onSubmit={onSubmit}>
        <input
          placeholder="아이디를 입력해주세요"
          value={id}
          onChange={onchangeId}
          type="text"
          required
        />

        <input
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={onchangePassword}
          type="password"
        />

        <button>로그인</button>
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
