/// <reference path="Sort.ts" />

enum QuickSortState {
    PIVOT,
    SEARCH_LEFT,
    SEARCH_RIGHT,
    EXCHANGE,
    SPLIT,
    RECURSION,
    COMPLETE
}

class QuickSort extends Sort {

    /** ソート範囲 開始位置 */
    private start: number;

    /** ソート範囲 終了位置 */
    private end: number;

    /** ピボット */
    private pivot: number;

    /** 左検索位置 */
    private leftIndex: number;

    /** 左データ */
    private leftData: number;

    /** 右検索位置 */
    private rightIndex: number;

    /** 右データ */
    private rightData: number;

    private stack: {
        start: number,
        end: number
    }[];

    /** プロセス */
    private state: QuickSortState;

    /**
    * 初期化
    */
    public init(dataNum: number) {
        super.init(dataNum);

        this.clearParam(dataNum);
    }


    public reset(dataNum: number) {
        super.reset(dataNum);
        this.clearParam(dataNum);
    }


    protected clearParam(dataNum: number) {
        this.state = QuickSortState.PIVOT;
        this.start = 0;
        this.end = dataNum - 1;
        this.pivot = null;
        this.leftIndex = null;
        this.leftData = null;
        this.rightIndex = null;
        this.rightData = null;
        this.stack = [];
    }


    public next(): boolean {

        switch (this.state) {
            case QuickSortState.PIVOT:
                this.selectPivot();
                break;

            case QuickSortState.SEARCH_LEFT:
                this.nextLeftSearch();
                break;

            case QuickSortState.SEARCH_RIGHT:
                this.nextRightSearch();
                break;

            case QuickSortState.EXCHANGE:
                this.doExchange();
                break;

            case QuickSortState.SPLIT:
                this.split();
                break;

            case QuickSortState.RECURSION:
                this.recursion();
                break;

            case QuickSortState.COMPLETE:
                return false;
        }

        return true;
    }


    /**
     * ピボットを選定する
     */
    private selectPivot() {
        // 中央位置のデータをピボットにする
        // var index = Math.floor((this.start + this.end) / 2);
        // this.pivot = this.data[index].data;
        // this.setColorFilter(index, this.colorFilter.point);

        // 先頭のデータをピボットに設定
        this.pivot = this.data[this.start].data;
        this.setColorFilter(this.start, this.colorFilter.point);

        this.state = QuickSortState.SEARCH_LEFT;
    }


    /**
     * 左検索を実施
     */
    private nextLeftSearch() {

        // 初期検索時は開始位置へ
        if (this.leftIndex == undefined || this.leftIndex == null) {
            this.setLeftIndex(this.start);
        } else {
            this.setLeftIndex(this.leftIndex + 1);
        }

        // ピボットと比較
        if (this.pivot <= this.data[this.leftIndex].data) {
            this.leftData = this.data[this.leftIndex].data;
            this.state = QuickSortState.SEARCH_RIGHT;
        }
    }


    /**
     * 左検索位置を移動する
     * @param index 移動先
     */
    private setLeftIndex(index: number) {

        // 前回位置がある場合は色を戻す
        if (this.leftIndex || this.leftIndex == 0) {
            if (this.data[this.leftIndex].data == this.pivot) {
                this.setColorFilter(this.leftIndex, this.colorFilter.point);
            } else {
                this.clearColorFilter(this.leftIndex);
            }
        }

        this.leftIndex = index;
        this.setColorFilter(index, this.colorFilter.active);
    }


    /**
     * 右検索を実施
     */
    private nextRightSearch() {

        // 初期検索時は終了位置へ
        if (this.rightIndex == undefined || this.rightIndex == null) {
            this.setRightIndex(this.end);
        } else {
            this.setRightIndex(this.rightIndex - 1);
        }

        // ピボットと比較
        if (this.data[this.rightIndex].data <= this.pivot) {
            this.rightData = this.data[this.rightIndex].data;
            this.state = QuickSortState.EXCHANGE;

        }
    }


    /**
     * 右検索位置を移動する
     * @param index 移動先
     */
    private setRightIndex(index: number) {

        // 前回位置がある場合は色を戻す
        if (this.rightIndex || this.rightIndex == 0) {
            if (this.data[this.rightIndex].data == this.pivot) {
                this.setColorFilter(this.rightIndex, this.colorFilter.point);
            } else {
                this.clearColorFilter(this.rightIndex);
            }
        }

        this.rightIndex = index;
        this.setColorFilter(index, this.colorFilter.active);
    }


    /**
     * データの交換を実施
     */
    private doExchange() {

        // 位置が左右逆転していたらスキップ＆次のプロセスへ
        if (this.rightIndex <= this.leftIndex) {
            this.state = QuickSortState.SPLIT;
            return;
        }

        this.exchange(this.leftIndex, this.rightIndex);
        this.state = QuickSortState.SEARCH_LEFT;
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


    /**
     * データを分割し、その位置をスタックに追加する
     */
    private split() {

        // 色をリセット
        this.clearColorFilter(this.leftIndex);
        this.clearColorFilter(this.rightIndex);
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].data == this.pivot) {
                this.clearColorFilter(i);
            }
        }

        if (this.rightIndex + 1 < this.end) {
            // 分割した右範囲を追加
            this.stack.push({
                start: this.rightIndex + 1,
                end: this.end
            });
        } else {
            this.data[this.end].graphic.tint = this.color.complete;
        }

        if (this.start < this.leftIndex - 1) {
            // 分割した左範囲を追加
            this.stack.push({
                start: this.start,
                end: this.leftIndex - 1
            });
        } else {
            this.data[this.start].graphic.tint = this.color.complete;
        }

        this.state = QuickSortState.RECURSION;
    }


    /**
     * スタックからソート範囲を取り出し、ソートするための設定をする
     */
    private recursion() {
        var re = this.stack.pop();

        if (!re) {
            this.state = QuickSortState.COMPLETE;
            return;
        }

        if (re.end <= re.start) {
            this.recursion();
        }

        this.start = re.start;
        this.end = re.end;
        this.leftIndex = null;
        this.rightIndex = null;

        // 色を変更
        for (var i = 0; i < this.data.length; i++) {
            this.clearColorFilter(i);
        }
        for (var i = 0; i < this.start; i++) {
            if (this.data[i].graphic.tint != this.color.complete) {
                this.setColorFilter(i, this.colorFilter.grayOut);
            }
        }
        for (var i = this.end + 1; i < this.data.length; i++) {
            if (this.data[i].graphic.tint != this.color.complete) {
                this.setColorFilter(i, this.colorFilter.grayOut);
            }
        }


        this.state = QuickSortState.PIVOT;
    }

}
