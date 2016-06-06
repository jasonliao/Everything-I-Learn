import Todo from './todo';

class TodoStore {
  constructor () {
    const persistedTodos = JSON.parse(localStorage.getItem('angular2-es6-todos') || '[]');
    this.todos = persistedTodos.map(todo => todo);
  }
  updateStore () {
    localStorage.setItem('angular2-es6-todos', JSON.stringify(this.todos));
  }
  add (title) {
    this.todos.push(new Todo(title));
    this.updateStore();
  }
  remove (todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.updateStore();
  }
  toggleCompletion (todo) {
    todo.completed = !todo.completed;
    this.updateStore();
  }
  removeCompleted () {
    this.todos = this.getWithCompleted(false);
    this.updateStore();
  }
  setAllTo (completed) {
    this.todos.forEach(todo => todo.completed = completed);
    this.updateStore();
  }
  allCompleted () {
    return this.todos.length === this.getWithCompleted(true).length;
  }
  getWithCompleted (completed) {
    return this.todos.filter(todo => todo.completed === completed);
  }
};

export default TodoStore;
