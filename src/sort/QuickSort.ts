import Sort from "./Sort";
import { ColorFilter } from "./ColorFilter";

export default class QuickSort extends Sort {

    /** ソート処理のステータス */
    private readonly STATUS = {
        Pivot: 0,
        SearchLeft: 1,
        SearchRighr: 2,
        Swap: 3,
        Split: 4,
        Recursion: 5,
        Complete: 6
    }

    /** プロセス状態 */
    private process: number;

    /** ピボット */
    private pivot: number;

    /** ソート範囲 開始位置 */
    private start: number;

    /** ソート範囲 終了位置 */
    private end: number;

    /** 左検索位置 */
    private leftIndex: number;

    /** 左データ */
    private leftData: number;

    /** 右検索位置 */
    private rightIndex: number;

    /** 右データ */
    private rightData: number;

    private sortAreaStack: {
        start: number,
        end: number
    }[]

    /**
    * 初期化
    */
    public init(dataNum: number, skip: number): void {
        super.init(dataNum, skip);

        this.process = this.STATUS.Pivot;
        this.start = 0;
        this.end = this.data.size() - 1;
        this.leftIndex = null;
        this.leftData = null;
        this.rightIndex = null;
        this.rightData = null;
        this.sortAreaStack = [];
    }


    public next(): boolean {

        switch (this.process) {
            case this.STATUS.Pivot:
                this.selectPivot();
                break;

            case this.STATUS.SearchLeft:
                this.nextLeftSelect();
                break;

            case this.STATUS.SearchRighr:
                this.nextRightSearch();
                break;

            case this.STATUS.Swap:
                this.swap();
                break;

            case this.STATUS.Split:
                this.split();
                break;

            case this.STATUS.Recursion:
                this.recursion();
                break;

            case this.STATUS.Complete:
                return false;
        }

        return true;
    }


    /**
     * ピボットを選定する
     */
    private selectPivot(): void {

        // 先頭のデータをピボットに設定
        this.pivot = this.data.get(this.start).value;
        this.data.setColorFilter(this.start, ColorFilter.point);

        this.process = this.STATUS.SearchLeft;
    }


    private nextLeftSelect(): void {

        if (this.leftIndex == null) {
            this.setLeftIndex(this.start);
        } else {
            this.setLeftIndex(this.leftIndex + 1);
        }

        // ピボットと比較
        if (this.pivot <= this.data.get(this.leftIndex).value) {
            this.leftData = this.data.get(this.leftIndex).value;
            this.process = this.STATUS.SearchRighr;
        }
    }


    /**
     * 左検索位置を移動する
     * @param index 移動先
     */
    private setLeftIndex(index: number): void {

        // 前回位置がある場合は色を戻す
        if (this.leftIndex || this.leftIndex == 0) {
            if (this.data.get(this.leftIndex).value == this.pivot) {
                this.data.setColorFilter(this.leftIndex, ColorFilter.point);
            } else {
                this.data.clearColorFilter(this.leftIndex);
            }
        }

        this.leftIndex = index;
        this.data.setColorFilter(index, ColorFilter.active);
    }


    /**
     * 右検索を実施
     */
    private nextRightSearch(): void {

        // 初期検索時は終了位置へ
        if (this.rightIndex == undefined || this.rightIndex == null) {
            this.setRightIndex(this.end);
        } else {
            this.setRightIndex(this.rightIndex - 1);
        }

        // ピボットと比較
        if (this.data.get(this.rightIndex).value <= this.pivot) {
            this.rightData = this.data.get(this.rightIndex).value;
            this.process = this.STATUS.Swap;
        }
    }


    /**
     * 右検索位置を移動する
     * @param index 移動先
    */
    private setRightIndex(index: number): void {

        // 前回位置がある場合は色を戻す
        if (this.rightIndex || this.rightIndex == 0) {
            if (this.data.get(this.rightIndex).value == this.pivot) {
                this.data.setColorFilter(this.rightIndex, ColorFilter.point);
            } else {
                this.data.clearColorFilter(this.rightIndex);
            }
        }

        this.rightIndex = index;
        this.data.setColorFilter(index, ColorFilter.active);
    }


    /**
     * データの交換を実施
     */
    private swap(): void {

        // 位置が左右逆転していたらスキップ＆次のプロセスへ
        if (this.rightIndex <= this.leftIndex) {
            this.process = this.STATUS.Split;
            return;
        }

        this.data.swap(this.leftIndex, this.rightIndex);
        this.process = this.STATUS.SearchLeft;
    }


    private split(): void {

        // 色をリセット
        this.data.clearColorFilter(this.leftIndex);
        this.data.clearColorFilter(this.rightIndex);
        for (let i = 0; i < this.data.size(); i++) {
            if (this.data.get(i).value == this.pivot) {
                this.data.clearColorFilter(i);
            }
        }


        let rightArea = this.rightIndex + 1;
        if (rightArea < this.end) {
            this.sortAreaStack.push({
                start: rightArea,
                end: this.end
            });
        }

        let leftArea = this.leftIndex - 1;
        if (this.start < leftArea) {
            this.sortAreaStack.push({
                start: this.start,
                end: leftArea
            });
        }

        this.process = this.STATUS.Recursion

    }


    private recursion(): void {

        var area = this.sortAreaStack.pop();

        if (!area) {
            this.process = this.STATUS.Complete;
            return;
        }

        this.start = area.start;
        this.end = area.end;
        this.leftIndex = null;
        this.rightIndex = null;

        this.process = this.STATUS.Pivot;
    }
}