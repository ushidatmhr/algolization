import * as PIXI from 'pixi.js'

export module ColorFilter {
    export var active = new PIXI.filters.ColorMatrixFilter();
    active.matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1];
}
