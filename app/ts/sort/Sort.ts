declare var PIXI: any;

abstract class Sort {

    protected app: any;

    /** オプション */
    protected options = {
        /** 余白 */
        margin: 20,
        /** 隙間 */
        clearance: 1,
        /** 横幅 */
        width: 0,
        /** 最大長 */
        maxHeight: 430
    }

    protected callback: () => void;

    protected speed: number;

    protected data: {
        data: number,
        graphic: any
    }[];


    protected color = {
        base: 0xffffff,
        complete: 0xF50057
    }


    constructor(id: string) {
        this.app = new PIXI.Application(854, 480, { backgroundColor: 0x424242 });
        document.getElementById(id).appendChild(this.app.view);
    }


    /**
     * 1プロセス実行
     */
    public update() {
        this.speed = 1;
        this.app.ticker.update();
    }


    public setSpeed(speed: number) {
        this.speed = speed;
    }


    public setCallbackAutoFinished(callback: () => void) {
        this.callback = callback;
    }


    abstract next(): boolean;


    /**
     * 各値をクリアする
     */
    protected clear() {
        this.data = new Array();
        this.app.stage.removeChildren();
    }


    /**
     * 初期化
     * 
     * @param dataNum
     */
    public init(dataNum: number) {

        this.clear();

        this.speed = 1;

        var dataNumeric: number[] = this.createData(dataNum);
        this.displayDraw(dataNumeric);

        this.initAuto();
    }


    /**
     * リセット処理
     * 
     * @param dataNum
     */
    public reset(dataNum: number) {
        this.app.ticker.stop();

        this.clear();

        var dataNumeric: number[] = this.createData(dataNum);
        this.displayDraw(dataNumeric);

        this.app.render();
    }


    /**
     * 画面を再描画する
     * 
     * @param inputData データ
     */
    private displayDraw(inputData: number[]) {

        var dataNum = inputData.length;

        // barグラフィックのサイズを計算
        var barSize = {
            width: (this.app.view.width - (this.options.margin * 2)) / dataNum - this.options.clearance,
            height: (this.app.view.height - this.options.margin) / dataNum
        }

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
            }

            // 画面へ追加
            this.app.stage.addChild(this.data[i].graphic);
        }
    }


    /**
     * 件数分のランダムデータを作成
     * 
     * @param dataNum データ数
     */
    private createData(dataNum: number) {

        // データ数分の配列を作成
        var array: number[] = new Array();
        for (var i = 1; i <= dataNum; i++) {
            array.push(i);
        }

        // シャッフル
        var n = array.length,
            t: number,
            i: number;

        while (n) {
            i = Math.floor(Math.random() * n--);
            t = array[n];
            array[n] = array[i];
            array[i] = t;
        }

        return array;
    }


    /**
     * オート実行の初期化
     */
    public initAuto() {

        var self = this;

        this.app.ticker.autoStart = false;
        this.app.ticker.stop();
        this.app.ticker.update();
        this.app.ticker.add(function (delta: any) {
            for (var i = 0; i < self.speed; i++) {
                if (!self.next()) {
                    self.app.ticker.stop();
                    self.callback();
                    return;
                }
            }
        });

    }


    /**
     * オート実行の切り替え
     * 
     * @param flag
     */
    public auto(flag: boolean) {
        if (flag) {
            this.app.ticker.start();
        } else {
            this.app.ticker.stop();
        }
    }


    /**
     * オート実行中の場合、trueを返す
     */
    public isAuto(): boolean {
        return this.app.ticker.started;
    }


    /**
     * 指定のグラフィックをアクティブの色へ変更
     * 
     * @param index
     */
    protected active(index: number) {
        var blackfilter = new PIXI.filters.ColorMatrixFilter();
        blackfilter.matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1];

        this.data[index].graphic.filters = [blackfilter];
    }

    /**
     * 指定のグラフィックのアクティブ色を削除
     * 
     * @param index 
     */
    protected inactive(index: number) {
        this.data[index].graphic.filters = [];
    }
}