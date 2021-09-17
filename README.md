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

---

# 코딩순서도

1.  로그인 페이지 코딩

    > > 로딩페이지
    > > 로그인, 회원가입, ID / PW 찾기

2.  메인 화면

    > 홈 :

        카드 형식으로 만듬
        이미지 첨부

        들어가는 기능
        1. 좋아요
        2. 댓글
        3. 공유
        4. 저장
        5. 수정
        6. 삭제
        7.

> 이미지업로드

> 이미지

    1. 게시
    2. 이미지 업로드 및 삭제
    3. 텍스트
    4.

> QRcode (팝업)

    1. 팝업형식으로 제작
    2. QR코드 생성 전 페이지
        2-1 전화번호 입력
    3. QR코드 생성 후 페이지
        3-1 qr코드 받아오기
        3-2 개인안심번호 받아오기

> 프로필

---

# 작업하면서 마주친 문제 및 해결

## scss 문제 및 해결

{

> 문제 / 해결:

    문제 / scss를 컴파일 후 react에서 작동이 안되는 문제 <br/>
    해결 / 우선 npm i scss를 하고 scss 네이밍에 module.scss를 추가하는 방법으로 해결했다
    참고 = https://medium.com/sebride/next-js-with-module-sass-a8fe3976147

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

## 이미지 업로드

{

> 문제 / 해결:

    문제 : 이미지 업로드를 하기위해 input 설정 방법 이해하기

}
