import { VoxelHandler } from './../../Handler/VoxelHandler';
import { Block } from './Block';
import {
    Vector3, Geometry, Face3, Mesh, MeshNormalMaterial,
    MeshBasicMaterial, ImageUtils, Mapping, Vector2
} from 'three';
import image from "../../Resouce/blocks/sand.png";
import { Direction } from './Direction';

export const CHUNK_WIDTH = 8;

export class Chunk {
    blocks: Block[] = [];
    constructor(public chunkPos: Vector3) {
        for (let x = 0; x < CHUNK_WIDTH; x++) {
            for (let y = 0; y < CHUNK_WIDTH; y++) {
                for (let z = 0; z < CHUNK_WIDTH; z++) {
                    this.blocks.push(new Block(this, new Vector3(x, y, z)));
                }
            }
        }
    }

    getMesh() {
        const meshes: Mesh[] = [];
        for (let d of Object.keys(Direction).filter(key => !isNaN(Number(Direction[key])))) {
            var geom = new Geometry();
            let verticesIndex = 0;
            for (const block of this.blocks) {
                const vertices = block.getVertices();
                geom.vertices = geom.vertices.concat(vertices);
                let v = block.getFaceVerticesIndexes(Direction[d]);
                geom.faces.push(new Face3(v[0], v[2], v[1]));
                geom.faces.push(new Face3(v[0], v[3], v[2]));
                for (let i of new Array(12)) {

                    geom.faceVertexUvs[0].push([
                        new Vector2(0, 0),
                        new Vector2(1, 1),
                        new Vector2(1, 0),
                    ], [
                            new Vector2(0, 0),
                            new Vector2(0, 1),
                            new Vector2(1, 1),
                        ]);
                }
                var mesh = new Mesh(geom, new MeshBasicMaterial({
                    map: ImageUtils.loadTexture(image)
                }));

                geom.computeFaceNormals();

                meshes.push(mesh);
            }

        }
        return meshes;
    }
}