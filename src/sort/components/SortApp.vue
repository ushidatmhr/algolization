<template>
  <div class="container">
    <header class="header">
      <div class="sub-area">
        <img src="../../../images/bars-solid.svg" @click="openMenu">
      </div>
      <div class="main-area">{{title}}</div>
      <div class="sub-area"></div>
    </header>

    <div class="main-container">
      <nav class="menu">
        <Menu v-bind:isOpen="menuOpen" v-on:applyTitle="title = $event"/>
      </nav>
      <section class="main">
        <Sort/>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      menuOpen: false,
      title: String
    };
  },
  mounted() {
    this.title = this.$route.path.replace("/", "");
  },
  methods: {
    openMenu() {
      this.menuOpen = !this.menuOpen;
    }
  }
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .header {
    // position: fixed;
    height: 57px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #607d8b;
    border-bottom: 3px solid #cfd8dc;
    color: white;
    z-index: 9;

    @media screen and (min-width: 481px) {
      & {
        display: none;
      }
    }

    .sub-area {
      width: 50px;

      img {
        width: 25px;
        padding: 10px;
      }
    }

    .main-area {
      font-size: 150%;
      line-height: 57px;
      text-align: center;
      flex-grow: 1;
    }
  }

  .main-container {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .main {
      flex-grow: 1;
      height: 100%;
    }
  }
}
</style>
