import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import style from '../../styles/css/memberlist.module.css';
import { baseURL } from '../../config/config';

let startX;
let endX;

const MemberList = () => {
  const { memberList } = useSelector((state) => state.postMainAction);
  const [curPos, setCurPos] = useState(0);
  const [windowScreenWidth, setWindowScreenWidth] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowScreenWidth(window.screen.width);
    }
  }, [window]);

  const touchStart = useCallback((event) => {
    startX = event.touches[0].pageX;
  }, []);

  console.log();

  const touchEnd = useCallback(
    (event) => {
      endX = event.changedTouches[0].pageX;

      if (curPos + Math.floor(startX - endX) < 0) {
        setCurPos(0);
        return;
      }

      if (
        curPos + Math.floor(startX - endX) >
        memberList.length * 80 - windowScreenWidth
      ) {
        if (windowScreenWidth > 968) {
          console.log('여기1');
          setCurPos((memberList.length + 1) * 80 - windowScreenWidth);
          return;
        }
        setCurPos(memberList.length * 80 - windowScreenWidth);
        return;
      }

      setCurPos((prev) => prev + Math.floor(startX - endX));
    },
    [curPos, windowScreenWidth],
  );
  const onClickRight = useCallback(() => {
    if (curPos > memberList.length * 80 - 935) {
      setCurPos(memberList.length * 80 - 935);
      return;
    }
    setCurPos((prev) => prev + 240);
  }, [curPos]);

  const onClickLeft = useCallback(() => {
    if (curPos < 239) {
      setCurPos(0);
      return;
    }
    setCurPos((prev) => prev - 240);
  }, [curPos]);

  return (
    <>
      <div className={style.memberlistInnerBox}>
        <p className={style.hessedMemberNumber}>
          HESSED FAMILY {memberList.length}명
        </p>

        <ul
          className={style.memberlist}
          style={{
            left: `-${curPos}px`,
          }}
          onTouchStart={touchStart}
          onTouchEnd={touchEnd}
        >
          {memberList.map((v) => {
            return (
              <li key={v.memberListId}>
                <Link href={`/user/${v.memberListId}`}>
                  <a>
                    <div className={style.memberListImg}>
                      <img
                        src={`${baseURL}${v.memberListprofileImg}`}
                        // src={`${v.memberListprofileImg}`}
                        alt="memberImg"
                      />
                    </div>
                  </a>
                </Link>
                <p>{v.memberListNickname + 1}</p>
              </li>
            );
          })}
        </ul>

        {windowScreenWidth < 1025 ? null : (
          <div>
            {curPos < memberList.length * 80 - 935 && (
              <div className={style.right} onClick={onClickRight}>
                <img src="/icon/right.png" alt="RightIcon" />
              </div>
            )}

            {curPos > 240 && (
              <div className={style.left} onClick={onClickLeft}>
                <img src="/icon/left.png" alt="LeftIcon" />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default MemberList;
