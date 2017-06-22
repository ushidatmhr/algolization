/// <reference path="Sort.ts" /> 

enum SelectedSortState {
    Search,
    Exchange,
    Complete
}

class SelectedSort extends Sort {

    /** カーソル位置 */
    private cursor: number;

    /** 最小値データ位置 */
    private minDataIndex: number;

    /** ソート完了済みの位置を保持 */
    private sortedIndex: number;

    /** プロセス */
    private state: SelectedSortState;

    /**
     * コンストラクタ
     * 
     * @param id
     */
    constructor(id: string) {
        super(id);
    }


    /**
     * クリア
     */
    protected clear() {
        super.clear();

        this.cursor = -1;
        this.sortedIndex = -1;
        this.state = SelectedSortState.Search;
        this.minDataIndex = -1;
    }


    /**
     * 初期化処理
     * 
     * @param dataNum 
     */
    public init(dataNum: number) {
        this.clear();
        super.init(dataNum);
    }


    /**
     * リセット
     * 
     * @param dataNum
     */
    public reset(dataNum: number) {
        this.clear();
        super.reset(dataNum);
    }


    public next(): boolean {

        if (this.data.length - 2 <= this.sortedIndex) {
            return false;
        }

        // プロセスによってソート処理実行
        switch (this.state) {
            case SelectedSortState.Search:
                this.nextSearch();
                break;

            case SelectedSortState.Exchange:
                this.exchangeData();
                break;

            case SelectedSortState.Complete:
                return false;
        }

        return true;
    }


    /**
     * 最小値の検索
     */
    private nextSearch() {

        if (this.cursor != this.sortedIndex) {
            if (this.cursor == this.minDataIndex) {
                // 色を変更
                this.setColorFilter(this.cursor, this.colorFilter.point);

            } else {
                this.clearColorFilter(this.cursor);
            }
        }

        this.cursor++;

        // 右端まで検索したら終了
        if (this.data.length <= this.cursor) {
            this.state = SelectedSortState.Exchange;
            return;
        }


        // 色を変更
        this.setColorFilter(this.cursor, this.colorFilter.active);

        // 現在の最小値と比較
        if (this.minDataIndex < 0 || this.data[this.cursor].data < this.data[this.minDataIndex].data) {

            // 色を戻す
            if (0 <= this.minDataIndex) {
                this.clearColorFilter(this.minDataIndex);
            }

            this.minDataIndex = this.cursor;

        }

    }


    /**
     * 最小値を左端と交換
     */
    private exchangeData() {

        this.sortedIndex++;

        if (this.sortedIndex != this.minDataIndex) {
            this.exchange(this.sortedIndex, this.minDataIndex);
        }

        // 色を変更
        this.clearColorFilter(this.sortedIndex);
        this.data[this.sortedIndex].graphic.tint = this.color.complete;


        // 右端手前までソートできたら完了
        if (this.data.length - 2 <= this.sortedIndex) {
            this.state = SelectedSortState.Complete;

            //最後の要素に色
            this.data[this.sortedIndex + 1].graphic.tint = this.color.complete;

            return;
        }


        this.minDataIndex = -1;
        this.cursor = this.sortedIndex;
        this.state = SelectedSortState.Search;
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