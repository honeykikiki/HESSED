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

  const [mem_id, onChangemem_id, setMEM_ID] = useInput('');
  const [mem_pw, onChangePassword, setPassword] = useInput('');
  const [mem_name, onChangeName, setName] = useInput('');
  const [mem_nickname, onChangeNickname, setNickname] = useInput('');
  const [agree, onChangeAgree, setAgree] = useInput(false);

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== mem_pw);
    },
    [mem_pw],
  );

  useEffect(() => {
    if (signUpDone) {
      alert(`${mem_id}님 회원가입이 완료되었습니다`);
      Router.replace('/');
    }
  }, [signUpDone]);

  const checkboxClick = useCallback(() => {
    setAgree((prev) => !prev);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (mem_pw !== passwordCheck) {
        return setPasswordError(true);
      }
      if (!agree) {
        return setAgree(true);
      }

      dispatch({
        type: SIGN_UP_REQUEST,
        data: {
          mem_name,
          mem_id,
          mem_pw,
          mem_nickname,
          mem_flag: agree,
        },
      });
    },
    [mem_id, mem_pw, mem_name, mem_nickname, agree],
  );

  return (
    <LoginLayout>
      <form className={style.form} onSubmit={onSubmit}>
        <input
          name="mem_id"
          placeholder="이메일를 입력해주세요"
          value={mem_id}
          onChange={onChangemem_id}
          type="email"
          required
        />

        <br />

        <input
          name="mem_pw"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          value={mem_pw}
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
          name="mem_name"
          style={{ marginTop: -10 }}
          placeholder="이름을 입력해주세요"
          type="text"
          value={mem_name}
          onChange={onChangeName}
          required
        />
        <br />

        <input
          name="mem_nickname"
          placeholder="별명을 입력해주세요"
          type="text"
          value={mem_nickname}
          onChange={onChangeNickname}
          required
        />
        <br />

        {/* <input
          placeholder="ex) 01012345678"
          type="number"
          value={phone}
          onChange={onChangePhone}
          maxLength="11"
          required
        />
        <br /> */}

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
            name="mem_flag"
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
