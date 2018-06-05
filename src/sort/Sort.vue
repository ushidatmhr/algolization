<template>
    <div>
        <div id="canvas"></div>
        <section>
            <button @click="next()">Next</button>
            <button @click="reset()">Reset</button>
            <button @click="toggleAuto()">Auto</button>
        </section>
        <section>
            <button @click="count(-10)">-</button>
            <button @click="count(-1)">-</button>
            {{dataNum}}
            <button @click="count(1)">+</button>
            <button @click="count(10)">+</button>
        </section>
        <section>
            <div>
                {{fast}}
            </div>
            <button @click="setFast(1)">×1</button>
            <button @click="setFast(10)">×10</button>
            <button @click="setFast(100)">×100</button>
        </section>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import BubleSort from "./BubleSort";
import Sort from "./Sort";

var sort: Sort;

export default Vue.extend({
  data() {
    return {
      dataNum: 10,
      fast: 1
    };
  },
  mounted() {
    sort = new BubleSort("canvas");
    sort.init(this.dataNum);
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
    },
    count(count: number) {
      this.dataNum += count;
      sort.reset(this.dataNum);
    },
    setFast(fast: number) {
      this.fast = fast;
      sort.autoSkip = this.fast;
    }
  }
});
</script>

<style lang="scss" scoped>
.example {
  color: red;
}
</style>