<template>
  <div class="container">
    <div id="canvas"></div>
    <section>
      <button class="control label" @click="nextStep()">NEXT</button>
      <button class="control label" @click="resetSort()">RESET</button>
    </section>
    <section>
      <button class="control circle" @click="addSortNum(-10)">-</button>
      <button class="control circle" @click="addSortNum(-1)">-</button>
      <span class="control">{{ sortOptions.dataNum }}</span>
      <button class="control circle" @click="addSortNum(1)">+</button>
      <button class="control circle" @click="addSortNum(10)">+</button>
    </section>
    <section>
      <button class="control label" :class="[sortOptions.isAuto ? 'active' : '']" @click="toggleAuto()">AUTO</button>
      <button class="control label" :class="sortOptions.fast == 1 ? 'active' : ''" @click="setFast(1)">×1</button>
      <button class="control label" :class="sortOptions.fast == 10 ? 'active' : ''" @click="setFast(10)">×10</button>
      <button class="control label" :class="sortOptions.fast == 100 ? 'active' : ''" @click="setFast(100)">×100</button>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref, reactive, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Sort from "../domain/renderer/Sort";
import BubleSort from "../domain/renderer/BubleSort";
import InsertionSort from "../domain/renderer/InsertionSort";
import SelectedSort from "../domain/renderer/SelectedSort";
import QuickSort from "../domain/renderer/QuickSort";

var sort: Sort;

export default defineComponent({
  setup(props, context) {
    const route = useRoute();

    // ソートオプション
    const sortOptions = reactive({
      dataNum: 10,
      fast: 1,
      isAuto: false,
    });

    /**
     * ソート処理を次のステップに進める
     */
    const nextStep = () => {
      sort.update();
      autoModeReset;
    };

    /**
     * ソートをリセット
     */
    const resetSort = () => {
      sort.reset(sortOptions.dataNum);
      autoModeReset();
    };

    /**
     * データの件数増減
     * @param count 増減数
     */
    const addSortNum = (count) => {
      sortOptions.dataNum += count;

      if (sortOptions.dataNum < 2) {
        sortOptions.dataNum = 2;
      }

      sort.reset(sortOptions.dataNum);
      autoModeReset();
    };

    /**
     * オートモードの切り替え
     */
    const toggleAuto = () => {
      setFast(sortOptions.fast);
      sortOptions.isAuto = !sortOptions.isAuto;
    };

    /**
     * オートモードの速度設定
     */
    const setFast = (fast: number) => {
      sortOptions.fast = fast;
      sort.autoSkip = sortOptions.fast;
    };

    /**
     * オートモードのリセット
     */
    const autoModeReset = () => {
      sortOptions.isAuto = false;
    };

    /**
     * URLクエリパラメータ変更時にソートコンポーネントを変更
     */
    watch(
      () => route.query.id,
      async (newId: string) => {
        setSortComponent(context, newId, sortOptions.dataNum, sortOptions.fast);
        autoModeReset();
      },
    );

    /**
     * オートモードフラグの監視
     */
    watch(
      () => sortOptions.isAuto,
      (newAuto: boolean) => {
        sort.setAutoMode(newAuto);
        setFast(sortOptions.fast);
      },
    );

    return {
      sortOptions,
      nextStep,
      resetSort,
      addSortNum,
      toggleAuto,
      setFast,
    };
  },
});

/**
 * ソートアルゴリズムの切り替え
 * @param context コンテキスト
 * @param mode ソートアルゴリズム
 * @param dataNum データ数
 * @param fast 速度
 */
const setSortComponent = (context: SetupContext, mode: string, dataNum: number, fast: number) => {
  if (sort != null) {
    sort.destory();
  }

  switch (mode) {
    case "BubleSort":
      sort = new BubleSort("canvas", () => {});
      break;
    case "InsertionSort":
      sort = new InsertionSort("canvas", () => {});
      break;
    case "SelectedSort":
      sort = new SelectedSort("canvas", () => {});
      break;
    case "QuickSort":
      sort = new QuickSort("canvas", () => {});
      break;
    default:
      sort = new BubleSort("canvas", () => {});
      break;
  }

  sort.init(dataNum, fast);
};
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
