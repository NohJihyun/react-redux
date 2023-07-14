//[[[컴포넌트설명]]]
//446리덕스 스토어와 연결하는 컴포넌트
//[[[핵심]]]
//446 리덕스스토어는 현재 스토어레 리듀서를 합쳐서 스토어를 생성해두었다.
//446 mapStateToProps : 현컴포넌트 리덕스스토어와 연결(컨테이너컴포넌트)--> 리덕스스토어 안의 상태를 리듀서를 실행시켜 새로운 상태를 산출해 Props로 컴포넌트에 전달한다 --> 상태조회
//446 mapDispatchToProps --> 리덕스스토어에 액션생성함수를 받아와서 액션객첼르 만들어 dispatch 해준다 리덕스스토어에게 2.두번째로 컴포넌트의 props로 넘겨준다 --> 액션실행
//446 mapStateToProps | mapDispatchToProps : 반환하는 객체내부의 값들은 컴포넌트의 props로 전달된다 --> 프레젠테이셔널컴포트에 : props를 받아 UI만 담당
//464 리덕스스토어와 컴포넌트 연결할때 connect()() 사용했지만 --> Hook를 사용하여 연동된 컴포넌트 만들기 연결

//446 PROPS로 전달하기위해서 Counter 컴포넌트를 import 시킴 UI 담당하는 컴포넌트
import Counter from "../components/Counter";
//446 리덕스스토어와 컴포넌트를 연결할때 connect()함수를 사용하는데 해당함수에서 함수를 반환 반환된 함수안에() 컴포넌트명 적용시키면 연결이된다.
//import { connect } from "react-redux";
//449 액션생성함수를 불러오기 위해서 import
import { increase, decrease } from "../modules/counter";
//464 리덕스스토어와 컴포넌트 연결할때 connect()() 사용했지만 -->  useSelector, useDispatch Hook를 사용하여 연동된 컴포넌트 만들기 연결
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";

// //첫번째작업-리덕스스토어와 연결된 컴포넌트에서 --> 상태관리(조회) UI를 담당하는 Counter 컴포넌트에 Props로 전달한다-->[[[connect방식]]
// const CounterContainer = ({ number, increase, decrease }) => {
//   return (
//     <Counter number={number} onIncrease={increase} onDecrease={decrease} />
//   );
// };

//[[[액션을 발생시켜 dispatch 보내면 리덕스스토어가 리듀서를 실행 새로운 상태를 state action 받아 작업후 새로운 상태를 반환한다. ]]]
const CounterContainer = () => {
  //464 리덕스스토어와 컴포넌트 연결할때 connect()() 사용했지만 --> useSelector Hook를 사용하여 연동된 컴포넌트 만들기 연결 상태관리(조회)-> UI를 담당하는 Counter 컴포넌트에 Props로 전달한다 --> [[[useSelector]]]
  const number = useSelector((state) => state.counter.number);
  ////[[[mapStateToProps|mapDispatchToProps]]]-----> useSelector | useDispatch 사용하여 변경
  //466 reduxstore와에 연결및 상태관련 작업을 아래 주석된 소스로 처리하였는데, mapDispatchToProps --> 방법을 useDispatch 사용하여 액션을 디스패치하는 방식으로 변경
  const dispatch = useDispatch();
  //466 컴포넌트성능최적화 useCallback 사용
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
  // <Counter number={number} onIncrease={increase} onDecrease={decrease}
  //466 reduxstore와에 연결및 상태관련 작업을 아래 주석된 소스로 처리하였는데, mapDispatchToProps --> 방법을 useDispatch 사용하여 액션을 디스패치하는 방식으로 변경 --> usecallback 적용시킴
  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};

//[[[mapStateToProps|mapDispatchToProps]]]
//두번째작업-mapStateToProps-->스토어의상태를 Props로 컴포넌트에 전달하기 위해서 설정
//({}) return키워드 없이 ()소괄호안 {} 객체를 함수밖으로 반환한다
//state: 리덕스스토어 상태를 이야기 하는데, 리듀서를 합쳐서 스토어를 생성하였다. state.리듀서counter.number 뜻한다.
//mapStateToProps : 현컴포넌트 리덕스스토어와 연결(컨테이너컴포넌트)--> 리덕스스토어 안의 상태를(상태관리-조회) 리듀서를 실행시켜 새로운 상태를 산출해 Props로 컴포넌트에 전달한다
// const mapStateToProps = (state) => ({
//   number: state.counter.number,
// });
//세번째작업-mapDispatchToProps --> 리덕스스토어에 액션생성함수를 받아와서 액션객첼르 만들어 dispatch 해준다 리덕스스토어에게 2.두번째로 컴포넌트의 props로 넘겨준다
// const mapDispatchToProps = (dispatch) => ({
//   //449 --> 임시함수 onsole.log("increase"); 주석 --> 액션생성함수를 불러와서 액션객체를 만들어서 디스패치로 보냄
//   increase: () => {
//     //console.log("increase");
//     dispatch(increase());
//   },
//   decrease: () => {
//     //console.log("decrese");
//     dispatch(decrease());
//   },
// });
//450 상위 소스를 더 가독성이 좋게 작성하는 방법
//450~452 책 참고 dispatch도 가독성 좋게 소스를 작성할수 있다
//mapStateToProps|mapDispatchToProps connect 함수 내부에서 익명 함수 형태로 선언해도 문제가 되지 않는다.
// export default connect(
//   state => ({
//     number: state.counter.number,
//   }),
//   dispatch => ({
//     increase: () => dispatch(increase()),
//     decrease: () => dispatch(decrease()),
//   }),
//   )(CounterContainer)
//450~452 책 참고 dispatch도 가독성 좋게 소스를 작성할수 있다

//446 리덕스스토어와 컴포넌트를 연결할때 connect()함수를 사용하는데 해당함수에서 함수를 반환 반환된 함수안에() 컴포넌트명 적용시키면 연결이된다.
//export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
//464 useSelector로 reduxstore 와 컴포넌트 연견된 컴포넌트만들기 방식으로 변경
export default CounterContainer;
