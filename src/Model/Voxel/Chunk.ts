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
        const block = this.blocks[0];
        const vertices = block.getVertices();
        var geom = new Geometry();

        geom.vertices = geom.vertices.concat(vertices);

        for (let d of Object.keys(Direction).filter(dd => typeof dd === "string")) {
            console.log(d);
        }

        let v = block.getFaceVerticesIndexes(Direction.NORTH);
        geom.faces.push(new Face3(0, 2, 1));
        geom.faces.push(new Face3(0, 3, 2));

        // geom.faces.push(new Face3(0, 2, 1));
        // geom.faces.push(new Face3(0, 3, 2));

        // geom.faces.push(new Face3(4, 1, 5));
        // geom.faces.push(new Face3(4, 0, 1));

        // geom.faces.push(new Face3(4, 3, 0));
        // geom.faces.push(new Face3(4, 7, 3));

        // geom.faces.push(new Face3(5, 7, 4));
        // geom.faces.push(new Face3(5, 6, 7));

        // geom.faces.push(new Face3(1, 6, 5));
        // geom.faces.push(new Face3(1, 2, 6));

        // geom.faces.push(new Face3(3, 6, 2));
        // geom.faces.push(new Face3(3, 7, 6));

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

        var object = new Mesh(geom, new MeshBasicMaterial({
            map: ImageUtils.loadTexture(image)
        }));

        geom.computeFaceNormals();
        return object;
    }
}