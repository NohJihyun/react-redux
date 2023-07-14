//[[[컴포넌트설명]]]
//components폴더에 있는 컴포넌트는 프레젠테이셔널 컴포넌트 : 상태를 관리하지 않고 PROPS로 받아와서 화면 UI를 보여줌
//숫자를 더하고 뺄수있는 컴포넌트
const Counter = ({ number, onIncrease, onDecrease }) => {
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
    </div>
  );
};

export default Counter;
