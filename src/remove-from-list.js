const { NotImplementedError } = require('../extensions/index.js');

module.exports = function removeKFromList(l, k) {
  // Удаляем все ведущие узлы со значением k
  while (l !== null && l.value === k) {
    l = l.next;
  }

  let current = l;
  // Обход списка и удаление узлов со значением k
  while (current !== null && current.next !== null) {
    if (current.next.value === k) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }

  return l;
};
