import { CHUNK_WIDTH } from './../../Model/Voxel/Chunk';
import { PhysicsHandler } from './PhysicsHandler';
import { RenderHandler } from './RenderHandler';

import * as THREE from "three";
import { Camera, Scene, WebGLRenderer, Vector3, Vector2, GeometryUtils, Geometry, Mesh, SphereGeometry, MeshPhongMaterial } from "three";
// @ts-ignore
import { Chunk } from "../../Model/Voxel/Chunk";
import { World } from "../../Model/Voxel/World";
import { PhysicsObject } from '../../Model/Voxel/PhysicsObjects';
import CANNON from "cannon";

export class VoxelHandler {
    static setUp(canvasRef: HTMLCanvasElement) {
        RenderHandler.init(canvasRef);
        PhysicsHandler.init();

        const world = new World("world");
        const chunks: Chunk[] = [];
        const initialRenderSize = 0;
        for (let x = -initialRenderSize; x <= initialRenderSize; x++) {
            for (let z = -initialRenderSize; z <= initialRenderSize; z++) {
                const chunk = new Chunk(world, new Vector3(x, 0, z));
                world.chunks.set(new Vector3(x, 0, z), chunk);
                chunks.push(chunk);
            }
        }
        console.log("Number of Chunks", chunks.length);
        console.log("Voxel Count: ", chunks.length * CHUNK_WIDTH * CHUNK_WIDTH * CHUNK_WIDTH);
        let count = 0;
        (async () => {
            for (const chunk of world.chunks.getAll()) {
                const meshes = await RenderHandler.getChunkMeshes(chunk);
                meshes.forEach(mesh => {
                    RenderHandler.scene.add(mesh);
                });
                await PhysicsHandler.addChunk(chunk);
            }
        })();

        const animate = () => {
            requestAnimationFrame(animate);
            RenderHandler.render();
            PhysicsHandler.update();
        };
        animate();
    }
    static createPhysicsBall(loc: Vector3, size: number, mass: number) {
        const mesh = new Mesh(new SphereGeometry(size, 10, 10), new MeshPhongMaterial());
        mesh.position.set(loc.x, loc.y, loc.z);
        RenderHandler.scene.add(mesh);

        const body = new CANNON.Body({
            mass: mass,
            position: new CANNON.Vec3(loc.x, loc.y, loc.z), // m  
        });
        body.addShape(new CANNON.Sphere(size));
        PhysicsHandler.world.addBody(body);
        PhysicsHandler.physicsObjects.push(new PhysicsObject(mesh, body));
    }
}