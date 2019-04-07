<template>
  <div class="container">
    <nav class="menu">
      <Menu/>
    </nav>
    <section class="main">
      <Sort/>
    </section>
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
.container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;

  .menu {
    min-width: 200px;
  }

  @media screen and (max-width: 480px) {
    .menu {
      display: none;
    }
  }

  .main {
    flex-grow: 1;
  }
}
</style>
