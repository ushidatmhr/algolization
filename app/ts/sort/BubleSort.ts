/// <reference path="Sort.ts" /> 

enum BubleSortState {
    Compare,
    Exchange,
    Complete
}


class BubleSort extends Sort {

    /** プロセス */
    private state: BubleSortState;

    /** カーソル位置 */
    private cursor: number;

    /** ソート完了済みの位置を保持 */
    private sortedIndex: number;

    constructor(id: string, callback: () => void) {
        super(id, callback);
    }


    /**
     * クリア
     */
    protected clear() {
        super.clear();

        this.state = BubleSortState.Compare;
        this.cursor = -1;

    }


    /**
     * 初期化処理
     * 
     * @param dataNum 
     */
    public init(dataNum: number) {
        this.clear();
        super.init(dataNum);

        this.sortedIndex = this.data.length;
    }


    /**
     * 次へ
     */
    public next(): boolean {

        // ソート完了済みなら終了
        if (this.state == BubleSortState.Complete) {
            return false;
        }

        switch (this.state) {
            case BubleSortState.Compare:
                this.nextCursor();
                break;

            case BubleSortState.Exchange:
                this.exchange();
                break;
        }

        return true;
    }


    /**
     * カーソルを次の位置へ移動 ＆ 値の比較
     */
    private nextCursor() {

        if (-1 < this.cursor) {
            this.inactive(this.cursor);
            this.inactive(this.cursor + 1);
        }

        this.cursor++;

        if (this.sortedIndex - 1 <= this.cursor) {
            this.cursor = 0;
            this.sortedIndex--;

            this.data[this.sortedIndex].graphic.tint = this.color.complete;

            if (this.sortedIndex == 1) {
                this.state = BubleSortState.Complete;
                this.data[0].graphic.tint = this.color.complete
                return;
            }
        }

        this.active(this.cursor);
        this.active(this.cursor + 1);


        if (this.compare(this.cursor, this.cursor + 1)) {
            this.state = BubleSortState.Compare;
        } else {
            this.state = BubleSortState.Exchange;
        }

    }


    /**
     * 2つのデータの大きさを比較
     * 
     * @param i 
     * @param j 
     * @return 右のデータのほうが大きい：true
     */
    private compare(i: number, j: number): boolean {
        return this.data[i].data < this.data[j].data;
    }


    /**
     * 現在のカーソル位置にある要素を交換する
     */
    private exchange() {

        var i: number = this.cursor;
        var j: number = this.cursor + 1;

        // x座標入れ替え
        var xTemp = this.data[i].graphic.x;
        this.data[i].graphic.x = this.data[j].graphic.x;
        this.data[j].graphic.x = xTemp;

        // 配列入れ替え
        var temp = this.data[i];
        this.data[i] = this.data[j];
        this.data[j] = temp;

        this.state = BubleSortState.Compare;
    }


    /**
     * リセット
     * 
     * @param dataNum
     */
    public reset(dataNum: number) {
        this.clear();
        super.reset(dataNum);
        this.sortedIndex = this.data.length;
    }
}