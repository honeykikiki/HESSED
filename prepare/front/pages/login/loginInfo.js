import React from 'react';
import Link from 'next/link';

import LoginLayout from '../../components/LoginLayout';
import style from '../../styles/css/loginForm.module.css';

const LoginInfo = () => {
  return (
    <LoginLayout>
      <div className={style.form}>
        <div className={style.div}>
          <Link href="/login/idSearch">
            <a>
              <button style={{ marginTop: 60 }}>아이디 찾기</button>
            </a>
          </Link>
          <Link href="/login/pwSearch">
            <a>
              <button>비밀번호 찾기</button>
            </a>
          </Link>
        </div>
      </div>
    </LoginLayout>
  );
};

export default LoginInfo;
