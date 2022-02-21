import DataSet, { Data, Point, Direction } from '../structure/DataSet';

export default class MazeUtils {

    public static randomDirection(): Direction {
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


    public static moveLoadPoint(currentPoint: Point, direction: Direction) {
        var toPoint: Point;

        switch (direction) {
            case Direction.Top:
                toPoint = {
                    row: currentPoint.row - 2,
                    column: currentPoint.column
                }
                break;
            case Direction.Right:
                toPoint = {
                    row: currentPoint.row,
                    column: currentPoint.column + 2
                }
                break;
            case Direction.Bottom:
                toPoint = {
                    row: currentPoint.row + 2,
                    column: currentPoint.column
                }
                break;
            case Direction.Left:
                toPoint = {
                    row: currentPoint.row,
                    column: currentPoint.column - 2
                }
                break;
        }

        return toPoint;
    }


    public static getMovePoint(currentPoint: Point, direction: Direction) {
        var toPoint: Point;

        switch (direction) {
            case Direction.Top:
                toPoint = {
                    row: currentPoint.row - 1,
                    column: currentPoint.column
                }
                break;
            case Direction.Right:
                toPoint = {
                    row: currentPoint.row,
                    column: currentPoint.column + 1
                }
                break;
            case Direction.Bottom:
                toPoint = {
                    row: currentPoint.row + 1,
                    column: currentPoint.column
                }
                break;
            case Direction.Left:
                toPoint = {
                    row: currentPoint.row,
                    column: currentPoint.column - 1
                }
                break;
        }

        return toPoint;
    }



    /**
     * 指定位置からランダム方向に1つ移動した座標を返す
     * @param currentPoint 現在位置
     */
    public static getRandomMovePoint(currentPoint: Point) {
        return this.getMovePoint(currentPoint, this.randomDirection());
    }


    public static shuffleDirection(): Direction[] {
        let directions = [Direction.Top, Direction.Right, Direction.Bottom, Direction.Left];


        for (var i = directions.length - 1; i >= 0; i--) {

            // 0~iのランダムな数値を取得
            var rand = Math.floor(Math.random() * (i + 1));

            // 配列の数値を入れ替える
            [directions[i], directions[rand]] = [directions[rand], directions[i]]

        }

        return directions;
    }


}