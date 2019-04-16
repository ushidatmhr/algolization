<template>
  <div class="menu-container" :class="isOpen ? 'open' : 'close'">
    <nav class="side-menu">
      <div class="head">MAZE</div>
      <div
        class="menu-item"
        :class="[$route.path == '/StickDown' || $route.path == '/' ? 'active' : '']"
        @click="pushRoute('StickDown')"
      >棒倒し法</div>
      <div
        class="menu-item"
        :class="[$route.path == '/RecursiveBacktrackingMaze' ? 'active' : '']"
        @click="pushRoute('RecursiveBacktrackingMaze')"
      >穴掘り法</div>
      <div class="menu-item" :class="[$route.path == '/' ? 'active' : '']" @click="pushRoute('')"></div>
      <div class="menu-item" :class="[$route.path == '/' ? 'active' : '']" @click="pushRoute('')"></div>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    isOpen: Boolean
  },
  data() {
    return {};
  },
  methods: {
    pushRoute(route: string) {
      this.$router.push(route);
      this.$emit("applyTitle", route);
    }
  }
});
</script>

<style lang="scss" scoped>
.menu-container {
  min-width: 200px;
  height: 100vh;
  transition: all 300ms 0s ease;

  @media screen and (max-width: 480px) {
    & {
      height: 105vh;
      position: fixed;
      top: -13px;
      left: -200px;
    }

    &.open {
      transform: translateX(200px);
    }
  }

  .side-menu {
    background-color: #263238;
    color: white;
    height: 100%;
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
