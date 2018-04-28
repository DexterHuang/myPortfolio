import { PhysicsHandler } from './PhysicsHandler';
import { RenderHandler } from './RenderHandler';

import * as THREE from "three";
import { Camera, Scene, WebGLRenderer, Vector3, Vector2, GeometryUtils, Geometry, Mesh } from "three";
// @ts-ignore
import { Chunk } from "../../Model/Voxel/Chunk";
import { World } from "../../Model/Voxel/World";

export class VoxelHandler {
    static setUp(canvasRef: HTMLCanvasElement) {
        RenderHandler.init(canvasRef);
        PhysicsHandler.init();

        const world = new World("world");
        const chunks: Chunk[] = [];
        const initialRenderSize = 10;
        for (let x = -initialRenderSize; x <= initialRenderSize; x++) {
            for (let z = -initialRenderSize; z <= initialRenderSize; z++) {
                const chunk = new Chunk(world, new Vector3(x, 0, z));
                world.chunks.set(new Vector3(x, 0, z), chunk);
                chunks.push(chunk);
            }
        }
        console.log("Number of Chunks", chunks.length);
        let count = 0;
        (async () => {
            for (const chunk of world.chunks.getAll()) {
                const meshes = await RenderHandler.render(chunk);
                meshes.forEach(mesh => {
                    RenderHandler.scene.add(mesh);
                });
                // PhysicsHandler.addChunk(chunk);
            }
        })();
    }
}