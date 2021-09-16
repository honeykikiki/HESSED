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

# 작업하면서 마주친 오류 및 해결

## scss 오류 및 해결

{

> 오류 / 해결:

    오류 / scss를 컴파일 후 react에서 작동이 안되는 오류 <br/>
    해결 / 우선 npm i scss를 하고 scss 네이밍에 module.scss를 추가하는 방법으로 해결했다
    참고 = https://medium.com/sebride/next-js-with-module-sass-a8fe3976147

> }

## 리엑트 이미지 등록안되는 오류 및 해결

{

> 오류 / 해결:

    오류 / 이미지가 경로를 입력해도 이미지가 뜨지앟는 오류
    해결 /
    이미지 경로를 절대경로로 이용해서 해결햐였다
    ex) src='/public/icon/ooo.svg'
    ex) src='/icon/ooo.svg'

> }

## 이미지 슬라이드
