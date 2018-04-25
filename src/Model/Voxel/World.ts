import { Vector3 } from 'three';

import { Chunk, CHUNK_WIDTH } from '../../Model/Voxel/Chunk';
import { Array3d } from "../../Model/Voxel/Array3d";

export class World {

    chunks: Array3d<Chunk> = new Array3d();
    constructor(public readonly name: string) {

    }
    getBlock(vector: Vector3) {
        const chunkLoc = this.getChunkLoc(vector);
        const blockToChunk = vector.clone().sub(chunkLoc.clone().multiplyScalar(CHUNK_WIDTH));
        const block = this.getChunk(chunkLoc).getBlock(blockToChunk);
        if (!block) {
            console.log(vector, chunkLoc, blockToChunk);
        }
        return block;
    }
    getChunkLoc(vector: Vector3) {
        let { x, y, z } = vector;
        x = Math.floor(x / CHUNK_WIDTH);
        y = Math.floor(y / CHUNK_WIDTH);
        z = Math.floor(z / CHUNK_WIDTH);
        return new Vector3(x, y, z);
    }
    getChunkByWorldLoc(v: Vector3) {
        const chunkLoc = this.getChunkLoc(v);
        return this.getChunk(chunkLoc);
    }
    getChunk(vector: Vector3) {
        let chunk = this.chunks.get(vector);
        if (!chunk) {
            chunk = new Chunk(this, vector, 0);
            this.chunks.set(vector, chunk);
        }
        return this.chunks.get(vector);
    }
}