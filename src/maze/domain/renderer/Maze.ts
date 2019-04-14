import * as PIXI from 'pixi.js'
import DataSet from '../structure/DataSet';
import { TileType } from '../structure/DataSet';
import { Color } from '../structure/ColorFilter'
export default abstract class Maze {

    /** PIXI本体 */
    protected app: PIXI.Application;

    protected mazeData: DataSet

    /** ディスプレイオプション */
    protected displayOptions = {
        borderSize: 4
    }

    /** ソート処理のスキップ数 */
    public autoSkip: number;

    constructor(id: string, completedCallback: () => void) {
        this.app = new PIXI.Application(500, 500, { backgroundColor: Color.borderOff });
        document.getElementById(id).appendChild(this.app.view);
    }

    /**
     * 初期化処理
     * @param dataNum データ数 
     */
    public init(dataNum: number, skip: number): void {
        this.mazeData = new DataSet(dataNum);
        this.initData(dataNum);
        this.autoSkip = skip;
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

        var massSize = {
            width: (this.app.view.width - ((massNum + 1) * this.displayOptions.borderSize)) / massNum,
            height: (this.app.view.height - ((massNum + 1) * this.displayOptions.borderSize)) / massNum
        }

        for (var row = 0; row < massNum + 1; row++) {
            for (var col = 0; col < massNum + 1; col++) {

                // 横向きの壁
                if (col < massNum) {

                    var borderGraph = new PIXI.Graphics();
                    borderGraph.beginFill(0xECEFF1, 1);
                    borderGraph.drawRect(0, 0, massSize.width, this.displayOptions.borderSize);
                    borderGraph.endFill();

                    borderGraph.x = (massSize.width * col) + (this.displayOptions.borderSize * (col + 1));
                    borderGraph.y = (massSize.height * row) + (this.displayOptions.borderSize * row);

                    this.mazeData.set(row * 2, (col * 2) + 1, borderGraph, true, TileType.Wall);

                    this.app.stage.addChild(borderGraph);
                }

                // 縦向きの壁
                if (row < massNum) {

                    var borderGraph = new PIXI.Graphics();
                    borderGraph.beginFill(0xECEFF1, 1);
                    borderGraph.drawRect(0, 0, this.displayOptions.borderSize, massSize.height);
                    borderGraph.endFill();

                    borderGraph.x = (massSize.width * col) + this.displayOptions.borderSize * (col);
                    borderGraph.y = (massSize.height * row) + this.displayOptions.borderSize * (row + 1);

                    this.mazeData.set((row * 2) + 1, col * 2, borderGraph, true, TileType.Wall);

                    this.app.stage.addChild(borderGraph);
                }
            }
        }

        console.log(this.mazeData)
    }
}