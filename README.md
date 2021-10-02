# HESSED-APP (20210906~)

## 9월6일 ~ 9월7일 로그인 페이지 디자인작업

> Xd를 이용해 디자인 작업 진행

## next를 이용해 ssr웹앱을 만든다

### 시작

> next 설치

    npm i next
    npm i react react-dom

> eslint prettire 설정

    eslint
    npm i -D eslint
    npm i -D babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-react-hooks eslint-config-prettier eslint-plugin-prettier
    접근성
    npm i -D eslint-plugin-jsx-a11y

> redux

    npm i next-redux-wrapper
    npm i react-redux
    npm i redux

    middle wear 미들웨어
    npm i redux-devtools-extension

    불변성 지키기
    npm i immer

> redux-saga

    npm i redux-saga
    npm i axios

---

# 코딩순서도

1.  로그인 페이지 코딩

    > > 로딩페이지
    > > 로그인, 회원가입, ID / PW 찾기

2.  메인 화면

        카드 형식으로 만듬
        이미지 첨부

        들어가는 기능
        1. 좋아요 및 취소
        2. 댓글 및 삭제
            >2-1 댓글 더보기 기능
            >2-2 댓글의 답글 기능
        3. 공유
        4. 저장 및 취소
        5. 수정
        6. 삭제
        7. 이미지 슬라이드
        8. 해시태그

> 이미지업로드

        1. 이미지 업로드
        2. 업로드 이미지 확인 및 삭제
        3. 업로드 글 쓰기
        4. 이미지 좌우 슬리아드

> QRcode (팝업)

    1. 팝업형식으로 제작
    2. QR코드 생성 전 페이지
        2-1 전화번호 입력
    3. QR코드 생성 후 페이지
        3-1 qr코드 받아오기
        3-2 개인안심번호 받아오기

> 프로필

    1. 프로필 이미지 닉네임
    2. 게시물 팔로우 팔로잉 수
    3. 프로필 수정
    4. 게시물 보여주기
    5. 팔로우, 팔로잉 확인하기

3. 상태관리(리덕스, 리덕스-saga)
   글로벌 데이터 및 비동기 관리

> 로그인 관련
> 1-1. 로그인 (완료)
> 1-2. 아이디,비번찾기 (미완)
> 1-3. 회원가입 (완료)

> postCard관련
> 2-1 이미지 슬라이드 (완료)
> 2-2 좋아요 (게시물 좋아요 클릭시 좋아요 수 늘어나기)
> 2-3 게시물 저장히기
> 2-4 댓글달기 (완료)
> 2-5 댓글 더보기기능 (페이지 하나더 만들기)

> upload 관련

---

# 작업하면서 마주친 문제 및 해결

## scss 문제 및 해결

[{

> 문제 / 해결:

    문제 / scss를 컴파일 후 react에서 작동이 안되는 문제 <br/>
    해결 / 우선 npm i scss를 하고 scss 네이밍에 module.scss를 추가하는 방법으로 해결했다
    참고  https://medium.com/sebride/next-js-with-module-sass-a8fe3976147

> }

## 리엑트 이미지 등록안되는 문제 및 해결

{

> 문제 / 해결:

    문제 / 이미지가 경로를 입력해도 이미지가 뜨지앟는 문제
    해결 /
    이미지 경로를 절대경로로 이용해서 해결햐였다
    ex) src='/public/icon/ooo.svg'
    ex) src='/icon/ooo.svg'

> }

## 이미지 슬라이드

## 메뉴탭 토글 버튼 문제

{

> 문제 / 해결:

    문제 : 1번쨰 메뉴탭은 한번 실핼 2번쨰 메뉴탭을 누르면 1번 2번 탭이 같이 실행되는 문제

    해결 : 페이지가 리로딩 되서 생기는 문제이다 리덕스를 이용해 데이터를 관리하기로했다

}

<!-- ## 이미지 업로드

{

> 문제 / 해결:

    문제 : 이미지 업로드를 하기위해 input 설정 방법 이해하기

} -->

## 이미지 박스 2차원배열

{

> 문제 / 해결:

    문제 : react에서 데이터 가져와 2차원 배열 만들기 for문 사용 안됨
    해결 :  {a.map((v, i) => {
              if (i % 3 === 0) {
                // i = 0 3 6 9
                return (
                  <ul className={style.upLoadImage}>
                    <li>{<img src={`${a[i + 0]}`} />}</li>
                    {a[i + 1] && <li>{<img src={`${a[i + 1]}`} />}</li>}
                    {a[i + 2] && <li>{<img src={`${a[i + 2]}`} />}</li>}
                  </ul>
                );
              }
            })}

}]

## form태그 리로딩 현상

{

> 문제 / 해결:

    문제 : form태그에 e.preventDefault() submit 할떄 리로딩 되어 데이터가 사라진다
    해결 : saga연결이 되어있지 않아 success로 넘어가지않고 리로딩 되었다.

}

## 댓글 더보기기능

{

> 문제 / 해결:

    문제 : 댓글에 더보기 기능 추가하기
    해결 : slice 를 이용해 해결하엿다

}

## 댓글창 크기 자동조절

{

> 문제 / 해결:

    문제 : 댓글을 작성할떄 크기를 자동조절하기
    해결 :
        >const ref = useRef();
        >const handleResizeHeight = useCallback(() => {
        >  if (ref === null || ref.current === null) {
        >    return;
        >  }
        >  ref.current.style.height = '20px';
        >  ref.current.style.height = ref.current.scrollHeight + 'px';
        >}, []);

}

## 댓글에 답글달기

{

> 문제 / 해결:

    문제 : 댓글의 답글달기
    해결 :
        1. 댓글단 게시물찾기
        2. 게시물에 댓글찾기
        3. 찾은 댓글 안에 답글 넣기
        > const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        >post.Comments.find(
        >  (v) => v.User.id === action.data.userId,
        >).Comments.push(action.data);

}

## 답글보기 기능 클릭시 모든댓글의 답글이 다같이 보여진다

{

> 문제 / 해결:

    문제 : 답글보기 기능 클릭시 모든댓글의 답글이 다같이 보여진다
    해결 : 반복문 안에서 같은 스테이스를 가지고있어서 컴포넌트를 분리해 따로 스테이스를 관리하게되었다

}

## 터치 이벤트

{

> 문제 / 해결:

    문제 : 일정시간 이상 터치시에 팝업창이 뜨게하기
    해결 :

}

## 댓글 삭제하기

{

> 문제 / 해결:

    문제 :
    게시물 삭제는 게시물 아이디만 가지고 삭제가 되었는데
    댓글은 몇번쨰 게시물의 몇번쨰 댓글인지를 알아야 한다.

    해결 :
        1. 게시물 찾기
        2. 게시물 몇번쨰인지 찾기
        3. 게시물에서 댓글 찾기
        4. 게시물에서 삭제한 댓글이 몇번쨰 댓글인지 찾기
        5. 게시물안에 댓글 중 찾아서 댓글 삭제하기

}
