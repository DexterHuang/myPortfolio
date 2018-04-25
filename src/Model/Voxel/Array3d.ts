
import { Vector3 } from "three";
export class Array3d<T> {
    offset = Math.floor(Number.MAX_SAFE_INTEGER / 2);

    data: { [key: string]: T } = {};

    getKey(vector: Vector3) {
        const { x, y, z } = vector;
        return x + "-" + y + "-" + z;
    }
    get(vector: Vector3) {
        return this.data[this.getKey(vector)];
    }
    set(vector: Vector3, obj: any) {
        this.data[this.getKey(vector)] = obj;
    }

}