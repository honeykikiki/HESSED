import React from 'react';
import MemberList from './MemberList';

import style from '../../styles/css/memberlist.module.css';
import styles from '../../styles/css/postCard.module.css';

const MemberListBox = () => {
  return (
    <>
      <section className={styles.a}>
        <article className={styles.maxWidth}>
          <div className={style.memberListWrap}>
            <MemberList />
          </div>
        </article>
      </section>
    </>
  );
};

export default MemberListBox;
