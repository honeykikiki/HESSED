import React, { useCallback } from 'react';
import Link from 'next/link';

import LoginLayout from '../../components/LoginLayout';
import style from '../../styles/css/loginForm.module.css';
import useInput from '../../hooks/useInput';
import { useDispatch } from 'react-redux';
import { SEARCH_ID_REQUEST } from '../../reducers/user';

const IdSearch = () => {
  const dispatch = useDispatch();

  const [id, onChangeId, setId] = useInput('');
  const [phone, onChangePhone, set] = useInput('');

  const onSubmitIdSearch = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('mem_id', id);
      formData.append('mem_phone', phone);
      dispatch({
        type: SEARCH_ID_REQUEST,
        data: formData,
      });
    },
    [id, phone],
  );

  return (
    <LoginLayout>
      <form className={style.form} onSubmit={onSubmitIdSearch}>
        <input
          name="mem_id"
          placeholder="아이디를 입력해주세요"
          value={id}
          onChange={onChangeId}
          type="email"
          required
        />
        <br />

        <input
          name="mem_phone"
          placeholder="전화번호를 입력해주세요"
          value={phone}
          onChange={onChangePhone}
          type="number"
          required
        />
        <br />

        <button>아이디 찾기</button>
      </form>

      <div className={style.div}>
        <Link href="/login/pwSearch">
          <a>
            <button style={{ marginTop: 20 }}>비밀번호 찾기</button>
          </a>
        </Link>
      </div>
    </LoginLayout>
  );
};

export default IdSearch;
