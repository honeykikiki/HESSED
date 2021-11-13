import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import LoginLayout from '../components/LoginLayout';
import useInput from '../hooks/useInput';
import { DUPLICATE_CHECK_REQUEST, SIGN_UP_REQUEST } from '../reducers/user';
import style from '../styles/css/loginForm.module.css';

const Login = () => {
  const dispatch = useDispatch();
  const { signUpDone, duplicateCheckDone, duplicateCheckDisplay } = useSelector(
    (state) => state.user,
  );

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

  const duplicateCheck = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('mem_id', mem_id);
      dispatch({
        type: DUPLICATE_CHECK_REQUEST,
        data: formData,
      });
    },
    [mem_id],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (mem_id === '') {
        alert('이메일을 입력해주세요.');
        return;
      }
      const formIdData = new FormData();
      formIdData.append('mem_id', mem_id);
      if (!duplicateCheckDisplay) {
        dispatch({
          type: DUPLICATE_CHECK_REQUEST,
          data: formIdData,
        });
      }

      if (mem_pw === '') {
        alert('비밀번호를 입력해주세요.');
        return;
      }
      if (passwordError) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
      if (mem_name === '') {
        alert('이름을 입력해주세요.');
        return;
      }
      if (mem_nickname === '') {
        alert('닉네임을 입력해주세요.');
        return;
      }
      if (agree === false) {
        alert('개인정보 활용을 동의해주세요.');
        return;
      }
      if (duplicateCheckDisplay) {
        alert('중복체크 해주세요!');
        return;
      }
      if (mem_pw !== passwordCheck) {
        return setPasswordError(true);
      }
      if (!agree) {
        return setAgree(false);
      }
      const formData = new FormData();
      formData.append('mem_name', mem_name);
      formData.append('mem_id', mem_id);
      formData.append('mem_pw', mem_pw);
      formData.append('mem_nickname', mem_nickname);
      formData.append('mem_flag', agree);
      console.log(...formData);
      dispatch({
        type: SIGN_UP_REQUEST,
        data: formData,
      });
    },
    [mem_id, mem_pw, mem_name, mem_nickname, agree, duplicateCheckDisplay],
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
          // required
        />

        {duplicateCheckDone ? (
          <div style={{ color: '#409857' }}>{`*아이디 사용가능합니다`}</div>
        ) : duplicateCheckDisplay ? null : (
          <div style={{ color: '#409857' }}>{`*아이디가 중복됩니다`}</div>
        )}

        <button type="button" onClick={duplicateCheck}>
          중복체크
        </button>

        <br />

        <input
          name="mem_pw"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          value={mem_pw}
          onChange={onChangePassword}
          // required
        />
        <br />

        <input
          style={{ marginTop: -5 }}
          placeholder="비밀번호를 다시한번 입력해주세요"
          type="password"
          value={passwordCheck}
          // required
          onChange={onChangePasswordCheck}
        />
        {passwordError ? (
          <div style={{ color: 'red' }}>*비밀번호가 일치하지 않습니다</div>
        ) : (
          <div style={{ color: '#409857' }}>{`*보안100%`}</div>
        )}
        <br />

        <input
          name="mem_name"
          style={{ marginTop: -10 }}
          placeholder="이름을 입력해주세요"
          type="text"
          value={mem_name}
          onChange={onChangeName}
          // required
        />
        <br />

        <input
          name="mem_nickname"
          placeholder="별명을 입력해주세요"
          type="text"
          value={mem_nickname}
          onChange={onChangeNickname}
          // required
        />
        <br />

        <div className={style.checkBox}>
          <input
            name="mem_flag"
            type="checkbox"
            value={agree}
            onClick={checkboxClick}
            // required
          />
          <span>개인정보 활용 동의 (보기)</span>
        </div>
        <button style={{ marginTop: 5 }}>가입하기</button>
      </form>
    </LoginLayout>
  );
};

export default Login;
