var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var a = 0;
var Sort = (function () {
    function Sort(id) {
        /** オプション */
        this.options = {
            /** 余白 */
            margin: 20,
            /** 隙間 */
            clearance: 1,
            /** 横幅 */
            width: 0,
            /** 最大長 */
            maxHeight: 430
        };
        this.color = {
            base: 0xffffff,
            complete: 0xF50057
        };
        this.app = new PIXI.Application(854, 480, { backgroundColor: 0x424242 });
        document.getElementById(id).appendChild(this.app.view);
    }
    /**
     * 1プロセス実行
     */
    Sort.prototype.update = function () {
        this.speed = 1;
        this.app.ticker.update();
    };
    /**
     * 各値をクリアする
     */
    Sort.prototype.clear = function () {
        this.data = new Array();
        this.app.stage.removeChildren();
    };
    /**
     * 初期化
     *
     * @param dataNum
     */
    Sort.prototype.init = function (dataNum) {
        this.clear();
        this.speed = 1;
        var dataNumeric = this.createData(dataNum);
        this.displayDraw(dataNumeric);
        this.initAuto();
    };
    /**
     * リセット処理
     *
     * @param dataNum
     */
    Sort.prototype.reset = function (dataNum) {
        this.app.ticker.stop();
        this.clear();
        var dataNumeric = this.createData(dataNum);
        this.displayDraw(dataNumeric);
        this.app.render();
    };
    /**
     * 画面を再描画する
     *
     * @param inputData データ
     */
    Sort.prototype.displayDraw = function (inputData) {
        var dataNum = inputData.length;
        // barグラフィックのサイズを計算
        var barSize = {
            width: (this.app.view.width - (this.options.margin * 2)) / dataNum - this.options.clearance,
            height: (this.app.view.height - this.options.margin) / dataNum
        };
        for (var i = 0; i < dataNum; i++) {
            // Graphicsを生成
            var barGraph = new PIXI.Graphics();
            barGraph.lineStyle(1);
            barGraph.beginFill(this.color.base, 1);
            barGraph.drawRect(0, 0, barSize.width, inputData[i] * barSize.height);
            barGraph.endFill();
            barGraph.x = (i * barSize.width) + (i * this.options.clearance) + this.options.margin;
            barGraph.y = (this.app.view.height - 1) - (inputData[i] * barSize.height);
            // データを追加
            this.data[i] = {
                data: inputData[i],
                graphic: barGraph
            };
            // 画面へ追加
            this.app.stage.addChild(this.data[i].graphic);
        }
    };
    /**
     * 件数分のランダムデータを作成
     *
     * @param dataNum データ数
     */
    Sort.prototype.createData = function (dataNum) {
        // データ数分の配列を作成
        var array = new Array();
        for (var i = 1; i <= dataNum; i++) {
            array.push(i);
        }
        // シャッフル
        var n = array.length, t, i;
        while (n) {
            i = Math.floor(Math.random() * n--);
            t = array[n];
            array[n] = array[i];
            array[i] = t;
        }
        return array;
    };
    /**
     * オート実行の初期化
     */
    Sort.prototype.initAuto = function () {
        var self = this;
        this.app.ticker.autoStart = false;
        this.app.ticker.stop();
        this.app.ticker.update();
        this.app.ticker.add(function (delta) {
            for (var i = 0; i < self.speed; i++) {
                if (!self.next()) {
                    self.app.ticker.stop();
                    return;
                }
            }
        });
    };
    /**
     * オート実行の切り替え
     *
     * @param flag
     */
    Sort.prototype.auto = function (flag) {
        if (flag) {
            this.app.ticker.start();
        }
        else {
            this.app.ticker.stop();
        }
    };
    /**
     * 指定のグラフィックをアクティブの色へ変更
     *
     * @param index
     */
    Sort.prototype.active = function (index) {
        var blackfilter = new PIXI.filters.ColorMatrixFilter();
        blackfilter.matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1];
        this.data[index].graphic.filters = [blackfilter];
    };
    /**
     * 指定のグラフィックのアクティブ色を削除
     *
     * @param index
     */
    Sort.prototype.inactive = function (index) {
        this.data[index].graphic.filters = [];
    };
    return Sort;
}());
/// <reference path="Sort.ts" /> 
var BubleSortState;
(function (BubleSortState) {
    BubleSortState[BubleSortState["Compare"] = 0] = "Compare";
    BubleSortState[BubleSortState["Exchange"] = 1] = "Exchange";
    BubleSortState[BubleSortState["Complete"] = 2] = "Complete";
})(BubleSortState || (BubleSortState = {}));
var BubleSort = (function (_super) {
    __extends(BubleSort, _super);
    function BubleSort(id) {
        return _super.call(this, id) || this;
    }
    /**
     * クリア
     */
    BubleSort.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.state = BubleSortState.Compare;
        this.cursor = -1;
    };
    /**
     * 初期化処理
     *
     * @param dataNum
     */
    BubleSort.prototype.init = function (dataNum) {
        this.clear();
        _super.prototype.init.call(this, dataNum);
        this.sortedIndex = this.data.length;
    };
    /**
     * 次へ
     */
    BubleSort.prototype.next = function () {
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
    };
    /**
     * カーソルを次の位置へ移動 ＆ 値の比較
     */
    BubleSort.prototype.nextCursor = function () {
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
                this.data[0].graphic.tint = this.color.complete;
                return;
            }
        }
        this.active(this.cursor);
        this.active(this.cursor + 1);
        if (this.compare(this.cursor, this.cursor + 1)) {
            this.state = BubleSortState.Compare;
        }
        else {
            this.state = BubleSortState.Exchange;
        }
    };
    /**
     * 2つのデータの大きさを比較
     *
     * @param i
     * @param j
     * @return 右のデータのほうが大きい：true
     */
    BubleSort.prototype.compare = function (i, j) {
        return this.data[i].data < this.data[j].data;
    };
    /**
     * 現在のカーソル位置にある要素を交換する
     */
    BubleSort.prototype.exchange = function () {
        var i = this.cursor;
        var j = this.cursor + 1;
        // x座標入れ替え
        var xTemp = this.data[i].graphic.x;
        this.data[i].graphic.x = this.data[j].graphic.x;
        this.data[j].graphic.x = xTemp;
        // 配列入れ替え
        var temp = this.data[i];
        this.data[i] = this.data[j];
        this.data[j] = temp;
        this.state = BubleSortState.Compare;
    };
    /**
     * リセット
     *
     * @param dataNum
     */
    BubleSort.prototype.reset = function (dataNum) {
        this.clear();
        _super.prototype.reset.call(this, dataNum);
        this.sortedIndex = this.data.length;
    };
    return BubleSort;
}(Sort));
