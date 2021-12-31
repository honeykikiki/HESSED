/* eslint-disable import/prefer-default-export */

export const timeCalculator = (postDate) => {
  const newDate = new Date();
  const newHours = newDate.getHours();
  const newDay = newDate.getDate();
  const newMinutes = newDate.getMinutes();

  const createAt = postDate.date.split(' ').slice(0, 1);
  const date = createAt[0].split('-');
  const Year = date[0];
  const Month = date[1];
  const Day = date[2];

  const createAtTime = postDate.date.split(' ').slice(1, 2);
  const time = createAtTime[0].split(':');
  const hour = Number(time[0]);
  const minutes = Number(time[1]);

  return newDay !== Number(Day) ? (
    // 게시물 올린 날이 같은 날이면 시간을 보여주고 다른 날짜면 게시 날짜를 보여준다
    <p>{`20${Year}년 ${Month}월 ${Day}일`}</p>
  ) : newHours - hour <= 1 ? (
    // 게시물이 올린지 1시간이 넘어가면 시간단위로 보여주고 아니면 분으로 보여준다
    newHours + newMinutes > hour + minutes ? (
      // 올린시간 1시59분 지금시간 2시 1분 이라 가정할떄 60 < 3 false
      newHours === hour ? (
        <p>{`${newMinutes - minutes}분 전`}</p>
      ) : (
        <p>{`${newHours - hour}시간 전`}</p>
      )
    ) : newMinutes >= minutes ? (
      // 게시물 올린시간보다 지금시간이 작으면 올린시간 - 지금시간 아니면 60 - 올린시간  + 지금시간
      newMinutes - minutes === 0 ? (
        <p>방금 전</p>
      ) : (
        <p>{`${newMinutes - minutes}분 전`}</p>
      )
    ) : (
      <p>{`${60 - minutes + newMinutes}분 전`}</p>
    )
  ) : (
    <p>{`${newHours - hour}시간 전`}</p>
  );
};
