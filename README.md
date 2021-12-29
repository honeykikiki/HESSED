# HESSED-APP (20210906~)

<!-- 이미지넣기 -->

## 사용기술스택

<span><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white"/></span>
<span><img src="https://img.shields.io/badge/Next.js-1F262C?style=flat&logo=Next.js&logoColor=white"/></span>
<span><img src="https://img.shields.io/badge/Redux-7247B6?style=flat&logo=Redux&logoColor=white"/></span>
<span><img src="https://img.shields.io/badge/Redux-saga-7247B6?style=flat&logo=Redux-saga&logoColor=white"/></span>

<span><img src="https://img.shields.io/badge/Sass-cc6699?style=flat&logo=sass&logoColor=white"/></span><br/>

## 배포 vercel

이미지 넣기

### 시작

> 시작

    npm run build -> npm start

> next 설치

    npm i next
    npm i react react-dom

> eslint prettire 설정

    eslint
    npm i -D eslint
    npm i -D babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-react-hooks eslint-config-prettier eslint-plugin-prettier
    npm i -D eslint-plugin-jsx-a11y

> redux

    npm i next-redux-wrapper
    npm i react-redux
    npm i redux

> > middle wear 미들웨어

    npm i redux-devtools-extension

> > 불변성 지키기

    npm i immer

> redux-saga

    npm i redux-saga
    npm i axios

> axios

    npm i axios

---

# 코딩순서도

1.  로그인 페이지 코딩

    > > 로딩페이지 [o]
    > > 로그인 [o]
    > > 회원가입 [o]
    > > ID찾기 [o]
    > > PW 찾기 [o]

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

3. 상태관리(리덕스, 리덕스-saga)

> 로그인 관련

    1-1. 로그인 (완료)
    2-1. 아이디,비번찾기 (미완)
    3-1. 회원가입 (완료)

> postCard관련

    2-1 이미지 슬라이드 (완료)
    2-2 댓글달기
    2-3 댓글 더보기기능
    2-4 댓글 삭제기능
    2-5 답글 달기기능
    2-6 답글 삭제기능
    2-7 좋아요 (게시물 좋아요 클릭시 좋아요 수 늘어나기) (완료)
    2-8 게시물 저장히기 (완료)
    2-9 좋아요 갯수 클릭시 좋아요 한사람들 표시
    2-10 공유하기 (완료)

> upload 관련

    3-1 사진 업로드 (완료)
    3-2 사진 미리보기 (완료)
    3-3 댓글쓰기 (완료)

> qr코드

> 프로필 관련

    1-1 프로필 게시글  (완료)
    1-2 프로필 수정하기 (닉네임, 이미지) (완료)
    1-3 내가 작성한 게식글 3배열로 보여주기 (완료)
    1-4 내가 저장한 게식글 3배열로 보여주기 (완료)
    1-5 게시글 이미지 클릭시 다이나믹 라우팅으로 게시물 하나씩 보여주기 (완료)

---

# 작업하면서 마주친 문제 및 해결

## scss 문제 및 해결

> 문제 / 해결:

    문제 / scss를 컴파일 후 react에서 작동이 안되는 문제 <br/>
    해결 / 우선 npm i scss를 하고 scss 네이밍에 module.scss를 추가하는 방법으로 해결했다
    참고  https://medium.com/sebride/next-js-with-module-sass-a8fe3976147

>

## 리엑트 이미지 등록안되는 문제 및 해결

> 문제 / 해결:

    문제 / 이미지가 경로를 입력해도 이미지가 뜨지앟는 문제
    해결 /
    이미지 경로를 절대경로로 이용해서 해결햐였다
    ex) src='/public/icon/ooo.svg'
    ex) src='/icon/ooo.svg'

>

## 메뉴탭 토글 버튼 문제

> 문제 / 해결:

    문제 : 1번쨰 메뉴탭은 한번 실핼 2번쨰 메뉴탭을 누르면 1번 2번 탭이 같이 실행되는 문제

    해결 : 페이지가 리로딩 되서 생기는 문제이다 리덕스를 이용해 데이터를 관리하기로했다

## 이미지 박스 2차원배열

> 문제 / 해결:

    문제 : react에서 데이터 가져와 2차원 배열 만들기 for문 사용 안됨
    해결 :

