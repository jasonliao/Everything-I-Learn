class Todo {
  constructor (title) {
    this.completed = false;
    this.editing = false;
    this.title = title.trim();
  }
};

export default Todo;
