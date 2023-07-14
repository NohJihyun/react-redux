//[[[컴포넌트설명]]]
//452REDUXSTORE와 연결하고 컨테이너컴포넌트 | 상태를 PROPS로 받아 UI를 그린다 프레젠테이셔널컴포넌트
//CONNET으로 REDUXSTORE와 컨테이너컴포넌트 연결방식을 ---> hook을 사용해서 연결하는 방식으로 변경 467
//import { connect } from "react-redux";
//Redux에 작업한걸 가져온다
import { changeInput, insert, toggle, remove } from "../modules/todos";
//프레젠테이셔널컴포넌트에 props에 전달하기 위해서 불러온다
import Todos from "../components/Todos";
//467-hook을사용 컨테이너컴포넌트 만들기 1.useSelector-상태조회 2.useDispatch 액셩생성함수 액션객체 만들어 보낸다
//467 useCallback 컴포넌트성능최적화 2번째 파라미터는 : 어떤값이 바뀌었을때 함수를 새로 생성해야하는지 명시한다.
//469 util함수를 별도로 만들어서 가져다 사용
import { useSelector } from "react-redux";
//import { useCallback } from "react"; --> 컴포넌트성능최적화 할필요 없이 --> 469 액션을 여러개 있을때 util로 따로 만들어서 가져다 사용하는 방식을 적용한다
//469 액션을 여러개 있을때 util로 따로 만들어서 가져다 사용하는 방식을 적용한다
import useActions from "../lib/useActions";
//컴포넌트성능최적화 React.memo
import React from "react";

//[[[connect 방식 Reduxstore 연결 되는 컴포넌트 만들기]]]
// 프레젠테이셔널컴포넌트에 props로 전달
// const TodosContainer = ({
//   input,
//   todos,
//   changeInput,
//   insert,
//   toggle,
//   remove,
// }) => {
//   return (
//     <Todos
//       input={input}
//       todos={todos}
//       onChangeInput={changeInput}
//       onInsert={insert}
//       onToggle={toggle}
//       onRemove={remove}
//     />
//   );
// };

//467 Redux-store 연결
//467 hook을사용 컨테이너컴포넌트 만들기 1.useSelector-상태조회 2.useDispatch 액셩생성함수 액션객체 만들어 보낸다
//467 useCallback 컴포넌트성능최적화 2번째 파라미터는 : 어떤값이 바뀌었을때 함수를 새로 생성해야하는지 명시한다.
//468 useAction 유틸 hook을 사용해서 여려개의 action을 사용해야할경우 467소스에서 --> 가독성 좋게 소스를 작성할수 있다 . 1.468 lib폴더안에 util함수를 가져와서 사용하면 된다.

// 상태조회 및 ReduxStore와 연결
const TodosContainer = () => {
  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }));
  // 액션생성함수 액션객체 발생시키게 디스패치로 전송
  const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
    [changeInput, insert, toggle, remove],
    []
  );

  //UI담당하는 프레젠테이셔널 컴포넌트에 props로 전달
  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  );
};

// //453 상태조회 mapStateToProps | mapDispatchToProps connect() 함수를 사용해서 mapDispatchToProps 짧게 쓰는 방식으로 소스적용
// export default connect(
//   //mapStateToProps 비구조화 할당을 통해 todos를 분리하여 state.todos.input 대신 todos.input을 사용 -> 리듀서()함수로 새로운 상태를 반환
//   ({ todos }) => ({
//     input: todos.input,
//     todos: todos.todos,
//   }),
//   //mapDispatchToProps 익명함수를 이용한뒤, connect() 함수의 두번째 파라미터로 적용 bindActionCreators작업을 대신한다. ---> 액션객체 --> dispatch 전송
//   {
//     changeInput,
//     insert,
//     toggle,
//     remove,
//   }
// )(TodosContainer);

export default React.memo(TodosContainer);
