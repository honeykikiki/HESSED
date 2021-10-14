import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import LoginLayout from '../components/LoginLayout';
import useInput from '../hooks/useInput';
import { SIGN_UP_REQUEST } from '../reducers/user';
import style from '../styles/css/loginForm.module.css';

const Login = () => {
  const dispatch = useDispatch();
  const { signUpDone } = useSelector((state) => state.user);

  const [id, onChangeId, setId] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [myName, onChangeMyName, setMyName] = useInput('');
  const [phone, onChangePhone, setPhone] = useInput('');
  const [area, onChangeArea, setArea] = useInput('');
  const [agree, onChangeAgree, setAgree] = useInput(false);

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  useEffect(() => {
    if (signUpDone) {
      alert(`${myName}님 회원가입이 완료되었습니다`);
      Router.replace('/');
    }
  }, [signUpDone]);

  const checkboxClick = useCallback(() => {
    setAgree((prev) => !prev);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (password !== passwordCheck) {
        return setPasswordError(true);
      }
      if (agree) {
        return setTermError(true);
      }
      if (phone.length !== 11) {
        return alert('올바른 전화번호를 입력해주세요');
      }
      dispatch({
        type: SIGN_UP_REQUEST,
        data: { myName, id, password, nickname, phone, agree },
      });
    },
    [id, password, nickname, phone, area],
  );

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
          style={{ marginTop: -10 }}
          placeholder="이름을 입력해주세요"
          type="text"
          value={myName}
          onChange={onChangeMyName}
          required
        />
        <br />

        <input
          placeholder="별명을 입력해주세요"
          type="text"
          value={nickname}
          onChange={onChangeNickname}
          required
        />
        <br />

        <input
          placeholder="ex) 01012345678"
          type="number"
          value={phone}
          onChange={onChangePhone}
          maxLength="11"
          required
        />
        <br />

        {/* <input
          placeholder="ex) 둔산동"
          type="text"
          value={area}
          onChange={onChangeArea}
          required
        />
        <br /> */}

        <div className={style.checkBox}>
          <input
            type="checkbox"
            value={agree}
            onClick={checkboxClick}
            required
          />
          <span>개인정보 활용 동의 (보기)</span>
        </div>
        <button style={{ marginTop: 5 }}>가입하기</button>
      </form>
    </LoginLayout>
  );
};

export default Login;
