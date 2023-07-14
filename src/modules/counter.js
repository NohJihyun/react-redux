//[[[컴포넌트설명]]]
//Redux-Ducks패턴
//Ducks패턴 --> 액션타입|액션생성함수|리듀서 한파일에 위치한다
//액션타입|액션생성함수|리듀서를 합친 파일=모듈
//457 Redux-actions 라이브러리를 활용해서 액션생성함수를 더 가독성좋게 소스를 작성할수 있다. - import createAction------------------------
import { createAction, handleActions } from "redux-actions";

//1.-액션타입을 정의할때 문자열 안에 모듈명을 적어준다-충돌방지
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

//2.-액션생성함수 -- 객체생성
//export const increase = () => ({ type: INCREASE });
//export const decrease = () => ({ type: DECREASE }); 화살표함수 Return 키워드 대신 () 소괄호 안 {} 객체를 넣어서 함수밖으로 반환한다

//2-1 457 Redcks-actions-라이브러리적용 액션생성함수를 좀더 편한게 작성하는 방법 -createAction
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

//3.-초기값
const initialState = {
  number: 0,
};

// [[[리듀서함수작성방법]]]
// //4.리듀서함수 --> 초기값 초기상태|현재상태와 액션객체를 파라미터로 받아서 새로운 형태를 만들어낸다.
// function counter(state = initialState, action) {
//   switch (action.type) {
//     case INCREASE:
//       return {
//         number: state.number + 1,
//       };
//     case DECREASE:
//       return {
//         number: state.number - 1,
//       };
//     default:
//       return state;
//   }
// }
//458 두번째방법-Redux-handleActions 라이브러리적용
//458 [[[리듀서함수가독성좋게적용]]]
//458 handleAction 1.첫번째 파라미터에는 각 액션에 대한 업데이트함수를 넣어주고, 두번째파라미터에 초기상태를 넣어준다
const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState
);

export default counter;
