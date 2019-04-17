import { Color } from "./ColorFilter";

export type Data = {
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

export type Point = {
    row: number,
    column: number
}

export enum Direction {
    Top,
    Right,
    Bottom,
    Left
}

export default class MazeDataSet {

    private mazeData: Data[][];

    /**
     * 初期化
     * @param dataNum データ数
     */
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

        if (type == TileType.Wall) {
            this.setObstacle(row, column, obstacle);
        }
    }


    /**
     * 壁の有無を設定する
     * @param row 行
     * @param column 列
     * @param flag true：壁あり、false：壁なし
     */
    public setObstacleByPoint(point: Point, flag: boolean) {
        this.setObstacle(point.row, point.column, flag);
    }


    /**
     * 壁の有無を設定する
     * @param row 行
     * @param column 列
     * @param flag true：壁あり、false：壁なし
     */
    public setObstacle(row: number, column: number, flag: boolean) {
        this.mazeData[row][column].obstacle = flag;

        var color = flag ? Color.borderOn : Color.borderOff;
        this.mazeData[row][column].graphic.tint = color;
    }


    /**
     * 壁か判定する
     * @param point 位置
     */
    public isWall(point: Point) {
        return this.mazeData[point.row][point.column].obstacle;
    }


    /**
     * 指定箇所のデータを取得
     * @param point 位置
     */
    public getByPoint(point: Point): Data {
        return this.get(point.row, point.column);
    }

    /**
     * 指定箇所のデータを取得
     * @param row 行
     * @param column 列
     */
    public get(row: number, column: number): Data {
        return this.mazeData[row][column];
    }


    public setTileColor(point: Point, color: number) {
        this.mazeData[point.row][point.column].graphic.tint = color;
    }


    /**
     * 指定位置が外周の壁かどうか判定する
     * @param point 指定位置
     */
    public isOuterWall(point: Point) {
        if (point.row == 0 || point.row == this.mazeData.length - 1
            || point.column == 0 || point.column == this.mazeData[1].length - 1) {
            return true;
        }
    }
}