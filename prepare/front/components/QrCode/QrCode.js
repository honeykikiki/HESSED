import React, { useCallback, useState, useEffect } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import style from '../../styles/css/QrCode.module.css';
import { POST_CARD } from '../../reducers/menu';

const QrCode = () => {
  const dispatch = useDispatch();
  const { qrCode } = useSelector((state) => state.menu);

  const onClose = useCallback(() => {
    dispatch({
      type: POST_CARD,
    });
  }, []);

  useEffect(() => {
    if (!qrCode) {
      document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      };
    }
  }, [qrCode]);

  return (
    <>
      {/* 
        클릭하면 첫번쨰 true 다른거 클릭하면 false
        두번쨰 참거짓 qr코드가있으면 true 없으면 false
        */}
      {qrCode ? null : true ? (
        <div className={style.wrap} onClick={onClose}>
          <div className={style.qr}>
            <h1>
              <img src="/icon/HESSED-logo-G.svg" alt="LogoImg" />
              <p>입장을 위한 QR코드</p>
            </h1>
            <div className={style.qr_text}>
              <p>이용하려는 시설에 QR코드로 체크인하거나 </p>
              <p>명부에 전화번호대신안심번호를 기재하세요.</p>
            </div>
            <div className={style.IndividualNumber}>
              <p>개인안심번호</p>
              <p>21호83라</p>
            </div>
            <div className={style.QrCode}>
              <div>
                <img src="/icon/QR-B.svg" alt="qrIcon" />
              </div>
            </div>
            <div className={style.close} onClick={onClose}>
              close
            </div>
          </div>
        </div>
      ) : (
        <div className={style.wrap} onClick={onClose}>
          <div className={style.qr}>
            <h1>
              <img src="/icon/HESSED-logo-G.svg" alt="LogoImg" />
              <p>입장을 위한 QR코드</p>
            </h1>
            <div className={style.qr_text}>
              <p>이용하려는 시설에 QR코드로 체크인하거나 </p>
              <p>명부에 전화번호대신안심번호를 기재하세요.</p>
            </div>

            <form className={style.IndividualNumber}>
              <input
                name="cell"
                type="number"
                placeholder="ex)000-0000-0000"
                required
              />
              <button>인증하기</button>
            </form>
            <div className={style.close} onClick={onClose}>
              close
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QrCode;
