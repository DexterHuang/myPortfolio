import { Direction } from './Direction';

import { Vector3 } from "three";
import { Chunk } from "./Chunk";

export class Block {

    location: Vector3;
    constructor(public chunk: Chunk, public posToChunk: Vector3) {
        //
    }
    public getLocation() {
        if (!this.location) {
            this.location = this.chunk.chunkPos.clone().add(this.posToChunk);
        }
        return this.location;
    }
    getVertices() {
        const loc = this.getLocation();
        return [
            loc.clone().add(new Vector3(0, 0, 0)),
            loc.clone().add(new Vector3(1, 0, 0)),
            loc.clone().add(new Vector3(1, 1, 0)),
            loc.clone().add(new Vector3(0, 1, 0)),
            loc.clone().add(new Vector3(0, 0, 1)),
            loc.clone().add(new Vector3(1, 0, 1)),
            loc.clone().add(new Vector3(1, 1, 1)),
            loc.clone().add(new Vector3(0, 1, 1)),
        ];
    }
    getFaceVerticesIndexes(direction: Direction) {
        const vs = this.getVertices();
        switch (direction) {
            case (Direction.NORTH): {

                return [5, 4, 7, 6];
            }
            case (Direction.EAST): {

                return [1, 5, 6, 2];
            }
            case (Direction.SOUTH): {

                return [0, 1, 2, 3];
            }
            case (Direction.WEST): {

                return [4, 6, 3, 7];
            }
            case (Direction.UP): {

                return [4, 5, 1, 0];
            }
            case (Direction.DOWN): {

                return [3, 2, 6, 7];
            }
            default: {
                return [];
            }
        }
    }
}  