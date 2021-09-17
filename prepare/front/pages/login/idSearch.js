import React, { useCallback } from 'react';
import Link from 'next/link';

import LoginLayout from '../../components/LoginLayout';
import style from '../../styles/css/loginForm.module.css';
import useInput from '../../hooks/useInput';

const IdSearch = () => {
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [phone, onChangePhone, setPhone] = useInput('');

  const onSubmitIdSearch = useCallback((e) => {
    e.preventDefault();
    setNickname(nickname);
    setPhone(phone);
  }, []);
  return (
    <LoginLayout>
      <form className={style.form} onSubmit={onSubmitIdSearch}>
        <input
          placeholder="이름을 입력해주세요"
          value={nickname}
          onChange={onChangeNickname}
          required
        />

        <br />

        <input
          placeholder="ex) 01012345678"
          value={phone}
          onChange={onChangePhone}
          type="number"
          maxLength="11"
        />
        <br />

        <button>아이디 찾기</button>
      </form>
      <div className={style.div}>
        <Link href="/login/pwSearch">
          <a>
            <button style={{ marginTop: 20 }}>비밀번호 찾기</button>
          </a>
        </Link>
      </div>
      {false ? <div>하이</div> : null}
    </LoginLayout>
  );
};

export default IdSearch;
