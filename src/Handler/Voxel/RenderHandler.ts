import { VX } from './VX';
import { Mesh, Geometry, MeshBasicMaterial, TextureLoader, Face3, Vector2, MeshLambertMaterial } from 'three';
import { Chunk } from './../../Model/Voxel/Chunk';
import { Direction } from '../../Model/Voxel/Direction';

export class RenderHandler {

    static render(chunk: Chunk): Promise<Mesh[]> {
        return new Promise(resolve => {
            const meshes: Mesh[] = [];
            let verticesIndex = 0;
            var geom = new Geometry();

            for (let currentType of chunk.getContainedTypes()) {
                const blocks = chunk.blocks.getAll().filter(b => b.getType() === currentType);
                for (let d of Object.keys(Direction).filter(key => !isNaN(Number(Direction[key])))) {
                    const direction = Direction[d];
                    for (const block of blocks) {
                        const nextBlock = block.getRelative(direction);
                        if (block.getType() >= 1 && nextBlock.getType() === 0) {
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
                        }
                    }
                }
                var mesh = new Mesh(geom, new MeshLambertMaterial({
                    map: new TextureLoader().load(VX.getTexture(currentType))
                }));
                mesh.receiveShadow = true;
                mesh.castShadow = true;
                meshes.push(mesh);
            }

            setTimeout(() => {
                resolve(meshes);

            });
        });
    }

}