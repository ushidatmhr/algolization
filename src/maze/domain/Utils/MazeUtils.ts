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
}