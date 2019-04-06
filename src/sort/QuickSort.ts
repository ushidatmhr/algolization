import Sort from "./Sort";
import { ColorFilter, Color } from "./ColorFilter";

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
        this.data.pushColor(this.start, Color.point);

        this.process = this.STATUS.SearchLeft;
    }


    /**
     * 左検索を実施
     */
    private nextLeftSelect(): void {

        if (this.leftIndex == null) {
            this.leftIndex = this.setNextIndex(this.start, null);
        } else {
            this.leftIndex = this.setNextIndex(this.leftIndex + 1, this.leftIndex);
        }

        // ピボットと比較
        if (this.pivot <= this.data.get(this.leftIndex).value) {
            this.leftData = this.data.get(this.leftIndex).value;
            this.process = this.STATUS.SearchRighr;
        }
    }


    /**
     * 右検索を実施
     */
    private nextRightSearch(): void {

        // 初期検索時は終了位置へ
        if (this.rightIndex == undefined || this.rightIndex == null) {
            this.rightIndex = this.setNextIndex(this.end, null);
        } else {
            this.rightIndex = this.setNextIndex(this.rightIndex - 1, this.rightIndex);
        }

        // ピボットと比較
        if (this.data.get(this.rightIndex).value <= this.pivot) {
            this.rightData = this.data.get(this.rightIndex).value;
            this.process = this.STATUS.Swap;
        }
    }


    /**
     * 検索位置を移動する
     * @param nextIndex 移動先
     * @param beforeIndex 移動前の位置
     * @returns 移動先位置
     */
    private setNextIndex(nextIndex: number, beforeIndex: number): number {

        // 前回位置がある場合は色を戻す
        if (!(beforeIndex == null)) {
            if (this.data.get(beforeIndex).value == this.pivot) {
                this.data.pushColor(beforeIndex, Color.point);
            } else {
                this.data.clearColor(beforeIndex)
            }
        }

        this.data.pushColor(nextIndex, Color.active);

        return nextIndex;
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


    /**
     * 現在のソート範囲を分割して、スタックにつめる
     */
    private split(): void {

        // 色をリセット
        this.data.clearColor(this.leftIndex);
        this.data.clearColor(this.rightIndex);

        for (let i = 0; i < this.data.size(); i++) {
            if (this.data.get(i).value == this.pivot) {
                this.data.clearColor(i);
            }
        }


        let rightArea = this.rightIndex + 1;
        if (rightArea < this.end) {
            this.sortAreaStack.push({
                start: rightArea,
                end: this.end
            });
        } else {
            // 分割できなければソート済みエリアにする。
            this.data.setColor(this.start, Color.complete);
            this.data.setColor(this.end, Color.complete);
        }

        let leftArea = this.leftIndex - 1;
        if (this.start < leftArea) {
            this.sortAreaStack.push({
                start: this.start,
                end: leftArea
            });
        } else {
            // 分割できなければソート済みエリアにする。
            this.data.setColor(this.start, Color.complete);
            this.data.setColor(this.end, Color.complete);
        }

        this.process = this.STATUS.Recursion

    }


    /**
     * 次のソート範囲をスタックから取得する。
     */
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

        // ソート範囲外をグレーアウトする。
        for (let i = 0; i < this.data.size(); i++) {

            if (area.start <= i && i <= area.end) {
                this.data.clearColor(i);
            } else {
                // ソート済みならグレーアウトしない
                if (this.data.get(i).graphic.tint != Color.complete) {
                    this.data.pushColor(i, Color.disable);
                }
            }
        }

        this.process = this.STATUS.Pivot;
    }

}