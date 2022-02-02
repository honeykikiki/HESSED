import React, { useCallback, useState } from 'react';
import { timeCalculator } from '../../hooks/timer/timeCalculator';

import style from '../../styles/css/notice.module.css';

const NoticeContent = ({ content }) => {
  const [moreButtonOnClick, setMoreButtonOnClick] = useState(true);

  const contentMore = useCallback(() => {
    setMoreButtonOnClick((prev) => !prev);
  }, [moreButtonOnClick]);

  return (
    <>
      <div className={style.content}>
        <div className={style.test}>
          <div className={style.userIcon}>
            <img src="/icon/profileBasic.svg" alt="profileImg" width="24px" />

            <div className={style.noticeInfoTop}>
              <div className={style.noticeWrite}>공지사항</div>
              <div className={style.time}>{timeCalculator(content)}</div>
            </div>
          </div>

          <div className={style.title}>
            <span>{content.title}</span>
            {moreButtonOnClick ? (
              <button onClick={contentMore}>&nbsp; 내용 자세히보기</button>
            ) : null}
          </div>
        </div>

        {moreButtonOnClick ? null : (
          <div className={style.comment}>
            {content.content.split('\n').map((v) => {
              return (
                <span key={v}>
                  {v}
                  <br />
                </span>
              );
            })}
          </div>
        )}

        {moreButtonOnClick ? null : (
          <button onClick={contentMore} style={{ marginLeft: '44px' }}>
            간략하게 보기
          </button>
        )}
      </div>
    </>
  );
};

export default NoticeContent;
