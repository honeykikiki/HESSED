import React from 'react';

import style from '../../styles/css/loading.module.css';

const loading = () => {
  return (
    <>
      <div className={style.loading}>
        <img src="/icon/loading.png" alt="loadingIcon" />
      </div>
    </>
  );
};

export default loading;
