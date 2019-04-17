import * as PIXI from 'pixi.js'
import DataSet, { Data, Point, Direction } from '../structure/DataSet';
import MazeDataSet, { TileType } from '../structure/DataSet';
import { Color } from '../structure/ColorFilter'
import Maze from './Maze';
import MazeUtils from '../Utils/MazeUtils';



export default class RecursiveBacktrackingMaze extends Maze {

    /** ソート処理のステータス */
    private readonly STATUS = {
        Dig: 0,
        Backtracking: 1,
        Complete: 2
    }

    /** プロセス状態 */
    private process: number;

    /** カーソル位置 */
    private cursor: Point;

    /** 通り道 */
    private route: Point[];


    constructor(id: string, completedCallback: () => void) {
        super(id, completedCallback);
        this.initFillWall = true;
    }


    /**
     * 初期化
     * @param dataNum データ数
     * @param skip スキップ数
     */
    public init(dataNum: number, skip: number) {
        super.init(dataNum, skip);

        this.process = this.STATUS.Dig;
        this.cursor = {
            row: 1,
            column: 1
        }
        this.route = [{
            row: this.cursor.row,
            column: this.cursor.column
        }
        ];
    }

    public next(): boolean {

        if (this.process == this.STATUS.Complete) {
            return false;
        }

        switch (this.process) {
            case this.STATUS.Dig:
                this.dig();
                break;
            // case this.STATUS.AfterLine:
            //     this.doAfterLine();
            // break;
        }

        return true;
    }


    public dig() {

        let nextTo: Point;
        let nextPoint: Point;
        let existRoute: boolean = false;

        let shuffleDirections = MazeUtils.shuffleDirection();
        for (var i = 0; i < shuffleDirections.length; i++) {
            let direction: Direction = shuffleDirections[i];
            nextTo = MazeUtils.getMovePoint(this.cursor, direction);
            nextPoint = MazeUtils.moveLoadPoint(this.cursor, direction);

            // 進行方向が、壁がない or 外壁 or 既に通ったルートの場合は採用しない
            if (!this.mazeData.isWall(nextTo)
                || this.mazeData.isOuterWall(nextTo)
                || this.isAlwaysRoute(nextPoint)) {
                continue;

            } else {
                existRoute = true;
                break;
            }
        };

        // 進める方向がない場合は、遡るプロセスへ
        if (!existRoute) {
            this.process = this.STATUS.Backtracking;
        } else {
            this.mazeData.setObstacleByPoint(nextTo, false);
            // this.mazeData.setTileColor(this.cursor, Color.tile);
            // this.mazeData.setTileColor(nextPoint, Color.tile);
            this.route.push(this.cursor);
            this.cursor = nextPoint;
        }
    }


    private isAlwaysRoute(point: Point): boolean {

        let isAlways = false;

        this.route.forEach(r => {
            if (r.row == point.row && r.column == point.column) {
                isAlways = true;
                return;
            }
        });

        return isAlways;
    }

}