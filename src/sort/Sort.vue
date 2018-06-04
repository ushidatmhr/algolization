<template>
    <div>
        <div id="canvas"></div>
        <section>
            <button @click="next()">Next</button>
            <button @click="reset()">Reset</button>
            <button @click="toggleAuto()">Auto</button>
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
    return {};
  },
  mounted() {
    sort = new BubleSort("canvas");
    sort.init(100);
  },
  methods: {
    next() {
      sort.next();
    },
    reset() {
      sort.reset(10);
    },
    toggleAuto() {
      sort.toggleAuto();
    }
  }
});
</script>

<style lang="scss" scoped>
.example {
  color: red;
}
</style>