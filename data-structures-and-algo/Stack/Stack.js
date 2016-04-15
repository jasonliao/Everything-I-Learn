// Data Type: Stack

const Stack = function () {
  this.top = 0;
  this.storage = {};
};

Stack.prototype = {
  constructor: Stack,
  init (...args) {
    args.forEach((item, index) => {
      this.storage[index] = item;
    });
    this.top = args.length;
  },
  isEmpty () {
    return !this.top;
  },
  clear () {
    while (!this.isEmpty()) {
      this.pop();
    }
  },
  peek () {
    return this.storage[this.top - 1];
  },
  push (elm) {
    this.storage[this.top++] = elm;
  },
  pop () {
    if (!this.isEmpty()) {
      deleteData = this.storage[--this.top];
      delete this.storage[this.top];
      return deleteData;
    }
    return 'Stack is Empty';
  }
};
