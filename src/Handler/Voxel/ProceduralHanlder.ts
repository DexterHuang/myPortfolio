import { Chunk } from './../../Model/Voxel/Chunk';
import { Vector3 } from "three";

export class ProceduralHandler {

    static getType(chunk: Chunk, noise: number, x: number, y: number, z: number): number {
        let type = 0;
        if (y < noise) {
            type = 1;
        } else if (y < noise + 1) {
            type = 2;
        }
        return type;
    }
}