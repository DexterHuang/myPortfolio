import { Direction } from './Direction';

import { Vector3 } from "three";
import { Chunk } from "./Chunk";

export class Block {

    location: Vector3;
    private type: number;
    constructor(public chunk: Chunk, type: number, private posToChunk: Vector3) {
        this.type = type;
    }
    getPosToChunk() {
        return this.posToChunk.clone();
    }
    getType() {
        return this.type;
    }
    public getLocation() {
        if (!this.location) {
            this.location = this.chunk.getLocation().add(this.posToChunk);
        }
        return this.location.clone();
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
    getRelative(direction: Direction) {
        let v: Vector3;
        switch (direction) {
            case (Direction.NORTH): {
                v = new Vector3(0, 0, 1);
                break;
            }
            case (Direction.EAST): {
                v = new Vector3(1, 0, 0);
                break;
            }
            case (Direction.SOUTH): {
                v = new Vector3(0, 0, -1);
                break;
            }
            case (Direction.WEST): {
                v = new Vector3(-1, 0, 0);
                break;
            }
            case (Direction.DOWN): {
                v = new Vector3(0, -1, 0);
                break;
            }
            case (Direction.UP): {
                v = new Vector3(0, 1, 0);
                break;
            }
            default: {
                v = new Vector3(0, 0, 0);
                break;
            }
        }
        return this.chunk.world.getBlock(this.getLocation().add(v));
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

                return [4, 0, 3, 7];
            }
            case (Direction.DOWN): {

                return [4, 5, 1, 0];
            }
            case (Direction.UP): {

                return [3, 2, 6, 7];
            }
            default: {
                return [];
            }
        }
    }
}  