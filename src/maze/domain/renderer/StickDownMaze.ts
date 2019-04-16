import * as PIXI from 'pixi.js'
import DataSet, { Data, Point, Direction } from '../structure/DataSet';
import MazeDataSet, { TileType } from '../structure/DataSet';
import { Color } from '../structure/ColorFilter'
import Maze from './Maze';


export default class StickDownMaze extends Maze {

    /** ソート処理のステータス */
    private readonly STATUS = {
        FirstLine: 0,
        AfterLine: 1,
        Complete: 2
    }

    /** プロセス状態 */
    private process: number;

    /** カーソル位置 */
    private cursor: Point;


    constructor(id: string, completedCallback: () => void) {
        super(id, completedCallback);
        this.initFillWall = false;
    }


    /**
     * 初期化
     * @param dataNum データ数
     * @param skip スキップ数
     */
    public init(dataNum: number, skip: number) {
        super.init(dataNum, skip);

        this.process = this.STATUS.FirstLine;
        this.cursor = {
            row: 2,
            column: 2
        }
    }

    public next(): boolean {

        if (this.process == this.STATUS.Complete) {
            return false;
        }

        switch (this.process) {
            case this.STATUS.FirstLine:
                this.doFirstLine();
                break;
            case this.STATUS.AfterLine:
                this.doAfterLine();
                break;
        }

        return true;
    }


    public doFirstLine() {

        var toPotin: Point;
        var count = 0;

        do {
            var direction = this.randomDirection();
            toPotin = this.moveCursorFor(direction);

            // 無限ループ防止用
            if (100 < count++) {
                throw "infinite loop";
            }

        } while (this.mazeData.isWall(toPotin));

        this.mazeData.setObstacleByPoint(toPotin, true);

        this.cursor.column += 2;

        // 右端まできたら次の行へ
        if (this.cursor.column >= this.mazeSize.column * 2) {
            this.cursor = {
                row: this.cursor.row + 2,
                column: 2
            }
            this.process = this.STATUS.AfterLine;
        }
    }


    public doAfterLine() {

        var toPotin: Point;
        var count = 0;

        do {
            var direction = this.randomDirection();
            toPotin = this.moveCursorFor(direction);

            // 無限ループ防止用
            if (100 < count++) {
                throw "infinite loop";
            }

        } while (direction == Direction.Top || this.mazeData.isWall(toPotin));

        this.mazeData.setObstacleByPoint(toPotin, true);

        this.cursor.column += 2;

        // 右端まできたら次の行へ
        if (this.cursor.column >= this.mazeSize.column * 2) {

            var nextRow = this.cursor.row + 2;
            // 最下行まで行ったら完了
            if (nextRow >= this.mazeSize.row * 2) {
                this.process = this.STATUS.Complete;
            } else {

                this.cursor = {
                    row: this.cursor.row + 2,
                    column: 2
                }
            }
        }
    }


    /**
     * ランダムな方向を取得する
     */
    private randomDirection(): Direction {
        var random = Math.floor(Math.random() * 4);

        var direction: Direction;
        switch (random) {
            case 0:
                direction = Direction.Top;
                break;
            case 1:
                direction = Direction.Right;
                break;
            case 2:
                direction = Direction.Bottom;
                break;
            case 3:
                direction = Direction.Left;
                break;
        }

        return direction;
    }


    /**
     * 指定方向へ移動後のポイントを取得
     * @param direction 指定方向
     */
    private moveCursorFor(direction: Direction): Point {
        var toPoint: Point;

        switch (direction) {
            case Direction.Top:
                toPoint = {
                    row: this.cursor.row - 1,
                    column: this.cursor.column
                }
                break;
            case Direction.Right:
                toPoint = {
                    row: this.cursor.row,
                    column: this.cursor.column + 1
                }
                break;
            case Direction.Bottom:
                toPoint = {
                    row: this.cursor.row + 1,
                    column: this.cursor.column
                }
                break;
            case Direction.Left:
                toPoint = {
                    row: this.cursor.row,
                    column: this.cursor.column - 1
                }
                break;
        }

        return toPoint;
    }


    /**
     * 現在位置からの指定方向が壁かどうか判定
     * @param direction 指定方向
     */
    private checkWallDirection(direction: Direction): boolean {

        var toPoint = this.moveCursorFor(direction);
        var data = this.mazeData.getByPoint(toPoint);

        return data.obstacle;
    }
}