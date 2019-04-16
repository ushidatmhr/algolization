import * as PIXI from 'pixi.js'
import DataSet from '../structure/DataSet';
import MazeDataSet, { TileType } from '../structure/DataSet';
import { Color } from '../structure/ColorFilter'
export default abstract class Maze {

    /** PIXI本体 */
    protected app: PIXI.Application;

    protected mazeData: DataSet

    protected mazeSize: {
        row: number,
        column: number
    }

    /** ディスプレイオプション */
    protected displayOptions = {
        borderSize: 3
    }

    /** ソート処理のスキップ数 */
    public autoSkip: number;

    private completedCallback: () => void;


    constructor(id: string, completedCallback: () => void) {
        this.app = new PIXI.Application(500, 500, { backgroundColor: Color.borderOn });
        document.getElementById(id).appendChild(this.app.view);

        this.initAuto();

        this.completedCallback = completedCallback;
    }


    /**
     * 初期化処理
     * @param dataNum データ数 
     */
    public init(dataNum: number, skip: number): void {
        this.mazeData = new DataSet(dataNum);
        this.initData(dataNum);
        this.mazeSize = {
            row: dataNum,
            column: dataNum
        }
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

        this.mazeData = new MazeDataSet(dataNum);
        this.app.stage.removeChildren();

        this.init(dataNum, this.autoSkip);
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
     * データを初期化
     * @param dataNum データ数
     */
    private initData(massNum: number): void {

        var massSize = {
            width: (this.app.view.width - ((massNum + 1) * this.displayOptions.borderSize)) / massNum,
            height: (this.app.view.height - ((massNum + 1) * this.displayOptions.borderSize)) / massNum
        }

        this.initMassData(massNum, massSize);
        this.initBorderData(massNum, massSize);

        this.app.render();
    }


    /**
     * マス目データを初期化
     * @param massNum マス目の数
     * @param massSize 1マスのサイズ
     */
    private initMassData(massNum: number, massSize: { width: number, height: number }) {

        for (var row = 0; row < massNum; row++) {
            for (var col = 0; col < massNum; col++) {
                var massGraph = new PIXI.Graphics();
                massGraph.beginFill(Color.tile, 1);
                massGraph.drawRect(0, 0, massSize.width, massSize.height);
                massGraph.endFill();

                massGraph.x = (massSize.width * row) + this.displayOptions.borderSize * (row + 1);
                massGraph.y = (massSize.height * col) + this.displayOptions.borderSize * (col + 1);

                this.app.stage.addChild(massGraph);
            }
        }
    }


    /**
     * 壁データを初期化
     * @param massNum マス目の数
     * @param massSize 1マスのサイズ
     */
    private initBorderData(massNum: number, massSize: { width: number, height: number }) {

        for (var row = 0; row < massNum + 1; row++) {
            for (var column = 0; column < massNum + 1; column++) {

                // 横向きの壁
                if (column < massNum) {

                    var borderGraph = new PIXI.Graphics();
                    borderGraph.beginFill(0xECEFF1, 1);
                    borderGraph.drawRect(0, 0, massSize.width, this.displayOptions.borderSize);
                    borderGraph.endFill();

                    borderGraph.x = (massSize.width * column) + (this.displayOptions.borderSize * (column + 1));
                    borderGraph.y = (massSize.height * row) + (this.displayOptions.borderSize * row);

                    // 外壁判定
                    var outer = (row == 0) || (row == massNum);

                    this.mazeData.set(row * 2, (column * 2) + 1, borderGraph, outer, TileType.Wall);

                    this.app.stage.addChild(borderGraph);
                }

                // 縦向きの壁
                if (row < massNum) {

                    var borderGraph = new PIXI.Graphics();
                    borderGraph.beginFill(0xECEFF1, 1);
                    borderGraph.drawRect(0, 0, this.displayOptions.borderSize, massSize.height);
                    borderGraph.endFill();

                    borderGraph.x = (massSize.width * column) + this.displayOptions.borderSize * (column);
                    borderGraph.y = (massSize.height * row) + this.displayOptions.borderSize * (row + 1);

                    // 外壁判定
                    var outer = (column == 0) || (column == massNum);

                    this.mazeData.set((row * 2) + 1, column * 2, borderGraph, outer, TileType.Wall);

                    this.app.stage.addChild(borderGraph);
                }
            }
        }

    }


    /**
     * 終了処理
     */
    public destory(): void {
        this.app.view.parentElement.textContent = null;
        this.app.destroy();
        this.mazeData = null;
    }


}