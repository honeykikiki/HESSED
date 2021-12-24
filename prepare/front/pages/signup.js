import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import LoginLayout from '../components/LoginLayout';
import useinput from '../hooks/useinput';
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

  const [id, onChangeid, setID] = useinput('');
  const [pw, onChangePassword, setPassword] = useinput('');
  const [name, onChangeName, setName] = useinput('');
  const [phone, onChangePhone, setPhone] = useinput('');
  const [nickname, onChangeNickname, setNickname] = useinput('');
  const [agree, onChangeAgree, setAgree] = useinput(false);

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [privacyViewAgree, setPrivacyViewAgree] = useState(false);

  const checkInput = useRef();

  useEffect(() => {
    if (signUpDisplayChange) {
      alert(`${id}님 회원가입이 완료되었습니다`);
      Router.push('/');
    }
  }, [signUpDisplayChange, id]);

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
      setPrivacyViewAgree((prev) => !prev);
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

      if (!id.split('').find((v) => v === '@')) {
        alert('이메일을 입력해주세요');
        return;
      }

      const formIdData = new FormData();
      formIdData.append('mem_id', id);
      if (
        id.split('@')[1] === 'naver.com' ||
        id.split('@')[1] === 'gmail.com'
      ) {
        dispatch({
          type: DUPLICATE_CHECK_REQUEST,
          data: formIdData,
        });
      } else {
        alert('naver.com, gmail.com 을 이용해주세요');
      }
    },
    [id, duplicateCheckDisplay],
  );

  const PrivacyView = useCallback(() => {
    setPrivacyViewAgree((prev) => !prev);
  }, []);

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

      if (!signUpDisplayChange) {
        dispatch({
          type: SIGN_UP_REQUEST,
          data: formData,
        });
      }
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
      signUpDisplayChange,
    ],
  );

  return (
    <LoginLayout>
      <form className={style.form}>
        <input
          name="id"
          type="email"
          placeholder="이메일를 입력해주세요"
          value={id}
          onChange={onChangeid}
        />
        {duplicateCheckDone ? (
          <div style={{ color: '#409857' }}>*이메일 사용가능합니다.</div>
        ) : duplicateCheckDisplay ? null : (
          <div style={{ color: 'red' }}>*이메일 중복됩니다.</div>
        )}
        {signUpFailed ? null : id ? (
          duplicateCheckDone ? null : (
            <div style={{ color: 'red' }}>*이메일 중복체크가 필요합니다.</div>
          )
        ) : (
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
          <div style={{ color: 'red' }}>*비밀번호가 일치하지 않습니다.</div>
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
        <div className={style.checkBox}>
          <input
            name="mem_flag"
            type="checkbox"
            ref={checkInput}
            value={agree}
            onChange={checkboxClick}
          />

          <label htmlFor="mem_flag">
            <span onClick={PrivacyView}>개인정보 활용 동의 (보기)</span>
          </label>
          {signUpFailed ? null : agree ? null : (
            <div className={style.signupCheck}>*개인정보 동의</div>
          )}
        </div>
        <button style={{ marginTop: 5 }} type="submit" onClick={onSubmitSignUp}>
          가입하기
        </button>
      </form>
      {privacyViewAgree && (
        <div className={style.PrivacyView}>
          (HESSED)는 아래의 목적으로 개인정보를 수집 및 이용하며, 회원의
          개인정보를 안전하게 취급하는데 최선을 다하고 있습니다.
          <br />
          <br />
          1. 수집목적 - 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른
          개인정보 수집
          <br />
          2. 수집항목 회원가입 시 (필수) 이메일, 비밀번호, 이름, 성별,
          휴대폰번호를 취급합니다.
          <br />
          <br />
          3. 보유기간 수집된 정보는 회원탈퇴 요청 5일 후 지체없이 파기됩니다.
          다만 내부 방침에 의해 서비스 부정이용기록은 부정 가입 및 이용 방지를
          위하여 회원 탈퇴 시점으로부터 최대 1년간 보관 후 파기하며, 관계법령에
          의해 보관해야 하는 정보는 법령이 정한 기간 동안 보관한 후 파기합니다.
          서비스 제공을 위해 필요한 최소한의 개인정보이므로 동의를 해 주셔야
          서비스 이용이 가능합니다.
          <br />
          <br />
          4. 동의 거부시 불이익 귀하는 개인정보 제공 등에 관해 동의하지 않을
          권리가 있습니다. 다만, 필수수집 동의를 하지 않을 경우 가입이 제한될 수
          있습니다.
          <button onClick={checkboxClick}>확인</button>
        </div>
      )}
    </LoginLayout>
  );
};

export default Login;