```js
{
  a.map((v, i) => {
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
  });
}
```

# postCard 부분

## form태그 리로딩 현상

> 문제 / 해결:

    문제 : form태그에 e.preventDefault() submit 할떄 리로딩 되어 데이터가 사라진다
    해결 : saga연결이 되어있지 않아 success로 넘어가지않고 리로딩 되었다.

## 댓글 더보기기능

> 문제 / 해결:

    문제 : 댓글에 더보기 기능 추가하기
    해결 : slice 를 이용해 해결하엿다

## 댓글창 크기 자동조절

> 문제 / 해결:

    문제 : 댓글을 작성할떄 크기를 자동조절하기
    해결 :

```js
const ref = useRef();
const handleResizeHeight = useCallback(() => {
  if (ref === null || ref.current === null) {
    return;
  }
  ref.current.style.height = "20px";
  ref.current.style.height = ref.current.scrollHeight + "px";
}, []);
```

## 댓글에 답글달기

> 문제 / 해결:

    문제 : 댓글의 답글달기
    해결 :
        1. 댓글단 게시물찾기
        2. 게시물에 댓글찾기
        3. 찾은 댓글 안에 답글 넣기

```js
const post = draft.mainPosts.find((v) => v.id === action.data.postId);
post.Comments.find((v) => v.User.id === action.data.userId).Comments.push(action.data);
```

## 답글보기 기능 클릭시 모든댓글의 답글이 다같이 보여진다

> 문제 / 해결:

    문제 : 답글보기 기능 클릭시 모든댓글의 답글이 다같이 보여진다
    해결 : 반복문 안에서 같은 스테이스를 가지고있어서 컴포넌트를 분리해 따로 스테이스를 관리하게되었다

## 댓글 삭제하기

> 문제 / 해결:

    문제 :
    게시물 삭제는 게시물 아이디만 가지고 삭제가 되었는데
    댓글은 몇번쨰 게시물의 몇번쨰 댓글인지를 알아야 한다.

    해결 :
        1.  댓글 고유의 아이디값을 넣어주기
        2.  몇번쨰 게시물 찾기
        3.  찾은 게시물에 댓글중 내가 지울 댓글 찾기(지정해주 아이디값과 삭제를 클릭했을떄      아이디값을 가지고왔다)
        4. 찾은 게시물의 댓글 삭제하기

# upLoad 부분

## input 숨기고 다른 이미지 클릭해서 업로드하기

> 문제 / 해결:

    문제 : React에서 사진 업로드하기
    해결 :
        1. useRef를 이용해 input에 접근하고 input에는 hidden값을 넣어준다

```js
const onClickImageUpload = useCallback(() => {
  imageInput.current.click();
}, [imageInput.current]);
```

        2. input에 대채할 이미지에 클릭값을 넣어준다
        3. 이제 파일 선택창이 뜨고 이미지를 넣어주면 된다

## 사진 미리보기

> 문제 / 해결:

    문제 : 업로드한 이미지 정보 받아와서 사진 미리보기 해주기
    해결 :
        1. 업로드한 사진의 정보를 반복문을 통해서 id, file, url을 객체 따로 만들어준다
        2. 객체로 만든 정보들을 photoToAddList에 넣어준다
        3. 이후 사진을 추가하면 앞에 쌓이는 식으로 만들어 주었다
        참고
        src =https://velog.io/@chloeelog/React-%EC%82%AC%EC%A7%84-%EC%97%85%EB%A1%9C%EB%8D%94-%EB%A7%8C%EB%93%A4%EA%B8%B0-1#4-%EC%82%AD%EC%A0%9C%ED%95%98%EA%B8%B0-%EB%B2%84%ED%8A%BC-%EA%B5%AC%ED%98%84

```js
const handleImage = useCallback(
  (e) => {
    const temp = [];
    const photoToAdd = e.target.files;
    for (let i = 0; i < photoToAdd.length; i++) {
      temp.push({
        id: photoToAdd[i].name,
        file: photoToAdd[i],
        url: URL.createObjectURL(photoToAdd[i]),
      });
    }
    setPhotoToAddList(temp.concat(photoToAddList));
  },
  [photoToAddList]
);
```

## 팝업창이 나올떄 스크롤 금지

