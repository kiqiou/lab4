class BitStorage {
  constructor(size) {
    this.bits = new Array(size).fill(false);
  }
  getValue(pos) {
    return this.bits[pos];
  }
  setValue(pos, val) {
    if (typeof val === 'undefined') {
      this.bits[pos] = true;
    } else {
      this.bits[pos] = val;
    }
  }
}

module.exports = class BloomFilter {
  constructor(size = 100) {
    this.size = size;
    this.storage = this.createStore(this.size);
  }

  createStore(size) {
    return new BitStorage(size);
  }

  hash1(item) {
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
      const char = item.charCodeAt(i);
      hash = (hash << 5) + hash + char; 
      hash &= hash;                    
      hash = Math.abs(hash);           
    }
    return hash % this.size;
  }

  hash2(item) {
    let hash = 5381;
    for (let i = 0; i < item.length; i++) {
      const char = item.charCodeAt(i);
      hash = (hash << 5) + hash + char; 
      hash &= hash;                     
    }
    return Math.abs(hash % this.size);
  }

  hash3(item) {
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
      const char = item.charCodeAt(i);
      hash = (hash << 5) - hash + char; 
      hash &= hash;                
      hash = Math.abs(hash);
    }
    return hash % this.size;
  }

  getHashValues(item) {
    return [this.hash1(item), this.hash2(item), this.hash3(item)];
  }

  insert(item) {
    this.getHashValues(item).forEach(pos => {
      this.storage.setValue(pos % this.size, true);
    });
  }

  mayContain(item) {
    return this.getHashValues(item).every(
      pos => this.storage.getValue(pos % this.size)
    );
  }
};
