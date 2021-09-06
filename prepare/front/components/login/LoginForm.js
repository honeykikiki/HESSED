import React, { useCallback } from 'react';
import Link from 'next/link';

import LoginLayout from '../LoginLayout';
import useinput from '../../hooks/useinput';
import styles from '../../styles/css/loginForm.module.css';

const Login = () => {
  const [id, onchangeId, setId] = useinput('');
  const [password, onchangePassword, setPassword] = useinput('');

  const onSubmit = useCallback((e) => {
    e.preventdefault();
  }, []);

  return (
    <LoginLayout>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          className="id-input"
          placeholder="아이디를 입력해주세요"
          value={id}
          onChange={onchangeId}
          type="text"
          required
        />

        <input
          className="password-input"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={onchangePassword}
          type="password"
        />

        <button>로그인</button>
      </form>
      <div className={styles.div}>
        <Link href="/signup">
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
