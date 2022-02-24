import React from 'react';
import MemberList from './MemberList';

import style from '../../styles/css/memberlist.module.css';
import styles from '../../styles/css/postCard.module.css';

const MemberListBox = () => {
  return (
    <>
      <article className={styles.a}>
        <section className={styles.maxWidth}>
          <div className={style.memberListWrap}>
            <MemberList />
          </div>
        </section>
      </article>
    </>
  );
};

export default MemberListBox;
