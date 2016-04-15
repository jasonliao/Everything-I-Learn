const Queue = function () {
  this.front = 0;
  this.rear = 0;
  this.storage = {};
};

Queue.prototype = {
  constructor: Queue,
  init (...args) {
    args.forEach((item, index) => {
      this.storage[index] = item;
    });
    this.rear = args.length;
  },
  clear () {
    while (!this.isEmpty()) {
      this.deQueue();
    }
  },
  isEmpty () {
    return !(this.rear - this.front);
  },
  length () {
    return this.rear - this.front;
  },
  getHead () {
    return this.storage[this.front];
  },
  enQueue (elm) {
    this.storage[this.rear++] = elm;
  },
  deQueue () {
    if (!this.isEmpty()) {
      deleteData = this.storage[this.front];
      delete this.storage[this.front++];
      return deleteData;
    }
    return 'Queue is Empty';
  }
};