> 문제 / 해결:

    문제 : 팝업창이 뜰떄 스크롤이 움직이느 현상
    해결 :
        1.body 태그의 css를 변경합니다. position을 fixed로 하고, top의 위치를 현재 스크롤   위치로 설정한 뒤 overflow-y: scroll; width: 100%; 을 추가 지정하면 스크롤바로 인해 배경의 위치가 움직이지 않고도 스크롤 방지를 할 수 있습니다.

        2. useEffect를 사용해 css를 변경하며, 모달이 사라질 때에는 useEffect의 return을 사용해 body의 cssText를 리셋시킨 다음 window,scroll을 이용해 현재 스크롤 위치로 강제 이동시킵니다. 참고로 useEffect의 return 절은 컴포넌트가 unmount 될 때 호출됩니다.
        3.http://yoonbumtae.com/?p=3776

```js
useEffect(() => {
    if (!qrCode) {
        document.body.style.cssText = ` position: fixed; top: -${window.    scrollY}    px;     overflow-y: scroll; width: 100%;`;
            return () => {
                const scrollY = document.body.style.top;
                document.body.style.cssText = '';
                window.scrollTo(0, parseInt(scrollY || '0', 10) \* -1);
            };
    }
);
```

## checkBox 박스 클릭시 체크박스 클릭되기

    문제 : 체크박스 주변 클릭시에도 클릭박스 반응하기
    해결 : ref러 dom 직접적으로 가져와 값주기

```js
const checkInput = useRef();
if (checkInput.current.checked === true) {
  checkInput.current.checked = false;
} else {
  checkInput.current.checked = true;
}
```

## 백엔드 서버로 file데어터 보내기 오류

> 문제 / 해결:

    문제 : 백엔드서버로 file데이터를 보내는데 데이터가 들어가지앟는다
    해결 : 데이터를 폼데이터에 담아서 보내지 않아 데이터가 전송되지않았다. 파일이 안들어간 이유는 파일 객채로 들어가서 파일이 넘어가지 않았다 그래서 반복문으로 파일 객체를 파일만 보내는 방법으로 해결하였다.

# 리펙토링

## 앱을 만드는 작업을 하는중 리펙토링에 중요성에 대해 알게되었다. <br/> (메이커준의 강의를 본후) 래팩토링 흔적 남기기

1. 회원가입에 많은 if문 form 안에서 하던것 함수로 따로 뺴기
2. 회원가입떄 alert창으로 띄우건 화면을 작성되지 않은 회원가입정보 하단에 뜨게 만들었다.

## 비동기 API통신 함수 반복되는 코드가 많아 코드 중보 제거 해주기

1. POST,GET,DELETE 별로 함수 만들어주기
2. 함수에 data, url 인자로 넘겨주기
3. 결과 받기

# 배포하면서 만나는 문제

{
Failed to compile.
ModuleNotFoundError: Module not found: Error: Can't resolve '../hooks/useInput' in '/vercel/path0/prepare/front/pages'

    > Build error occurred
    > Error: > Build failed because of webpack errors

    at /vercel/path0/prepare/front/node_modules/next/dist/build/index.js:397:19
    at runMicrotasks (<anonymous>)
    at processTicksAndRejections (internal/process/task_queues.js:95:5)
    at async Span.traceAsyncFn (/vercel/path0/prepare/front/node_modules/next/dist/telemetry/trace/trace.js:60:20)
    at async Object.build [as default] (/vercel/path0/prepare/front/node_modules/next/dist/build/index.js:77:25)

    Error: Command "npm run build" exited with 1

}

> > 이 에러로 웹팩 에러인줄알고 찾다가 useInput 에서 useinput로 바꾸니까 해결되었다.

## https => http 통신 가능하게

> Mixed Content 에러 => 메타태그로 해결가능
> 백엔드 서버 https로 SSL추가 설정

```html
<meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
```

## 아이폰 유저들 사진은 .heic로 저장되어 사용 못하는 문제

> 문제 / 해결:

    문제 : 아이폰 유저들 사진은 .heic로 저장되어 사용 못하는 문제
    해결 : 아이폰 유저들 사진을 업로드할꺠 .jpg로 바꿔주는 라이브러리를 이용해
    해결하였다
    npm i heic2any

