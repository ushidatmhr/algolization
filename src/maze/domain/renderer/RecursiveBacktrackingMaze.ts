import * as PIXI from 'pixi.js'
import DataSet, { Data, Point, Direction } from '../structure/DataSet';
import MazeDataSet, { TileType } from '../structure/DataSet';
import { Color } from '../structure/ColorFilter'
import Maze from './Maze';



export default class RecursiveBacktrackingMaze extends Maze {

    /** ソート処理のステータス */
    private readonly STATUS = {
        Complete: 2
    }

    /** プロセス状態 */
    private process: number;

    /** カーソル位置 */
    private cursor: Point;


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

        // this.process = this.STATUS.FirstLine;
        this.cursor = {
            row: 1,
            column: 1
        }
    }

    public next(): boolean {

        if (this.process == this.STATUS.Complete) {
            return false;
        }

        // switch (this.process) {
        //     case this.STATUS.FirstLine:
        //         this.doFirstLine();
        //         break;
        //     case this.STATUS.AfterLine:
        //         this.doAfterLine();
        //         break;
        // }

        return true;
    }



}