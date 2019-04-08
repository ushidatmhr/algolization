<template>
  <div class="menu-container">
    <nav class="side-menu">
      <div class="head">SORT</div>
      <div
        class="menu-item"
        :class="[$route.path == '/BubbleSort' || $route.path == '/' ? 'active' : '']"
        @click="pushRoute('BubbleSort')"
      >Bubble Sort</div>
      <div
        class="menu-item"
        :class="[$route.path == '/InsertionSort' ? 'active' : '']"
        @click="pushRoute('InsertionSort')"
      >Insert Sort</div>
      <div
        class="menu-item"
        :class="[$route.path == '/SelectedSort' ? 'active' : '']"
        @click="pushRoute('SelectedSort')"
      >Selected Sort</div>
      <div
        class="menu-item"
        :class="[$route.path == '/QuickSort' ? 'active' : '']"
        @click="pushRoute('QuickSort')"
      >Quick Sort</div>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {};
  },
  methods: {
    pushRoute(route: string) {
      this.$router.push(route);
    }
  }
});
</script>

<style lang="scss" scoped>
.menu-container {
  min-width: 200px;
  height: 100vh;

  @media screen and (max-width: 480px) {
    & {
      position: fixed;
      left: -200px;
      top: 0;
    }
  }

  .side-menu {
    background-color: #263238;
    color: white;
    height: 100vh;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #cfd8dc;

    .head,
    .menu-item {
      padding: 10px;
    }

    .head {
      height: 50px;
      line-height: 50px;
      background-color: #607d8b;
      font-size: 150%;
      border-bottom: 3px solid #cfd8dc;
    }

    .menu-item {
      height: 30px;
      border-bottom: 1px solid #cfd8dc;
      line-height: 30px;
      cursor: pointer;
      user-select: none;

      &:hover {
        background-color: #90a4ae;
      }

      &.active {
        background-color: #546e7a;
      }
    }
  }
}
</style>
