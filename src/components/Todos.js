//[[[컴포넌트설명]]]
//import todos from "../modules/todos";
//433~434할일을 추가하고, 체크하고, 삭제할 수 있는 할일목록 컴포넌트
//433~434PROPS로 받아와서 화면 UI만 보여주는 컴포넌트 -->프레젠테이셔널 컴포넌트
//433~434취향에 따라 컴포넌트를 분리해서 사용해도 되고 파일 하나에 컴포넌트를 2개 만들어서 적용해두된다. todos컴포넌트| TodoItem컴포넌트 합쳐져 있다.

//454 REDUX를 가져와서 활용
//첫번째컴포넌트
//Todo컴포넌트에서 props로 전달받아서 처리한다.
const TodoItem = ({ todo, onToggle, onRemove }) => {
  return (
    <div>
      {/*클라이언트 클릭시 --> 리덕스스토어와 연결된 컴포넌트에서 액션객체 dispatch 보내서 reducer가 새로운 상태를 반환한다것을 UI담당컴포넌트가 props로 받아서 처리한다 */}
      {/*454 onClick 이벤트핸들링 수정처리 TodoItem컴포넌트의 배열로 변환된 PROPS로 전달받아 처리하는데 리덕스 리듀스에 수정처리로직 돌아서 새로운 상태를 받아서 화면에 출력된다*/}
      <input
        type="checkbox"
        onClick={() => onToggle(todo.id)}
        checked={todo.done}
        readOnly={true}
      />
      <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
        {todo.text}
      </span>
      <button onClick={() => onRemove(todo.id)}>삭제</button>
    </div>
  );
};
//두번째컴포넌트 상위 첫번째 컴포넌트를 div 블록으로 감싼후 컴포넌트를 렌더함 --> App.js에 적용 --> index.js에서 화면출력
//객체를 만들어 TodoItem컴포넌트에 props로 전달하고 있다
const Todos = ({
  input, // 인풋에 입력되는 텍스트
  todos, // 할 일 목록이 들어있는 객체
  onChangeInput,
  onInsert,
  onToggle,
  onRemove,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    onInsert(input);
    onChangeInput(""); // 등록 후 인풋 초기화
  };
  const onChange = (e) => onChangeInput(e.target.value);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={input} onChange={onChange} />
        <button type="submit">등록</button>
      </form>
      <div>
        {todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default Todos;
