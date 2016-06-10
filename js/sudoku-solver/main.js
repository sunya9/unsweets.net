import SudokuSolver from 'worker!./sudoku-solver';
import Vue from 'vue';
import _ from 'underscore';
import '../../sass/sudoku-solver/main.scss';

const AT_LEAST_17 = 'ヒントは17個以上である必要があります。';

new Vue({
  el: '#app',
  data: {
    table: [],
    ansTable: [],
    message: null
  },
  created() {
    const sample = `009100004
003800600
000050300
070201080
010700020
050400030
001060000
004008100
600002900`.split('\n');
    for(let i = 0; 9 > i; i++) {
      for(let j = 0; 9 > j; j++) {
        if(!this.table[i]) this.table[i] = [];
        if(!this.ansTable[i]) this.ansTable[i] = [];
        this.ansTable[i][j] = this.table[i][j] = null;
        this.table[i][j] = +sample[i].split('')[j] > 0 ? +sample[i][j] : null;
      }
    }
  },

  methods: {
    solve() {
      if(_.chain(this.table).flatten().compact().value().length < 17) {
        this.message = AT_LEAST_17;
        return;
      }
      const worker = new SudokuSolver();
      worker.postMessage({cmd: 'solve', table: this.table});
      worker.addEventListener('message', e => {
        const { data } = e;
        switch(data.status) {
          case 'solve':
          this.ansTable = data.table;
          break;

          case 'progress':
          this.ansTable = data.table;
          break;
        }
      }, false);
    }
  }
});
