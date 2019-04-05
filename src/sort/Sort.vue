<template>
  <div class="container">
    <div id="canvas"></div>
    <section>
      <button class="control label" @click="next()">NEXT</button>
      <button class="control label" @click="reset()">RESET</button>
    </section>
    <section>
      <button class="control circle" @click="count(-10)">-</button>
      <button class="control circle" @click="count(-1)">-</button>
      {{dataNum}}
      <button class="control circle" @click="count(1)">+</button>
      <button class="control circle" @click="count(10)">+</button>
    </section>
    <section>
      <button class="control label" :class="[isAuto ? 'active' : '']" @click="toggleAuto()">AUTO</button>
      <button class="control label" :class="fast == 1 ? 'active' : ''" @click="setFast(1)">×1</button>
      <button class="control label" :class="fast == 10 ? 'active' : ''" @click="setFast(10)">×10</button>
      <button class="control label" :class="fast == 100 ? 'active' : ''" @click="setFast(100)">×100</button>
    </section>
    <section>
      <button @click="changeSort('BubleSort')">Buble</button>
      <button @click="changeSort('InsertionSort')">Insert</button>
      <button @click="changeSort('SelectedSort')">Select</button>
      <button @click="changeSort('QuickSort')">Quick</button>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Sort from "./Sort";
import BubleSort from "./BubleSort";
import InsertionSort from "./InsertionSort";
import SelectedSort from "./SelectedSort";
import QuickSort from "./QuickSort";

var sort: Sort;

export default Vue.extend({
  data() {
    return {
      dataNum: 10,
      fast: 1,
      isAuto: false
    };
  },
  mounted() {
    sort = new BubleSort("canvas", this.sortCompleted);
    sort.init(this.dataNum, this.fast);
  },
  methods: {
    next() {
      sort.update();
    },
    reset() {
      sort.reset(this.dataNum);
    },
    toggleAuto() {
      sort.toggleAuto();
      this.setFast(this.fast);
      this.isAuto = !this.isAuto;
    },
    count(count: number) {
      this.dataNum += count;
      sort.reset(this.dataNum);
    },
    setFast(fast: number) {
      this.fast = fast;
      sort.autoSkip = this.fast;
    },
    changeSort(mode: string) {
      sort.destory();
      switch (mode) {
        case "BubleSort":
          sort = new BubleSort("canvas", this.sortCompleted);
          break;
        case "InsertionSort":
          sort = new InsertionSort("canvas", this.sortCompleted);
          break;
        case "SelectedSort":
          sort = new SelectedSort("canvas", this.sortCompleted);
          break;
        case "QuickSort":
          sort = new QuickSort("canvas", this.sortCompleted);
          break;
      }

      sort.init(this.dataNum, this.fast);
    },
    sortCompleted() {
      this.isAuto = false;
    }
  }
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #263238;
}

.control {
  background: none;
  height: 36px;
  border: none;
  color: #3f51b5;
  outline: none;
  font-weight: bold;

  &.label {
    border-radius: 2px;
    padding: 0 16px;
    font-size: 14px;
  }

  &.circle {
    border-radius: 50%;
    font-size: 23px;
    width: 36px;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.07);
  }

  &.active {
    color: #e91e63;
  }
}
</style>
