import { Array3d } from './Array3d';

import { Face3, Geometry, ImageUtils, Mesh, MeshBasicMaterial, Vector2, Vector3, TextureLoader } from 'three';

import { VX } from '../../Handler/Voxel/VX';
import { Block } from './Block';
import { Direction } from './Direction';
import { World } from './World';
// @ts-ignore
import { Noise } from 'noisejs';
export const CHUNK_WIDTH = 8;
export class Chunk {
    blocks: Array3d<Block> = new Array3d();
    constructor(public readonly world: World, private chunkPos: Vector3, overrideMaterial?: number) {
        const noise = new Noise();
        const NOISE_SCALE = 0.1;
        for (let x = 0; x < CHUNK_WIDTH; x++) {
            for (let y = 0; y < CHUNK_WIDTH; y++) {
                for (let z = 0; z < CHUNK_WIDTH; z++) {
                    const r = noise.simplex3(x / NOISE_SCALE, y / NOISE_SCALE, z / NOISE_SCALE);
                    const pos = new Vector3(x, y, z);
                    this.blocks.set(pos, new Block(this,
                        overrideMaterial || overrideMaterial === 0 ? overrideMaterial :
                            r >= 0.1 ? 0 : 1, pos));
                }
            }
        }
    }
    getPos() {
        return this.chunkPos.clone();
    }
    getLocation() {
        return this.getPos().multiply(new Vector3(CHUNK_WIDTH, CHUNK_WIDTH, CHUNK_WIDTH));
    }
    getBlock(vector: Vector3) {
        return this.blocks.get(vector);
    }
} 