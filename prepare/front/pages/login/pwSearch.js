import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import { useDispatch, useSelector } from 'react-redux';
import LoginLayout from '../../components/LoginLayout';
import style from '../../styles/css/loginForm.module.css';
import useInput from '../../hooks/useInput';
import { SEARCH_PW_REQUEST } from '../../reducers/userSign';

const PwSearch = () => {
  const dispatch = useDispatch();
  const { searchPwDone } = useSelector((state) => state.userSign);

  const [name, onChangeName, setName] = useInput('');
  const [id, onChangeId, setId] = useInput('');
  const [phone, onChangePhone, setPhone] = useInput('');

  useEffect(() => {
    if (searchPwDone) {
      Router.push('/login/passwordProcedure/certified');
    }
  }, [searchPwDone]);

  const onSubmitPwSearch = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('mem_id', id);
      formData.append('mem_name', name);
      formData.append('mem_phone', phone);
      dispatch({
        type: SEARCH_PW_REQUEST,
        data: formData,
      });
    },
    [id, name, phone],
  );
  return (
    <LoginLayout>
      <form className={style.form} onSubmit={onSubmitPwSearch}>
        <input
          name="mem_id"
          placeholder="아이디를 입력해주세요"
          value={id}
          onChange={onChangeId}
          type="email"
          required
        />

        <input
          name="mem_name"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={onChangeName}
          type="text"
          required
        />

        <input
          name="mem_phone"
          placeholder="전화번호를 입력해주세요"
          value={phone}
          onChange={onChangePhone}
          type="number"
          required
        />

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
    </LoginLayout>
  );
};

export default PwSearch;
