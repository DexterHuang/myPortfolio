import { Face3, Geometry, ImageUtils, Mesh, MeshBasicMaterial, Vector2, Vector3, TextureLoader } from 'three';

import { VX } from '../../Handler/Voxel/VX';
import image from '../../Resouce/blocks/piston_inner.png';
import { Block } from './Block';
import { Direction } from './Direction';
import { World } from './World';

export const CHUNK_WIDTH = 8;

export class Chunk {
    blocks: Block[] = [];
    constructor(public readonly world: World, private chunkPos: Vector3, defaultMaterial: number = 1) {
        for (let x = 0; x < CHUNK_WIDTH; x++) {
            for (let y = 0; y < CHUNK_WIDTH; y++) {
                for (let z = 0; z < CHUNK_WIDTH; z++) {
                    this.blocks.push(new Block(this, defaultMaterial, new Vector3(x, y, z)));
                }
            }
        }
    }
    getChunkPos() {
        return this.chunkPos.clone();
    }
    getBlock(vector: Vector3) {
        return this.blocks[VX.vector3ToArrayIndex(vector)];
    }
    getMesh() {
        const meshes: Mesh[] = [];
        for (let d of Object.keys(Direction).filter(key => !isNaN(Number(Direction[key])))) {
            var geom = new Geometry();
            let verticesIndex = 0;
            const direction = Direction[d];
            for (const block of this.blocks) {
                if (block.getRelative(direction).getType() === 0) {
                    const vertices = block.getVertices();
                    geom.vertices = geom.vertices.concat(vertices);
                    let v = block.getFaceVerticesIndexes(direction);
                    geom.faces.push(new Face3(v[0] + verticesIndex, v[2] + verticesIndex, v[1] + verticesIndex));
                    geom.faces.push(new Face3(v[0] + verticesIndex, v[3] + verticesIndex, v[2] + verticesIndex));
                    verticesIndex += vertices.length;

                    geom.faceVertexUvs[0].push([
                        new Vector2(0, 0),
                        new Vector2(1, 1),
                        new Vector2(1, 0),
                    ], [
                            new Vector2(0, 0),
                            new Vector2(0, 1),
                            new Vector2(1, 1),
                        ]);
                    geom.computeFaceNormals();
                    var mesh = new Mesh(geom, new MeshBasicMaterial({
                        map: new TextureLoader().load(image)
                    }));
                    meshes.push(mesh);
                }
            }

        }
        return meshes;
    }
}