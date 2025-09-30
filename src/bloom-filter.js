class BitStorage {
  constructor(size) {
    this.bits = new Array(size).fill(false);
  }
  getValue(pos) {
    return this.bits[pos];
  }
  setValue(pos, val) {
    // Поддерживаем оба варианта: setValue(i) и setValue(i, true)
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

  // hash1: variant of djb-like starting from 0, coerce to 32-bit and abs inside loop
  hash1(item) {
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
      const char = item.charCodeAt(i);
      hash = (hash << 5) + hash + char; // hash * 33 + char
      hash &= hash;                     // coerce to 32-bit signed int
      hash = Math.abs(hash);            // keep positive (as in tests)
    }
    return hash % this.size;
  }

  // hash2: true djb2 (seed 5381), coerce to 32-bit per iteration, abs at the end
  hash2(item) {
    let hash = 5381;
    for (let i = 0; i < item.length; i++) {
      const char = item.charCodeAt(i);
      hash = (hash << 5) + hash + char; // hash * 33 + char
      hash &= hash;                     // coerce to 32-bit signed int
    }
    return Math.abs(hash % this.size);
  }

  // hash3: 31-multiplier variant, coerce to 32-bit and abs inside loop
  hash3(item) {
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
      const char = item.charCodeAt(i);
      hash = (hash << 5) - hash + char; // hash * 31 + char
      hash &= hash;                     // coerce to 32-bit signed int
      hash = Math.abs(hash);
    }
    return hash % this.size;
  }

  getHashValues(item) {
    return [this.hash1(item), this.hash2(item), this.hash3(item)];
  }

  insert(item) {
    this.getHashValues(item).forEach(pos => {
      // setValue поддерживает и setValue(i) и setValue(i, true)
      this.storage.setValue(pos % this.size, true);
    });
  }

  mayContain(item) {
    return this.getHashValues(item).every(
      pos => this.storage.getValue(pos % this.size)
    );
  }
};
