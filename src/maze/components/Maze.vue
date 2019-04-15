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
      <span class="control">{{dataNum}}</span>
      <button class="control circle" @click="count(1)">+</button>
      <button class="control circle" @click="count(10)">+</button>
    </section>
    <section>
      <button class="control label" :class="[isAuto ? 'active' : '']" @click="toggleAuto()">AUTO</button>
      <button class="control label" :class="fast == 1 ? 'active' : ''" @click="setFast(1)">×1</button>
      <button class="control label" :class="fast == 10 ? 'active' : ''" @click="setFast(10)">×10</button>
      <button class="control label" :class="fast == 100 ? 'active' : ''" @click="setFast(100)">×100</button>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueRouter from "vue-router";
import Maze from "../domain/renderer/Maze";
import StickDownMaze from "../domain/renderer/StickDownMaze";

var maze: Maze;

export default Vue.extend({
  data() {
    return {
      dataNum: 5,
      fast: 1,
      isAuto: false
    };
  },
  mounted() {
    this.setSortComponent(this.$route.path);
  },
  watch: {
    $route(to, from) {
      this.setSortComponent(this.$route.path);
    }
  },
  methods: {
    init() {
      this.isAuto = false;
    },
    next() {
      maze.update();
    },
    reset() {
      maze.reset(this.dataNum);
      this.init();
    },
    toggleAuto() {
      //   maze.toggleAuto();
      this.setFast(this.fast);
      this.isAuto = !this.isAuto;
    },
    count(count: number) {
      this.dataNum += count;

      if (this.dataNum < 2) {
        this.dataNum = 2;
      }

      maze.reset(this.dataNum);
      this.init();
    },
    setFast(fast: number) {
      this.fast = fast;
      //   maze.autoSkip = this.fast;
    },
    setSortComponent(mode: string) {
      if (maze != null) {
        // maze.destory();
      }

      switch (mode) {
        // case "/BubleSort":
        //   sort = new BubleSort("canvas", this.sortCompleted);
        //   break;
        // case "/InsertionSort":
        //   sort = new InsertionSort("canvas", this.sortCompleted);
        //   break;
        // case "/SelectedSort":
        //   sort = new SelectedSort("canvas", this.sortCompleted);
        //   break;
        // case "/QuickSort":
        //   sort = new QuickSort("canvas", this.sortCompleted);
        //   break;
        default:
          maze = new StickDownMaze("canvas", this.sortCompleted);
          break;
      }

      maze.init(this.dataNum, this.fast);
      this.init();
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
  height: 100%;
}

.control {
  background: none;
  height: 36px;
  border: none;
  color: white;
  outline: none;

  &.label {
    border-radius: 2px;
    padding: 0 16px;
    font-size: 20px;

    &:active {
      color: #e91e63;
    }
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
