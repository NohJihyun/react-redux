//[[[모듈설명]]]
//index.js로 파일명 지정해주면 만든 리듀서들을 하나로 합치고 내볼낼수 있다
//스토어를 사용할때는 리듀서는 무조건 하나로 사용한다
//하나로 합칠때 combineReducers 유틸함수를 사용하면 가능하다
import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";

const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;
