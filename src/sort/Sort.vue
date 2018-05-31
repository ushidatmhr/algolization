<template>
  <div id="canvas"></div>
</template>

<script lang="ts">
import Vue from "vue";
import Sort from "./BubleSort";

export default Vue.extend({
  data() {
    return {};
  },
  mounted() {
    var sort = new Sort("canvas");
    sort.init(10);
  }
});
</script>

<style lang="scss" scoped>
.example {
  color: red;
}
</style>