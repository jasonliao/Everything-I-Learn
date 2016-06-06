import angular from 'angular2/core';

import TodoStore from '../services/todostore';

class App {
  constructor () {
    this.todoStore = new TodoStore();
    this.newTodoText = ''
  }
  addTodo (event) {
    if (this.newTodoText.trim().length) {
      this.todoStore.add(this.newTodoText);
      this.newTodoText = '';
    }
  }
  remove (todo){
		this.todoStore.remove(todo);
	}
  toggleCompletion (todo) {
    this.todoStore.toggleCompletion(todo);
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
  removeCompleted () {
		this.todoStore.removeCompleted();
	}
}

App.annotations = [
  new angular.Component({
    selector: 'app',
    templateUrl: 'src/templates/app.html'
  })
];

export default App;
