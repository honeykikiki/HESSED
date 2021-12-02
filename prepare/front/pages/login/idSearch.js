import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';

import LoginLayout from '../../components/LoginLayout';
import style from '../../styles/css/loginForm.module.css';
import useInput from '../../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCHID_DELITE, SEARCH_ID_REQUEST } from '../../reducers/user';
import Router from 'next/router';

const IdSearch = () => {
  const dispatch = useDispatch();
  const { searchIdDone, SearchID, searchIdFailed } = useSelector(
    (state) => state.user,
  );

  const [id, onChangeId, setId] = useInput('');
  const [phone, onChangePhone, set] = useInput('');

  const onSubmitIdSearch = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('mem_name', id);
      formData.append('mem_phone', phone);
      dispatch({
        type: SEARCH_ID_REQUEST,
        data: formData,
      });
    },
    [id, phone],
  );

  const idConfirm = useCallback(() => {
    dispatch({
      type: SEARCHID_DELITE,
    });
    Router.push('/');
  }, []);

  return (
    <LoginLayout>
      <form className={style.form} onSubmit={onSubmitIdSearch}>
        <input
          name="mem_id"
          placeholder="이름을 입력해주세요"
          value={id}
          onChange={onChangeId}
          type="text"
        />

        {searchIdFailed ? null : id ? null : (
          <div className={style.signupCheck}>{`이름을 입력해주세요.`}</div>
        )}

        <input
          name="mem_phone"
          placeholder="전화번호를 입력해주세요"
          value={phone}
          onChange={onChangePhone}
          type="number"
        />
        {searchIdFailed ? null : phone ? null : (
          <div className={style.signupCheck}>{`전화번호를 입력해주세요.`}</div>
        )}

        <button>아이디 찾기</button>
      </form>

      <div className={style.div}>
        <Link href="/login/pwSearch">
          <a>
            <button style={{ marginTop: 20 }}>비밀번호 찾기</button>
          </a>
        </Link>
      </div>

      {SearchID ? (
        <div className={style.searchId}>
          <div>
            <p>
              아이디는 <span>"{SearchID}"</span> 입니다
            </p>
            <button onClick={idConfirm}>확인</button>
          </div>
        </div>
      ) : null}
    </LoginLayout>
  );
};

export default IdSearch;
