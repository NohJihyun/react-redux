//import Counter from "./components/Counter";
//import Todos from "./components/Todo";
//Redux적용컴포넌트 불러오기
import CounterContainer from "./containers/CounterContainer";
//Redux적용컴포넌트 불러오기
import TodosContainer from "./containers/TodosContainer";
const App = () => {
  return (
    <div>
      {/*433카운터컴포넌트만들기 <Counter number={0} />  props 외부데이터 전달 주석처리 448 컨테이너컴포넌트로 렌더 */}
      <CounterContainer />
      <hr />
      {/*할일목록UI컴포넌트주석처리<Todos /> --> Redux적용 --> 454 컨테이너컴포넌트적용 */}
      <TodosContainer />
    </div>
  );
};

export default App;
