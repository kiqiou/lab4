const { NotImplementedError } = require('../extensions/index.js');
const { ListNode } = require('../extensions/list-node.js');

module.exports = class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  getUnderlyingList() {
    return this.head;
  }

  enqueue(value) {
    const newNode = new ListNode(value);
    if (!this.head) {
      // Если очередь пустая
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Добавляем в конец, обновляем хвост
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  dequeue() {
    if (!this.head) return null;
    const value = this.head.value;
    this.head = this.head.next;
    if (!this.head) {
      // Если после удаления очередь пустая, сбрасываем хвост
      this.tail = null;
    }
    return value;
  }
};
