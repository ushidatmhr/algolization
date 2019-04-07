import * as PIXI from 'pixi.js'
import DataSet from './DataSet';
import { Color } from './ColorFilter';

export default abstract class Sort {

    /** PIXI本体 */
    protected app: PIXI.Application;

    /** データの集合 */
    protected data: DataSet;

    /** ディスプレイオプション */
    protected displayOptions = {
        /** 余白 */
        margin: 20,
        /** 隙間 */
        clearance: 1,
        /** 横幅 */
        width: 0,
        /** 最大長 */
        maxHeight: 430
    }

    /** ソート処理のスキップ数 */
    public autoSkip;

    private completedCallback: () => void;


    constructor(id: string, completedCallback: () => void) {
        var canvasWidth = window.innerWidth;
        canvasWidth = (840 < canvasWidth) ? 840 : canvasWidth; 
        
        this.app = new PIXI.Application(canvasWidth, 480, { backgroundColor: 0x424242 });
        document.getElementById(id).appendChild(this.app.view);

        this.initAuto();

        this.completedCallback = completedCallback;
    }


    /**
     * 初期化処理
     * @param dataNum データ数 
     */
    public init(dataNum: number, skip: number): void {
        this.initData(dataNum);
        this.autoSkip = skip;
    }


    /**
     * オート処理を初期化
     */
    public initAuto(): void {

        this.app.ticker.autoStart = false;
        this.app.ticker.stop();
        this.app.ticker.update();
        this.app.ticker.add((delta) => {
            for (var i = 0; i < this.autoSkip; i++) {
                if (!this.next()) {
                    this.app.ticker.stop();
                    this.completedCallback();
                }
            }
        });
    }



    public abstract next(): boolean;


    public update() {
        this.autoSkip = 1;
        this.app.ticker.update();
    }


    /**
     * リセット処理
     * @param dataNum データ数 
     */
    public reset(dataNum: number): void {

        this.app.ticker.stop();

        this.data = new DataSet();
        this.app.stage.removeChildren();

        this.init(dataNum, this.autoSkip);
        this.app.render();
    }


    /**
     * オート実行を切り替える
     */
    public toggleAuto(): void {
        if (this.app.ticker.started) {
            this.app.ticker.stop();
        } else {
            this.app.ticker.start();
        }
    }


    /**
     * 一意なランダムデータを生成する
     * 
     * @param dataNum 生成するデータ数
     * @returns ランダム生成したデータのリスト
     */
    private createRandomData(dataNum: number): number[] {

        // データ数分の配列を作成
        var array: number[] = new Array();
        for (var i = 1; i <= dataNum; i++) {
            array.push(i);
        }

        // シャッフル
        var n = array.length;
        var t: number;
        var i: number;

        while (n) {
            i = Math.floor(Math.random() * n--);
            t = array[n];
            array[n] = array[i];
            array[i] = t;
        }

        return array;
    }


    /**
     * データを初期化
     * @param dataNum データ数
     */
    private initData(dataNum: number): void {

        this.data = new DataSet();

        var srcData = this.createRandomData(dataNum);

        // barグラフィックのサイズを計算
        var barSize = {
            width: (this.app.view.width - (this.displayOptions.margin * 2)) / dataNum - this.displayOptions.clearance,
            height: (this.app.view.height - this.displayOptions.margin) / dataNum
        }

        // データ数によって枠線の色を変更
        var borderColor: number;
        if (srcData.length < 271) {
            borderColor = 0x000000;
        } else {
            borderColor = Color.normal;
        }

        for (var i = 0; i < dataNum; i++) {

            // Graphicsを生成
            var barGraph = new PIXI.Graphics();
            barGraph.lineStyle(1, borderColor);
            barGraph.beginFill(Color.normal, 1);
            barGraph.drawRect(0, 0, barSize.width, srcData[i] * barSize.height);
            barGraph.endFill();

            barGraph.x = (i * barSize.width) + (i * this.displayOptions.clearance) + this.displayOptions.margin;
            barGraph.y = (this.app.view.height - 1) - (srcData[i] * barSize.height);


            // データを追加
            this.data.add({
                value: srcData[i],
                graphic: barGraph,
                colors: [Color.normal]
            })

            // 画面へ追加
            this.app.stage.addChild(this.data.get(i).graphic);
        }

        this.app.render();
    }


    /**
     * 終了処理
     */
    public destory(): void {
        this.app.view.parentElement.textContent = null;
        this.app.destroy();
        this.data = null;
    }

}