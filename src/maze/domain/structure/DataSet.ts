import { Color } from "./ColorFilter";

type Data = {
    /** 壁有無フラグ */
    obstacle: boolean,
    /** グラフィック */
    graphic: PIXI.Graphics,
    /** 種別 */
    type: TileType
}

export enum TileType {
    Load,
    Wall
}

export default class MazeDataSet {

    private mazeData: Data[][];

    constructor(dataNum: number) {
        this.mazeData = [];

        for (var i = 0; i < (dataNum * 2) + 1; i++) {
            this.mazeData[i] = [];
        }
    }

    /**
     * 新しいオブジェクトを追加する
     * @param row 追加行
     * @param column 追加列
     * @param graphic PIXIのGraphicsオブジェクト
     * @param obstacle 壁有無フラグ
     */
    public set(row: number, column: number, graphic: PIXI.Graphics, obstacle: boolean, type: TileType) {
        this.mazeData[row][column] = {
            obstacle: obstacle,
            graphic: graphic,
            type: type
        };

        this.setObstacle(row, column, obstacle);
    }


    public setObstacle(row: number, column: number, flag: boolean) {
        this.mazeData[row][column].obstacle = flag;

        var color = flag ? Color.borderOn : Color.borderOff;
        this.mazeData[row][column].graphic.tint = color;
    }
}