function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `서버에서 오류 ${statusCode} 오류가 발생했습니다. 고객센터로 문의 부턱드립니다.`
        : '클라이언트에서 오류가 발생했습니다. 뒤로가기를 눌러주세요!'}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
