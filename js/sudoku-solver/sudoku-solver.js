import _ from 'underscore';
import EventEmitter from 'eventemitter3';

class SudokuSolver extends EventEmitter {
  constructor(table = null) {
    super();
    this._candidateTables = [table];
  }

  _deepClone(table) {
    return _.chain(table)
      .flatten()
      .groupBy((e, i) => Math.floor(i / 9))
      .toArray()
      .value();
  }

  solve(table = null) {
    if(table) this._candidateTables = [table];
    while(this._candidateTables.length > 0) {
      const candidateTable = this._deepClone(this._candidateTables.pop());
      this.emit('progress', candidateTable);
      const { x, y } = this._findEmptyPosition(candidateTable);
      if(x < 0 || y < 0) return candidateTable;
      const nextCandidateTables = _.chain(_.range(1, 10))
        .map(n => {
          const newTable = this._deepClone(candidateTable);
          newTable[y][x] = n;
          return newTable;
        })
        .filter(table => this._check(table))
        .value();
      Array.prototype.push.apply(this._candidateTables, nextCandidateTables);
    }
  }

  _findEmptyPosition(table) {
    let x, y;
    y = _.findIndex(table, row => {
      x = _.findIndex(row, num => num === null);
      return x >= 0;
    });
    return { x, y };
  }

  _emptyCheck(table) {
    return _.every(table, _.every);
  }

  _rowsCheck(table) {
    return _.every(table, this._rowCheck);
  }

  _rowCheck(row) {
    const _ary = _.chain(row).compact();
    return  _ary.uniq().value().length === _ary.value().length;
  }

  _columnsCheck(table) {
    return this._rowsCheck(_.zip(...table));
  }

  _check(table) {
    const validators = [this._massCheck, this._rowsCheck, this._columnsCheck];
    return _.chain(validators)
      .map(validator => validator.bind(this)(table))
      .every()
      .value();
  }

  _massCheck(table) {
    const res = [];
    for(let y = 0; 9 > y; y += 3) {
      for(let x = 0; 9 > x; x += 3) {
        const block = [];
        for(let h = 0; 3 > h; h++) {
          for(let w = 0; 3 > w; w++ ) {
            block.push(table[y + h][x + w]);
          }
        }
        res.push(block);
      }
    }
    return this._rowsCheck(res);
  }
}

let i = 0;
const ss = new SudokuSolver();
ss.on('progress', table => {
  i++;
  if(i % 100 == 0) {
    i = 0;
    postMessage({status: 'progress', table});
  }
});

addEventListener('message', e => {
  const { data } = e;
  switch(data.cmd) {
    case 'solve':
    const table = ss.solve(data.table);
    postMessage({status: 'solve', table});
    break;
    case 'progress':

  }
}, false);
