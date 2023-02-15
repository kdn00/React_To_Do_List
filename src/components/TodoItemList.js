import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component {
  // 컴포넌트 최적화
  // 컴포넌트 라이프 사이클 메소드중 shouldComponentUpdate는 컴포넌트가 리렌더링을 할 지 말지 정해줍니다.
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.todos !== nextProps.todos;
  }

  render() {
    const { todos, onToggle, onRemove } = this.props;

    const todoList = todos.map(
      (todo) => (
        <TodoItem
        // 이렇게 {…todo} 라고 넣어주면, 내부의 값들이 모두 props로 자동 설정 됩니다.
          {...todo}
          onToggle={onToggle}
          onRemove={onRemove}
          key={todo.id}
        />
      )
    );
    return (
      <div>
        {todoList}    
      </div>
    );
  }
}
export default TodoItemList;