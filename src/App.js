import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import Palette from './components/Palette';

const colors = ['#343a40', '#f03e3e', '#12b886', '#228ae6', '#22f9e5'];
class App extends Component {
  // 초기 state를 정의하기
  id = 3 // 이미 0, 1, 2가 존재하므로 3으로 설정
  state = {
    input: '',
    todos: [
      {id: 0, text: ' React 공부', checked: false},
      {id: 1, text: ' React To Do List', checked: true},
      {id: 2, text: ' Node.js 재설치', checked: false},
    ],
    color: '#343a40'
  }

  // 메소드 구현
  handleChange = (e) =>{
    this.setState({
      input: e.target.value // input의 다음 바뀔 값
    });
  }
  // 일정 등록하기, 입력한 문장을 리스트에 추가(배열.concat을 사용해 배열에 추가)
  /* push를 사용하지 않는 이유
  - push를 통해 데이터를 추가하면 배열에 값이 추가되긴 하지만
    가르키고 있는 배열은 똑같기 때문에 비교룰 할 수 없다.
    따라서, 나중에 최적화를 하게 될 때, 배열을 비교하여 리렌더링을 방지하게 된다.
    만약 push를 사용한다면 최적화를 할 수 없게 된다.

    반면, concat의 경우 새 배열을 만들기 때문에 괜찮다.
  */
  handleCreate = () => {
    const{ input, todos, color } = this.state;
    this.setState({
      input: '', // input을 비우고
      // concat을 사용하여 배열에 추가함
      todos : todos.concat({
        id: this.id++,
        text: input,
        checked: false,
        color
      })
    });
  }
  // Enter를 눌러도 추가 되게 설정
  handleKeyPress = (e) => {
    // 눌려진 키가 Enter라면 handleCreate 호출
    if(e.key === 'Enter'){
      this.handleCreate();
    }
  }
  // 체크하기, 체크 풀기 메소드
  handleToggle = (id) => {
    const { todos } = this.state;
    // 파라미터로 받은 id를 가지고 몇 번째 아이템인지 찾기
    const index = todos.findIndex(todo => todo.id === id);
    // 선택한 객체 저장
    const selected = todos[index];
    // 배열을 복사
    const nextTodos = [...todos];
    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };
    this.setState({
      todos: nextTodos
    });
  }

  // 일정 삭제하기
  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  // 색깔 지정하기
  handleSelectColor = (color) => {
    this.setState({
      color
    })
  }

  render() {
    const { input, todos } = this.state;
    // 메소드를 전달하기 전, 비구조화 할당을 통해 코드 간결화를 진행함
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handleSelectColor
    } = this; // 이렇게 함으로서, 아래 Form 태그에서 메소드를 호출할 때 this.메소드 이런 식으로 계속 this를 붙여주는 작업을 생략할 수 있다.

    return (
      <TodoListTemplate form={(
        <Form 
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
          color={colors}
        />
      )}
        palette={(
          <Palette colors={colors} selected={colors} onSelect={handleSelectColor}/>
        )}>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
      </TodoListTemplate>
    );
  }
}
export default App;