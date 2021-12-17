import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import LoginLayout from '../components/LoginLayout';
import useInput from '../hooks/useInput';
import {
  DUPLICATE_CHECK_REQUEST,
  SIGN_UP_REQUEST,
  SIGNUP_FAILED,
} from '../reducers/userSign';
import style from '../styles/css/loginForm.module.css';

const Login = () => {
  const dispatch = useDispatch();
  const {
    duplicateCheckDone,
    duplicateCheckDisplay,
    signUpFailed,
    signUpDisplayChange,
  } = useSelector((state) => state.userSign);

  const [id, onChangeid, setID] = useInput('');
  const [pw, onChangePassword, setPassword] = useInput('');
  const [name, onChangeName, setName] = useInput('');
  const [phone, onChangePhone, setPhone] = useInput('');
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [agree, onChangeAgree, setAgree] = useInput(false);

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const checkInput = useRef();

  useEffect(() => {
    if (signUpDisplayChange) {
      alert(`${id}님 회원가입이 완료되었습니다`);
      Router.replace('/');
    }
  }, [signUpDisplayChange]);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== pw);
    },
    [pw],
  );

  const checkboxClick = useCallback(
    (e) => {
      setAgree((prev) => !prev);
      if (checkInput.current.checked === true) {
        checkInput.current.checked = false;
        setAgree(false);
      } else {
        checkInput.current.checked = true;
        setAgree(true);
      }
    },
    [agree],
  );

  const duplicateOnClick = useCallback(
    (e) => {
      e.preventDefault();
      if (id === '') {
        dispatch({
          type: SIGNUP_FAILED,
        });
        return;
      }

      const formIdData = new FormData();
      formIdData.append('mem_id', id);

      if (duplicateCheckDisplay) {
        dispatch({
          type: DUPLICATE_CHECK_REQUEST,
          data: formIdData,
        });
      }
    },
    [id, duplicateCheckDisplay],
  );

  const onSubmitSignUp = useCallback(
    (e) => {
      e.preventDefault();

      if (
        pw === '' ||
        pw !== passwordCheck ||
        passwordError ||
        name === '' ||
        phone === '' ||
        nickname === '' ||
        agree === false ||
        duplicateCheckDone === false
      ) {
        dispatch({
          type: SIGNUP_FAILED,
        });
        return;
      }

      const formData = new FormData();
      formData.append('mem_id', id);
      formData.append('mem_pw', pw);
      formData.append('mem_name', name);
      formData.append('mem_nickname', nickname);
      formData.append('mem_phone', phone);
      formData.append('mem_flag', agree);

      dispatch({
        type: SIGN_UP_REQUEST,
        data: formData,
      });
    },
    [
      id,
      pw,
      passwordCheck,
      passwordError,
      name,
      phone,
      nickname,
      agree,
      duplicateCheckDone,
    ],
  );

  return (
    <LoginLayout>
      <form className={style.form}>
        <input
          name="id"
          placeholder="이메일를 입력해주세요"
          value={id}
          onChange={onChangeid}
          type="email"
        />
        {duplicateCheckDone ? (
          <div style={{ color: '#409857' }}>*아이디 사용가능합니다</div>
        ) : duplicateCheckDisplay ? null : (
          <div style={{ color: 'red' }}>*아이디가 중복됩니다</div>
        )}
        {signUpFailed ? null : id ? null : (
          <div className={style.signupCheck}>*필수 정보입니다.</div>
        )}
        <button
          type="button"
          className={style.formButton}
          onClick={duplicateOnClick}
        >
          중복체크
        </button>
        <br />
        <input
          name="pw"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          value={pw}
          onChange={onChangePassword}
        />
        {signUpFailed ? null : pw ? null : (
          <div className={style.signupCheck}>*필수 정보입니다.</div>
        )}
        <input
          placeholder="비밀번호를 다시한번 입력해주세요"
          type="password"
          value={passwordCheck}
          onChange={onChangePasswordCheck}
        />
        {signUpFailed ? null : passwordCheck ? null : (
          <div className={style.signupCheck}>*필수 정보입니다.</div>
        )}
        {passwordError ? (
          <div style={{ color: 'red' }}>*비밀번호가 일치하지 않습니다</div>
        ) : passwordCheck ? (
          <div style={{ color: '#409857' }}>*보안100%</div>
        ) : null}
        <br />
        <input
          name="name"
          placeholder="이름을 입력해주세요"
          type="text"
          value={name}
          onChange={onChangeName}
        />
        {signUpFailed ? null : name ? null : (
          <div className={style.signupCheck}>*필수 정보입니다.</div>
        )}
        <input
          name="nickname"
          placeholder="별명을 입력해주세요"
          type="text"
          value={nickname}
          onChange={onChangeNickname}
        />
        {signUpFailed ? null : nickname ? null : (
          <div className={style.signupCheck}>*필수 정보입니다.</div>
        )}
        <input
          name="phone"
          placeholder="전화번호를 입력해주세요"
          type="number"
          maxLength="11"
          value={phone}
          onChange={onChangePhone}
        />
        {signUpFailed ? null : phone ? null : (
          <div className={style.signupCheck}>*필수 정보입니다.</div>
        )}
        <br />
        <div className={style.checkBox} onClick={checkboxClick}>
          <input
            name="mem_flag"
            type="checkbox"
            ref={checkInput}
            value={agree}
            onChange={checkboxClick}
          />

          <label htmlFor="mem_flag">개인정보 활용 동의 (보기)</label>
          {signUpFailed ? null : agree ? null : (
            <div className={style.signupCheck}>{'*개인정보 동의 '}</div>
          )}
        </div>
        <button style={{ marginTop: 5 }} type="submit" onClick={onSubmitSignUp}>
          가입하기
        </button>
      </form>
    </LoginLayout>
  );
};

export default Login;
