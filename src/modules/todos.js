//[[[컴포넌트]]] 모듈이란? |액션타입정의|액션함수생성|리듀서 한파일에 다있는것을 말한다
// [[[REDUX]]]
//459액션타입정의 | 액션생성함수 | 리듀서 | reate 라이브러리 careateAtion 사용해서 가독성좋게 소스 구현 - craateAction
import { createAction, handleActions } from "redux-actions";
//463 immer 라이브러리적용 immer: 객체의 구조가 복잡해지거나, 객체로 이루어진 배열을 다룰경우 immer을 사용하여 편리하게 상태관리
//produce(첫번째파라미터 수정하고 싶은상태, 두번째파라미터는 상태를 어떻게 업데이트할지 정의하는 함수)
//produce 함수내부에서원하는 값을 변경하면, produce() 함수가 불변성을 유지를 대신해 주면서 새로운 상태를 생성해준다
import { produce } from "immer";

//1.액션타입정의
//모듈이름명시
const CHANGE_INPUT = "todos/CHANGE_INPUT"; //인풋 값을 변경함
const INSERT = "todos/INSERT"; //새로운 todo를 등록함 할일을 등록
const TOGGLE = "todos/TOGGLE"; //todo 체크/체크를 해제함 수정
const REMOVE = "todos/REMOVE"; //todo를 제거함

//2.액션함수생성=객체생성
// export const changeInput = (input) => ({
//   type: CHANGE_INPUT,
//   input,
// })

// //insert-id참조->insert액션생성함수가 호출될때마다 +1 증가한다
// let id = 3; //--> id값을 고유값으로 사용하기 때문에 참조한다
// //insert등록
// export const insert = (text) => ({
//   type: INSERT,
//   //todo객체가 들고 있게 될 고윳값
//   todo: {
//     id: id++,
//     text,
//     done: false,
//   },
// });
// //TOGGLE수정
// export const toggle = (id) => ({
//   type: TOGGLE,
//   id,
// });
// //REMOVE제거
// export const remove = (id) => ({
//   type: REMOVE,
//   id,
// });
// //초기상태 초기값 설정
// const initialState = {
//   input: "",
//   todos: [
//     { id: 1, text: "리덕스 학습", done: true },
//     { id: 2, text: "리액트 리덕스 학습", done: false },
//   ],
// };
//2.액션함수생성=객체생성
//459 액션생성함수 가독성 라이브러리 적용 craateAction
export const changeInput = createAction(CHANGE_INPUT, (input) => input);

let id = 3; // insert가 호출될 때마다 1씩 더해집니다.
export const insert = createAction(INSERT, (text) => ({
  id: id++,
  text,
  done: false,
}));
export const toggle = createAction(TOGGLE, (id) => id);
export const remove = createAction(REMOVE, (id) => id);

