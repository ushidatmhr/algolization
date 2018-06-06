import Sort from "./Sort";
import { ColorFilter, Color } from "./ColorFilter";

export default class SelectedSort extends Sort {

    /** ソート処理のステータス */
    private readonly STATUS = {
        Search: 0,
        Swap: 1,
        Complete: 2
    }

    /** プロセス状態 */
    private process: number;

    /** カーソル位置 */
    private cursor: number;

    /** 最小値データ位置 */
    private minDataIndex: number;

    /** ソート完了済みの位置を保持 */
    private sortedIndex: number;


    /**
     * 初期化処理
     * @param dataNum 
     */
    public init(dataNum: number) {
        super.init(dataNum);

        this.process = this.STATUS.Search;
        this.cursor = -1;
        this.minDataIndex = -1;
        this.sortedIndex = -1;
    }


    public next(): boolean {

        switch (this.process) {
            case this.STATUS.Search:
                this.nextSearchMin();
                break;

            case this.STATUS.Swap:
                this.swapMinData();
                break;

            case this.STATUS.Complete:
                return false;
        }

        return true;

    }


    /**
     * 最小値の検索処理
     */
    private nextSearchMin(): void {

        if (this.cursor != this.sortedIndex) {
            if (this.cursor == this.minDataIndex) {
                // 色を変更
                this.data.setColorFilter(this.cursor, ColorFilter.point);

            } else {
                this.data.clearColorFilter(this.cursor);
            }
        }

        this.cursor++;

        // 右端まで検索したら終了
        if (this.cursor == this.data.size()) {
            this.process = this.STATUS.Swap;
            return;
        }

        this.data.setColorFilter(this.cursor, ColorFilter.active);

        // 現在の最小値と比較
        if (this.minDataIndex < 0
            || this.data.compare(this.cursor, this.minDataIndex) < 0) {

            // 色を戻す
            if (0 <= this.minDataIndex) {
                this.data.clearColorFilter(this.minDataIndex);
            }

            this.minDataIndex = this.cursor;

        }

    }


    /**
     * 最小値を左端と交換する
     */
    private swapMinData(): void {

        this.sortedIndex++;

        if (this.sortedIndex != this.minDataIndex) {
            this.data.swap(this.sortedIndex, this.minDataIndex);
        }

        // 色を変更
        this.data.clearColorFilter(this.sortedIndex);
        this.data.setColor(this.sortedIndex, Color.complete);


        // 右端手前までソートできたら完了
        if (this.data.size() - 2 <= this.sortedIndex) {
            this.process = this.STATUS.Complete;

            //最後の要素に色
            this.data.setColor(this.sortedIndex + 1, Color.complete);

            return;
        }


        this.minDataIndex = -1;
        this.cursor = this.sortedIndex;
        this.process = this.STATUS.Search;
    }
}