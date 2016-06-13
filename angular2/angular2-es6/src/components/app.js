import { Component } from 'angular2/core';

import TodoStore from '../services/todostore';

class App {
  constructor () {
    this.todoStore = new TodoStore();
    this.newTodoText = ''
  }
  addTodo () {
    if (this.newTodoText.trim().length) {
      this.todoStore.add(this.newTodoText);
      this.newTodoText = '';
    }
  }
  editTodo (todo) {
    todo.editing = true;
  }
  stopEditing (todo, editedTitle) {
		todo.title = editedTitle;
		todo.editing = false;
	}
	cancelEditingTodo (todo) {
		todo.editing = false;
	}
	updateEditingTodo (todo, editedTitle) {
		editedTitle = editedTitle.trim();
		todo.editing = false;

		if (editedTitle.length === 0) {
			return this.todoStore.remove(todo);
		}

		todo.title = editedTitle;
	}
}

App.annotations = [
  new Component({
    selector: 'app',
    templateUrl: 'src/templates/app.html'
  })
];

export default App;