//3.초기상태 초기값 설정
const initialState = {
  input: "",
  todos: [
    {
      id: 1,
      text: "리덕스 기초 배우기",
      done: true,
    },
    {
      id: 2,
      text: "리액트와 리덕스 사용하기",
      done: false,
    },
  ],
};
//4.Reducer함수만들기
//Reducer함수만들기 --> 초기값 초기상태와, action을 파라미터로 받아서 새로운값, 형태를 만든다
//초기상태가 배열이기때문에 불변성을 유지하면서 배열을 최대한 안건들고 얉은복사를 해서 새로운 배열로 만들어서 값을 업데이트한다
// function todos(state = initialState, action) {
//   switch (action.type) {
//     case CHANGE_INPUT:
//       return {
//         ...state, //spread연산자, 불변성 유지
//         input: action.input, //action 새로추가되는 객체
//       };
//     case INSERT:
//       return {
//         ...state,
//         todos: state.todos.concat(action.todo), //객체추가 등록
//       };
//     //map을 사용해 새로운배열로 id를 지정하여 원하는 원소의 값만 객체{}를 생성해서 값을 변경한다
//     case TOGGLE:
//       return {
//         ...state,
//         todos: state.todos.map((todo) =>
//           todo.id === action.id ? { ...todo, done: !todo.done } : todo
//         ),
//       };
//     case REMOVE:
//       return {
//         ...state,
//         todos: state.todos.filter((todo) => todo.id !== action.id),
//       };
//     default:
//       return state;
//   }
// }
//4.Reducer함수만들기
//460 redux-actions 라이브러리의 handlerAction로 가독성 좋게 소스적용
//460 새로추가되는 데이터를 payload를 이름으로 사용하기 때문에 action.payload로 값을 조회하도록 리듀서를 구현해야한다.
// const todos = handleActions(
//   {
//     [CHANGE_INPUT]: (state, action) => ({ ...state, input: action.payload }),
//     [INSERT]: (state, action) => ({
//       ...state,
//       todos: state.todos.concat(action.payload),
//     }),
//     [TOGGLE]: (state, action) => ({
//       ...state,
//       todos: state.todos.map((todo) =>
//         todo.id === action.payload ? { ...todo, done: !todo.done } : todo
//       ),
//     }),
//     [REMOVE]: (state, action) => ({
//       ...state,
//       todos: state.todos.filter((todo) => todo.id !== action.payload),
//     }),
//   },
//   initialState
// );
//4.Reducer함수만들기 --> Reducer : 액션을 만들어서 발생시키면 현재상태와state|action을 받아서 새로운 형태/상태를 만들어서 반환한다.
//460 redux-actions 라이브러리의 handlerAction로 가독성 좋게 소스적용
//460 새로추가되는 데이터를 payload를 이름으로 사용하기 때문에 action.payload로 값을 조회하도록 리듀서를 구현해야한다.
//460 [[[객체비구조화 할당문법으로 action값에 payload이름을 새로 설정해주면 action.payload가 정확히 어떤값을 의미하는지 파악이 더쉽다 가독성 좋게 소스구현]]]
// const todos = handleActions(
//   {
//     [CHANGE_INPUT]: (state, { payload: input }) => ({ ...state, input }),
//     [INSERT]: (state, { payload: todo }) => ({
//       ...state,
//       todos: state.todos.concat(todo),
//     }),
//     [TOGGLE]: (state, { payload: id }) => ({
//       ...state,
//       todos: state.todos.map((todo) =>
//         todo.id === id ? { ...todo, done: !todo.done } : todo
//       ),
//     }),
//     [REMOVE]: (state, { payload: id }) => ({
//       ...state,
//       todos: state.todos.filter((todo) => todo.id !== id),
//     }),
//   },
//   initialState
// );
//책463 설명참고
//4.Reducer함수만들기 --> Reducer : 액션을 만들어서 발생시키면 현재상태와state|action을 받아서 새로운 형태/상태를 만들어서 반환한다.
//463immer라이브러리를 사용해서 가독성 높여주기 (객체구조가복잡할때, 객체로 이루어진 배열을 다룰때, 깊은곳의 값을 수정할때 사용한다)
//463produce(첫번째파라미터 수정하고 싶은상태, 두번째파라미터는 상태를 어떻게 업데이트할지 정의하는 함수)
//463produce 함수내부에서원하는 값을 변경하면, produce() 함수가 불변성을 유지를 대신해 주면서 새로운 상태를 생성해준다
const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: input }) =>
      produce(state, (draft) => {
        draft.input = input;
      }),
    [INSERT]: (state, { payload: todo }) =>
      produce(state, (draft) => {
        draft.todos.push(todo);
      }),
    [TOGGLE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const todo = draft.todos.find((todo) => todo.id === id);
        todo.done = !todo.done;
      }),
    [REMOVE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const index = draft.todos.findIndex((todo) => todo.id === id);
        draft.todos.splice(index, 1);
      }),
  },
  initialState
);

export default todos;
