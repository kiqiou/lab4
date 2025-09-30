const { NotImplementedError } = require("../extensions/index.js");

module.exports = class Stack {
  constructor() {
    this.stackArray = [];
  }

  push(element) {
    this.stackArray.push(element);
  }

  pop() {
    return this.stackArray.pop();
  }

  peek() {
    return this.stackArray.length > 0 ? this.stackArray[this.stackArray.length - 1] : undefined;
  }
};
