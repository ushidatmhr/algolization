import Sort from "./Sort";
import { Color, ColorFilter } from "./ColorFilter";

export default class InsertionSort extends Sort {

    /** ソート処理のステータス */
    private readonly STATUS = {
        Select: 0,
        Insert: 1,
        Complete: 2
    }

    /** カーソル位置 */
    private cursor: number;

    /** ソート完了済みの位置を保持 */
    private sortedIndex: number;

    /** プロセス状態 */
    private process: number;


    /**
     * 初期化
     * @param dataNum データ数
     */
    public init(dataNum: number, skip: number): void {
        super.init(dataNum, skip);

        this.sortedIndex = -1;
        this.process = this.STATUS.Select;
    }


    public next(): boolean {

        switch (this.process) {
            case this.STATUS.Select:
                this.nextInsertTarget();
                break;

            case this.STATUS.Insert:
                this.nextSwapToInsert();
                break;

            case this.STATUS.Complete:
                return false;
        }

        return true;
    }


    /**
     * 次の挿入対象の要素を選択する。
     */
    private nextInsertTarget(): void {

        this.cursor = this.sortedIndex + 1;

        if (this.cursor == this.data.size()) {
            this.process = this.STATUS.Complete;
            return;
        }

        this.data.setColorFilter(this.cursor, ColorFilter.active);

        this.process = this.STATUS.Insert;
    }


    /**
     * 隣の要素と比較して、大小が逆なら交換する。
     */
    private nextSwapToInsert(): void {

        if (this.cursor == 0
            || this.data.compare(this.cursor - 1, this.cursor) <= 0) {

            this.sortedIndex++;

            this.data.clearColorFilter(this.cursor);
            this.data.setColor(this.cursor, Color.complete);

            this.process = this.STATUS.Select;

            return
        } else {
            this.data.swap(this.cursor - 1, this.cursor);
        }

        this.cursor--;
    }

}