import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import LoginLayout from '../../../components/LoginLayout';
import useInput from '../../../hooks/useInput';
import style from '../../../styles/css/loginForm.module.css';
import { CERIFIED_REQUEST } from '../../../reducers/user';

const Certified = () => {
  const dispatch = useDispatch();
  const { searchPwDone } = useSelector((state) => state.user);

  useEffect(() => {
    if (!searchPwDone) {
      Router.push('/login/passwordProcedure/pwChange');
    }
  }, [searchPwDone]);

  const [certified, onChangeCertified, setCertified] = useInput('');

  const certifiedSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('인증', certified);
      dispatch({
        type: CERIFIED_REQUEST,
        dsta: formData,
      });
    },
    [certified],
  );

  return (
    <LoginLayout>
      <form className={style.form} onSubmit={certifiedSubmit}>
        <input
          name="certified"
          placeholder="인증번호를 입력해주세요"
          value={certified}
          onChange={onChangeCertified}
          required
        />
        <br />

        <button>인증번호 확인</button>
      </form>
    </LoginLayout>
  );
};

export default Certified;
