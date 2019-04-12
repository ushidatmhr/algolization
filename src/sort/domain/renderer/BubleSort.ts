import Sort from './Sort'
import { Color } from '../structure/ColorFilter';

export default class BubleSort extends Sort {

    /** ソート処理のステータス */
    private readonly STATUS = {
        Compare: 0,
        Swap: 1,
        Complete: 2
    }

    /** プロセス状態 */
    private process: number;

    /** カーソル位置 */
    private cursor: number;

    /** ソート完了済みの位置 */
    private sortedIndex: number;

    /**
     * 初期化
     * @param dataNum データ数
     */
    public init(dataNum: number, skip: number): void {
        super.init(dataNum, skip);

        this.process = this.STATUS.Compare;
        this.cursor = -1;
        this.sortedIndex = this.data.size();
    }



    public next(): boolean {

        if (this.process == this.STATUS.Complete) {
            return false;
        }

        switch (this.process) {
            case this.STATUS.Compare:
                this.nextCompare();
                break;
            case this.STATUS.Swap:
                this.swapCursorData();
                break;
        }

        return true;
    }


    /**
     * 次の要素の比較処理を実行
     */
    private nextCompare(): void {

        if (-1 < this.cursor) {
            this.data.clearColor(this.cursor);
            this.data.clearColor(this.cursor + 1);
        }

        this.cursor++;

        // ソート済み位置の手前まできたか
        if (this.sortedIndex - 1 <= this.cursor) {
            this.repeatCompare();

            // ソート完了のチェック
            if (this.sortedIndex == 1) {
                this.process = this.STATUS.Complete;
                this.data.setColor(0, Color.complete);
                return;
            }
        }

        this.data.pushColor(this.cursor, Color.active);
        this.data.pushColor(this.cursor + 1, Color.active);

        // 隣同士の要素を比較する
        if (this.data.compare(this.cursor, this.cursor + 1) < 0) {
            this.process = this.STATUS.Compare;
        } else {
            this.process = this.STATUS.Swap;
        }

    }


    /**
     * 要素の交換処理を実行
     */
    private swapCursorData() {
        this.data.swap(this.cursor, this.cursor + 1);
        this.process = this.STATUS.Compare;
    }


    /**
     * 右端をソート済みにして、カーソル位置を戻す
     */
    private repeatCompare(): void {
        this.cursor = 0;
        this.sortedIndex--;
        this.data.setColor(this.sortedIndex, Color.complete);
    }
}