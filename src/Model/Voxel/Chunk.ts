import { ProceduralHandler } from './../../Handler/Voxel/ProceduralHanlder';

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
        const NOISE_SCALE = 50;
        const CL = chunkPos.clone().multiply(new Vector3(CHUNK_WIDTH, CHUNK_WIDTH, CHUNK_WIDTH));
        for (let x = 0; x < CHUNK_WIDTH; x++) {
            for (let z = 0; z < CHUNK_WIDTH; z++) {
                const r = noise.simplex2((x + CL.x) / NOISE_SCALE, (z + CL.z) / NOISE_SCALE) * 2 + 3;
                for (let y = 0; y < CHUNK_WIDTH; y++) {
                    const pos = new Vector3(x, y, z);
                    this.blocks.set(pos, new Block(this, overrideMaterial !== undefined ? overrideMaterial :
                        ProceduralHandler.getType(this, r, x, y, z), pos));
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
    getContainedTypes() {
        const types: number[] = [];
        this.blocks.getAll().forEach(b => {
            const type = b.getType();
            if (type > 0) {
                if (types.indexOf(type) < 0) {
                    types.push(type);
                }

            }
        });
        return types;
    }
} 