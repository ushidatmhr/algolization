<template>
  <div class="container">
    <div id="canvas"></div>
    <section>
      <button class="control label" @click="nextStep()">NEXT</button>
      <button class="control label" @click="resetMaze()">RESET</button>
    </section>
    <section>
      <button class="control circle" @click="addMazeSize(-10)">-</button>
      <button class="control circle" @click="addMazeSize(-1)">-</button>
      <span class="control">{{ mazeOptions.dataNum }}</span>
      <button class="control circle" @click="addMazeSize(1)">+</button>
      <button class="control circle" @click="addMazeSize(10)">+</button>
    </section>
    <section>
      <button class="control label" :class="[mazeOptions.isAuto ? 'active' : '']" @click="toggleAuto()">AUTO</button>
      <button class="control label" :class="mazeOptions.fast == 1 ? 'active' : ''" @click="setFast(1)">×1</button>
      <button class="control label" :class="mazeOptions.fast == 10 ? 'active' : ''" @click="setFast(10)">×10</button>
      <button class="control label" :class="mazeOptions.fast == 100 ? 'active' : ''" @click="setFast(100)">×100</button>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref, reactive, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Maze from "../domain/renderer/Maze";
import RecursiveBacktrackingMaze from "../domain/renderer/RecursiveBacktrackingMaze";
import StickDownMaze from "../domain/renderer/StickDownMaze";

var maze: Maze;

export default defineComponent({
  setup(props, context) {
    const route = useRoute();

    // 迷路生成オプション
    const mazeOptions = reactive({
      dataNum: 5,
      fast: 1,
      isAuto: false,
    });

    /**
     * 迷路生成を次のステップに進める
     */
    const nextStep = () => {
      maze.update();
      autoModeReset();
    };

    /**
     * 迷路をリセット
     */
    const resetMaze = () => {
      maze.reset(mazeOptions.dataNum);
      autoModeReset();
    };

    /**
     * 迷路サイズの増減
     */
    const addMazeSize = (count: number) => {
      mazeOptions.dataNum += count;

      if (mazeOptions.dataNum < 2) {
        mazeOptions.dataNum = 2;
      }

      maze.reset(mazeOptions.dataNum);
      autoModeReset();
    };

    /**
     * オートモードの切り替え
     */
    const toggleAuto = () => {
      setFast(mazeOptions.fast);
      mazeOptions.isAuto = !mazeOptions.isAuto;
    };

    /**
     * オートモードの速度設定
     */
    const setFast = (fast: number) => {
      mazeOptions.fast = fast;
      maze.autoSkip = mazeOptions.fast;
    };

    /**
     * オートモードのリセット
     */
    const autoModeReset = () => {
      mazeOptions.isAuto = false;
    };

    /**
     * URLクエリパラメータ変更時に迷路生成コンポーネントを変更
     */
    watch(
      () => route.query.id,
      async (newId: string) => {
        setSortComponent(context, newId, mazeOptions.dataNum, mazeOptions.fast);
        autoModeReset();
      },
    );

    /**
     * オートモードフラグの監視
     */
    watch(
      () => mazeOptions.isAuto,
      (newAuto: boolean) => {
        maze.setAutoMode(newAuto);
        setFast(mazeOptions.fast);
      },
    );

    return {
      mazeOptions,
      nextStep,
      resetMaze,
      addMazeSize,
      setFast,
      toggleAuto,
    };
  },
});

const setSortComponent = (context: SetupContext, mode: string, dataNum: number, fast: number) => {
  if (maze != null) {
    maze.destory();
  }

  switch (mode) {
    case "StickDown":
      maze = new StickDownMaze("canvas", () => {});
      break;
    case "RecursiveBacktrackingMaze":
      maze = new RecursiveBacktrackingMaze("canvas", () => {});
      break;
    default:
      maze = new StickDownMaze("canvas", () => {});
      break;
  }

  maze.init(dataNum, fast);
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
