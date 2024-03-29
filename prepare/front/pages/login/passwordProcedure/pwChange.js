import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import LoginLayout from '../../../components/LoginLayout';
import useinput from '../../../hooks/useinput';
import style from '../../../styles/css/loginForm.module.css';
import { PASSWORD_CHANGE_REQUEST } from '../../../reducers/userSign';

const PwChange = () => {
  const dispatch = useDispatch();
  const { passwordChangeDone, SearchPW } = useSelector(
    (state) => state.userSign,
  );

  useEffect(() => {
    if (passwordChangeDone) {
      Router.push('/');
    }
  }, [passwordChangeDone]);

  const [pw, onChangePassword, setPassword] = useinput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== pw);
    },
    [pw],
  );

  const passwordChangeSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('mem_pw', pw);
      formData.append('mem_id', SearchPW.id);

      dispatch({
        type: PASSWORD_CHANGE_REQUEST,
        data: formData,
      });
    },
    [pw, SearchPW],
  );

  return (
    <LoginLayout>
      <form className={style.form} onSubmit={passwordChangeSubmit}>
        <input
          name="pw"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          value={pw}
          onChange={onChangePassword}
          // required
        />
        <br />

        <input
          style={{ marginTop: -5 }}
          placeholder="비밀번호를 다시한번 입력해주세요"
          type="password"
          value={passwordCheck}
          onChange={onChangePasswordCheck}
          // required
        />

        {passwordError ? (
          <div style={{ color: 'red' }}>*비밀번호가 일치하지 않습니다</div>
        ) : (
          <div style={{ color: '#409857' }}>*보안100%</div>
        )}

        <button>비밀번호 바꾸기</button>
      </form>
    </LoginLayout>
  );
};

export default PwChange;
