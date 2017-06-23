/// <reference path="Sort.ts" />

enum InsertionSortState {
    Select,
    Insert,
    Complete
}

class InsertionSort extends Sort {

    private cursor: number;

    /** ソート完了済みの位置を保持 */
    private sortedIndex: number;

    private state: InsertionSortState;


    /**
    * 初期化
    */
    public init(dataNum: number) {
        super.init(dataNum);

        this.sortedIndex = -1;
        this.state = InsertionSortState.Select;
    }


    public reset(dataNum: number) {
        super.reset(dataNum);

        this.sortedIndex = -1;
        this.state = InsertionSortState.Select;
    }


    public next(): boolean {

        // プロセスによってソート処理実行
        switch (this.state) {
            case InsertionSortState.Select:
                this.selectNextTarget();
                break;

            case InsertionSortState.Insert:
                this.insert();
                break;

            case InsertionSortState.Complete:
                return false;
        }


        return true;
    }


    /**
     * 次の挿入対象を選択
     */
    private selectNextTarget() {

        this.cursor = this.sortedIndex + 1;

        // 右端までいったらソート完了
        if (this.cursor == this.data.length) {
            this.state = InsertionSortState.Complete;
            return;
        }

        //色変更
        this.setColorFilter(this.cursor, this.colorFilter.active);

        this.state = InsertionSortState.Insert;

    }


    /**
     * 挿入処理
     */
    private insert() {

        // 左端または交換が発生しないなら終了
        if (this.cursor == 0 || this.data[this.cursor - 1].data <= this.data[this.cursor].data) {
            this.state = InsertionSortState.Select;
            this.sortedIndex++;

            //色変更
            this.clearColorFilter(this.cursor);
            this.data[this.cursor].graphic.tint = this.color.complete;

            return;

        } else {
            this.exchange(this.cursor - 1, this.cursor);
        }

        this.cursor--;
    }


    /**
     * 2つの位置の要素を交換する
     */
    private exchange(i: number, j: number) {

        // x座標入れ替え
        var xTemp = this.data[i].graphic.x;
        this.data[i].graphic.x = this.data[j].graphic.x;
        this.data[j].graphic.x = xTemp;

        // 配列入れ替え
        var temp = this.data[i];
        this.data[i] = this.data[j];
        this.data[j] = temp;

    }
}