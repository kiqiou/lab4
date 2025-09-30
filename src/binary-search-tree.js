const { NotImplementedError } = require("../extensions/index.js");
const { Node } = require('../extensions/list-tree.js');

module.exports = class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    this._root = addWithin(this._root, data);

    function addWithin(node, data) {
      if (!node) return new Node(data);

      if (data === node.data) return node;

      if (data < node.data) {
        node.left = addWithin(node.left, data);
      } else {
        node.right = addWithin(node.right, data);
      }
      return node;
    }
  }

  has(data) {
    return searchWithin(this._root, data);

    function searchWithin(node, data) {
      if (!node) return false;
      if (data === node.data) return true;
      else if (data < node.data) return searchWithin(node.left, data);
      else return searchWithin(node.right, data);
    }
  }

  find(data) {
    return findNode(this._root, data);

    function findNode(node, data) {
      if (!node) return null;
      if (data === node.data) return node;
      else if (data < node.data) return findNode(node.left, data);
      else return findNode(node.right, data);
    }
  }

  remove(data) {
    this._root = removeNode(this._root, data);

    function removeNode(node, data) {
      if (!node) return null;

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else { 
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          return node.right;
        }
        if (!node.right) {
          return node.left;
        }

        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }
        node.data = minRight.data;
        node.right = removeNode(node.right, minRight.data);
        return node;
      }
    }
  }

  min() {
    if (!this._root) return null;
    let node = this._root;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this._root) return null;
    let node = this._root;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
};
