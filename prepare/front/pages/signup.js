import React, { useCallback, useState } from 'react';

import LoginLayout from '../components/LoginLayout';
import useinput from '../hooks/useinput';
import style from '../styles/css/loginForm.module.css';

const Login = () => {
  const [id, onChangeId, setId] = useinput('');
  const [password, onChangePassword, setPassword] = useinput('');
  const [nickname, onChangeNickname, setNickname] = useinput('');
  const [phone, onChangePhone, setPhone] = useinput('');
  const [area, onChangeArea, setArea] = useinput('');
  const [agree, onChangeAgree, setAgree] = useinput();

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  const onSubmit = useCallback((e) => {
    e.preventdefault();
  }, []);

  const onClick = () => {};

  return (
    <LoginLayout>
      <form className={style.form} onSubmit={onSubmit}>
        <input
          placeholder="아이디를 입력해주세요"
          value={id}
          onChange={onChangeId}
          type="text"
          required
        />

        <br />

        <input
          placeholder="비밀번호를 입력해주세요"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
        <br />

        <input
          style={{ marginTop: -5 }}
          placeholder="비밀번호를 다시한번 입력해주세요"
          type="password"
          value={passwordCheck}
          required
          onChange={onChangePasswordCheck}
        />
        {passwordError ? (
          <div style={{ color: 'red' }}>*비밀번호가 일치하지 않습니다</div>
        ) : (
          <div>{`*보안100%`}</div>
        )}
        <br />

        <input
          placeholder="이름을 입력해주세요"
          type="text"
          value={nickname}
          onChange={onChangeNickname}
          required
        />
        <br />

        <input
          placeholder="ex) 01012345678"
          type="text"
          value={phone}
          onChange={onChangePhone}
          required
        />
        <br />

        <input placeholder="ex) 둔산동" type="text" value={area} onChange={onChangeArea} required />
        <br />

        <div className={style.checkBox}>
          <input type="checkbox" value={agree} onChange={onChangeNickname} required />
          <span>개인정보 활용 동의 (보기)</span>
        </div>
        <br />

        <button>가입하기</button>
      </form>
    </LoginLayout>
  );
};

export default Login;
