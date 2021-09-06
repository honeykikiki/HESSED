import React, { useCallback } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import LoginLayout from '../LoginLayout';
import useinput from '../../hooks/useinput';
import style from '../../styles/css/login.module.css';

const Login = () => {
  const [id, onchangeId, setId] = useinput('');
  const [password, onchangePassword, setPassword] = useinput('');

  const onSubmit = useCallback((e) => {
    e.preventdefault();
  }, []);

  return (
    <LoginLayout>
      <form className={style.form} onSubmit={onSubmit}>
        <input
          className="id-input"
          placeholder="아이디를 입력해주세요"
          value={id}
          onChange={onchangeId}
          type="text"
          required
        />
        <br />
        <input
          className="password-input"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={onchangePassword}
          type="password"
        />
        <br />
        <button>로그인</button>
      </form>
      <div>
        <p>
          로그인 정보를 잊으셨나요?{' '}
          <span>
            <Link>ID</Link> / <Link>PW</Link>
          </span>
        </p>
        <p>회원가입</p>
      </div>
    </LoginLayout>
  );
};

export default Login;
