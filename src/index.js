//[[[컴포넌트설명]]]
//index.js 현파일에서 스토어를 만든다
//provider 컴포넌트를 사용하여 리덕스를 적용시킨다
//리덕스데브툴스 크롬에 설치및 라이브러리 추가 설치
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import rootReducer from "./modules";
import { Provider } from "react-redux";
//import { devToolsEnhancer } from "@redux-devtools/extension";
import { composeWithDevTools } from "redux-devtools-extension";

//스토어생성 - 데브툴스적용, 리덕스의-리듀서 적용
const store = createStore(rootReducer, composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById("root"));
//Provider 리액트 컴포넌트에서 스토어를 사용할수있게 provider을 사용해 props로 store를 전달 -->446리덕스스토어와 컴포넌트와 연결[컨테이너컴포넌트]->Countercontainer.js로 이동
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
