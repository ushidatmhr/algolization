<template>
  <div class="menu-container">
    <nav class="side-menu">
      <div class="head">SORT</div>
      <div class="menu-item">Bubble Sort</div>
      <div class="menu-item">Insert Sort</div>
      <div class="menu-item">Select Sort</div>
      <div class="menu-item">Quick Sort</div>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {};
  }
});
</script>

<style lang="scss" scoped>
.menu-container {
  width: 100%;
  height: 100vh;

  .side-menu {
    background-color: #263238;
    color: white;
    height: 100vh;
    display: flex;
    flex-direction: column;

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
    }
  }
}
</style>
