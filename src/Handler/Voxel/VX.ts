import { Vector3 } from 'three';

import { CHUNK_WIDTH } from '../../Model/Voxel/Chunk';

export class VX {

    static vector3ToArrayIndex(vector: Vector3) {
        const { x, y, z } = vector;
        const index = x * CHUNK_WIDTH + y * CHUNK_WIDTH + z * CHUNK_WIDTH;
        return Math.abs(index);
    }
    static getTexture(typeId: number) {
        switch (typeId) {
            case (1): {
                return require("../../Resouce/blocks/stone.png");
            }
            case (2): {
                return require("../../Resouce/blocks/grass_top.png");
            }
            default: {
                return undefined;
            }
        }
    }
    static eachEnum<T>(enumValue: T): any[] {
        return Object.keys(enumValue).filter(key => !isNaN(Number(enumValue[key]))).map(key => enumValue[key]);
        //
    }
    static inList(o: any, list: any[]) {
        return list.findIndex(i => i === o) >= 0;
    }
}