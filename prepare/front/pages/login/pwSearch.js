import React, { useCallback } from 'react';
import Link from 'next/link';

import LoginLayout from '../../components/LoginLayout';
import style from '../../styles/css/loginForm.module.css';
import useInput from '../../hooks/useInput';
import { useDispatch } from 'react-redux';
import { SEARCH_PW_REQUEST } from '../../reducers/user';

const IdSearch = () => {
  const dispatch = useDispatch();

  const [name, onChangeName, setName] = useInput('');
  const [id, onChangeId, setId] = useInput('');

  const onSubmitIdSearch = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: SEARCH_PW_REQUEST,
        data: { mem_id: id, mem_name: name },
      });
    },
    [id, name],
  );
  return (
    <LoginLayout>
      <form className={style.form} onSubmit={onSubmitIdSearch}>
        <input
          name="mem_id"
          placeholder="아이디를 입력해주세요"
          value={id}
          onChange={onChangeId}
          required
        />
        <br />

        <input
          name="mem_name"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={onChangeName}
          required
        />
        <br />

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
      {false ? <div>하이</div> : null}
    </LoginLayout>
  );
};

export default IdSearch;
