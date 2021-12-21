import React from 'react';

import style from '../../styles/css/loading.module.css';

const Loading = () => {
  return (
    <>
      <div className={style.loading}>
        <img src="/icon/loading.png" alt="loadingIcon" />
      </div>
    </>
  );
};

export default Loading;
