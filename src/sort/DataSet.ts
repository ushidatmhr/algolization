import { ColorFilter } from "./ColorFilter";

type Data = {
    /** データ */
    value: number,
    /** グラフィック */
    graphic: PIXI.Graphics
}

export default class DataSet {

    /** カラーフィルター */
    public static colorFilters: {
        active: PIXI.filters.ColorMatrixFilter
    }

    /** データの集合 */
    public data: Data[];


    constructor() {
        this.data = [];
    }


    /**
     * 末尾に要素を追加する。
     * @param item 追加データ
     */
    public add(item: Data): void {
        this.data.push(item);
    }


    /**
     * 要素を取得する。
     * @param i 取得する要素の位置
     */
    public get(index: number): Data {
        return this.data[index];
    }


    /**
     * 要素のサイズを取得する。
     */
    public size(): number {
        return this.data.length;
    }


    /**
     * 2つの要素を比較する
     * @param index1 比較対象1
     * @param index2 比較対象2
     * @returns 要素が等しい：0、右の要素が大きい：-1、左の要素が大きい：1
     */
    public compare(index1: number, index2: number): number {
        var val1 = this.data[index1].value;
        var val2 = this.data[index2].value;

        if (val1 == val2) {
            return 0;
        } else if (val1 < val2) {
            return -1
        } else {
            1
        }
    }


    /**
     * 要素を入れ替える
     * @param index1 入れ替え位置1
     * @param index2 入れ替え位置2
     */
    public swap(index1: number, index2: number): void {

        // x座標入れ替え
        var xTemp = this.data[index1].graphic.x;
        this.data[index1].graphic.x = this.data[index2].graphic.x;
        this.data[index2].graphic.x = xTemp;

        // 値入れ替え
        var temp = this.data[index1];
        this.data[index1] = this.data[index2];
        this.data[index2] = temp;
    }


    /**
     * グラフィックの色を変更する
     * @param i 対象の要素の位置
     * @param color 変更する色
     */
    public setColor(index: number, color: number): void {
        this.data[index].graphic.tint = color;
    }


    /**
     * グラフィックにカラーフィルターを適用する
     * @param index 要素の位置
     */
    public setColorFilter(index: number, filter: PIXI.filters.ColorMatrixFilter): void {
        this.data[index].graphic.filters = [filter];
    }


    /**
     * カラーフィルターをクリアする。
     * @param index 対象の要素の位置
     */
    public clearColorFilter(index: number): void {
        this.data[index].graphic.filters = [];
    }
}