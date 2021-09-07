import React, { useCallback } from 'react';
import Link from 'next/link';

import LoginLayout from '../../components/LoginLayout';
import style from '../../styles/css/loginForm.module.css';
import useinput from '../../hooks/useinput';

const IdSearch = () => {
  const [nickname, onChangeNickname, setNickname] = useinput('');
  const [phone, onChangePhone, setPhone] = useinput('');

  const onSubmitIdSearch = useCallback(
    (e) => {
      e.preventDefault();
    },
    [nickname, phone],
  );
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
          placeholder="아이디를 입력해주세요"
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
          maxlength="11"
        />
        <br />

        <button type="submit">비밀번호 찾기</button>
      </form>
      <div className={style.div}>
        <Link href="/login/idSearch">
          <a>
            <button style={{ marginTop: 20 }} type="submit">
              아이디 찾기
            </button>
          </a>
        </Link>
      </div>
      {false ? <div>하이</div> : null}
    </LoginLayout>
  );
};

export default IdSearch;
