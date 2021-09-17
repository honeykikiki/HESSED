import React from 'react';

import style from '../../styles/css/QrCode.module.css';

const QrCode = () => {
  return (
    <>
      <div>
        {/* 
        클릭하면 첫번쨰 true 다른거 클릭하면 false
        두번쨰 참거짓 qr코드가있으면 true 없으면 false
        */}
        {true ? null : false ? (
          <div className={style.qr}>
            <h1>
              <img src="/icon/HESSED_LOGO-B.png" />
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
              <h1>QR코드</h1>
            </div>
          </div>
        ) : (
          <div className={style.qr}>
            <h1>
              <img src="/icon/HESSED_LOGO-B.png" />
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
          </div>
        )}
      </div>
    </>
  );
};

export default QrCode;