```js
import heic2any from "heic2any";
let temp = [];
const imageUpload = async (e) => {
  const photoToAdd = e.target.files;
  await heic2any({
    blob: file,
    toType: "image/jpeg",
  })
    .then((result) => {
      const file = new File([result], `${photoToAdd[i].name.split(".")[0]}.jpg`, {
        type: "image/jpeg",
        lastModified: new Date().getTime(),
      });
      temp.push({
        id: file.name,
        url: URL.createObjectURL(file),
        file,
      });
    })
    .catch((error) => console.error(error));
};
```

## heic2any Build할떄 "ReferenceError: Blob is not defined" 오류

> 문제 / 해결:

    문제 : heic2any 빌들할떄 "ReferenceError: Blob is not defined" 오류 빌드가 되지않음
    해결 : import로 불러와 blob를 찾지 못하여서 함수 내부에 바로 불러주기로했다.

```js
const temp = [];
const imageUpload = async (e) => {
  const photoToAdd = e.target.files;
  for (let i = 0; i < photoToAdd.length; i++) {
    if (photoToAdd[i].name.split(".")[1] === "HEIC") {
      const heic2any = require("heic2any");
      await heic2any({
        blob: photoToAdd[i],
        toType: "image/jpeg",
      })
        .then((result) => {
          const file = new File([result], `${photoToAdd[i].name.split(".")[0]}.jpg`, {
            type: "image/jpeg",
            lastModified: new Date().getTime(),
          });
          temp.push({
            id: file.name,
            file,
            url: URL.createObjectURL(file),
          });
        })
        .catch((error) => console.error(error));
    }
  }
};
```

## 이미지 파일 크기 조절

> 문제 / 해결:

    문제 : 이미지 크기가 3000px이상일떄 이미지 힙메모리 부족으로 업로드가 안되는 현상
    해결 : npm i browser-image-compression 라이브러리 이용하여 이미지 사이즈 조절
    <a href='https://github.com/Donaldcwl/browser-image-compression>browser-image-compression</a>

```js
import imageCompression from "browser-image-compression";

const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

export const imageUpdate = async (e) => {
  const photoToAdd = e.target.files[0];
  const compressedFile = await imageCompression(photoToAdd, options);
};
```

## 이미지 터치 슬라이드로 넘기기 기능 추가

> 기능추가:

    문제 : 이미지 넘기기 기능 추가하기
    기능 : 처음 터치한 위치에서 손을 떗을떄 위치를 뺴면 -일떄 왼쪽으로 + 일떄 오른쪽으로 슬라이드 되게 만든다

```js
let startX;
let endX;
const [curPos, setCurPos] = useState(0);

const Prev = useCallback(() => {
  if (curPos > 0) {
    if (imageCuurrentNo > 0) {
      setImageCuurrentNo((prev) => prev - 1);
      setCurPos((prev) => prev - 1);
    }
  }
}, [imageCuurrentNo]);

const Next = useCallback(() => {
  if (curPos < 10) {
    if (imageCuurrentNo < images.length - 1) {
      setImageCuurrentNo((prev) => prev + 1);
      setCurPos((prev) => prev + 1);
    }
  }
}, [imageCuurrentNo]);

const touchStart = (event) => {
  startX = event.touches[0].pageX;
};

const touchEnd = (event) => {
  endX = event.changedTouches[0].pageX;
  if (startX === endX || Math.abs(startX - endX) < 30 || Math.abs(endX - startX) < 30) {
    return;
  }
  if (startX > endX) {
    Next();
  } else {
    Prev();
  }
};
```

## 텍스트 엔터버튼 클릭시 줄바끔 적용 안되는 현상

> 기능추가:

    문제 : 텍스트를 작성할떄 줄바꿈을 해도 텍스트가 줄바꿈이 되지않고 나오는 현상
    기능 : 정규표현식을 활용해 엔터를 치면 추가로 \n이 적히게 만든다 그 이후 .split 와 .mpa 메소드롤 통해 <br/> 태그를 입혀준다

> 텍스트를 입력받을때

```js
const onChangeContent = useCallback((e) => {
  setContent(e.target.value.replace(/(?:\r\n|\r|\n)/g, "\n"));
}, []);
```

> 텍스트를 화면에 출력할떄

```js
{
  post.content.split("\n").map((v) => {
    return (
      <span key={v}>
        {v}
        <br />
      </span>
    );
  });
}
```
