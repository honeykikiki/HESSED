import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import LoginLayout from '../../../components/LoginLayout';
import useinput from '../../../hooks/useinput';
import style from '../../../styles/css/loginForm.module.css';
import { CERIFIED_REQUEST } from '../../../reducers/userSign';

const Certified = () => {
  const dispatch = useDispatch();
  const { cerifiedDone, SearchPW } = useSelector((state) => state.userSign);

  const [certified, onChangeCertified, setCertified] = useinput('');

  useEffect(() => {
    if (cerifiedDone) {
      Router.push('/login/passwordProcedure/pwChange');
    }
    if (!SearchPW) {
      Router.push('/');
    }
  }, [cerifiedDone, SearchPW]);

  const certifiedSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('pa_number', certified);
      formData.append('mem_id', SearchPW.id);

      dispatch({
        type: CERIFIED_REQUEST,
        data: formData,
      });
    },
    [certified, SearchPW],
  );

  return (
    <LoginLayout>
      <form className={style.form} onSubmit={certifiedSubmit}>
        <input
          name="pa_number"
          placeholder="인증번호를 입력해주세요"
          value={certified}
          onChange={onChangeCertified}
          required
        />
        <div className={style.signupCheck}>
          아이디로 보내드린 인증번호를 입력해 주세요.
        </div>

        <button>인증번호 확인</button>
      </form>
    </LoginLayout>
  );
};

export default Certified;
