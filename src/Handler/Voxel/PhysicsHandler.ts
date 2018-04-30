import { VoxelHandler } from './VoxelHandler';
import { Vector3, Shape } from 'three';
import { RenderHandler } from './RenderHandler';
import { Block } from './../../Model/Voxel/Block';
import { Array3d } from './../../Model/Voxel/Array3d';
import { Chunk, CHUNK_WIDTH } from './../../Model/Voxel/Chunk';
import CANNON from "cannon";
import { VX } from './VX';
import { PhysicsObject } from '../../Model/Voxel/PhysicsObjects';

export class PhysicsHandler {

    static world = new CANNON.World();
    static chunkBodies: Array3d<CANNON.Body> = new Array3d();
    static physicsObjects: PhysicsObject[] = [];
    static lastTime: number;
    static init() {
        PhysicsHandler.world.gravity.set(0, -9.82, 0);
        PhysicsHandler.world.broadphase.useBoundingBoxes = true;
        PhysicsHandler.world.allowSleep = true;

        // Start the simulation loop
        console.log("Physics initiated");
    }
    static update() {
        var fixedTimeStep = 1.0 / 60.0; // seconds
        var maxSubSteps = 3;
        const now = Date.now();
        var dt = PhysicsHandler.lastTime ? (now - PhysicsHandler.lastTime) / 1000 : 1 / 60;
        PhysicsHandler.world.step(fixedTimeStep, dt, maxSubSteps);
        PhysicsHandler.physicsObjects.forEach(p => p.update());
        PhysicsHandler.lastTime = now;
    }
    static addChunk(chunk: Chunk) {
        return new Promise(resolve => {
            const chunkLoc = chunk.getLocation();
            const body = new CANNON.Body({
                mass: 0,
                position: new CANNON.Vec3(chunkLoc.x, chunkLoc.y, chunkLoc.z), // m 
                type: CANNON.Body.STATIC
            });
            const skipBlocks: { [key: string]: any } = {};
            for (let d1 = 0; d1 < CHUNK_WIDTH; d1++) {
                for (let d2 = 0; d2 < CHUNK_WIDTH; d2++) {
                    for (let d3 = 0; d3 < CHUNK_WIDTH; d3++) {
                        const block = chunk.getBlock(new Vector3(d1, d2, d3));
                        if (block.isSolid() &&
                            !skipBlocks[block.toString()]) {
                            let nd1, nd2, nd3;
                            for (nd1 = d1 + 1; nd1 < CHUNK_WIDTH; nd1++) {
                                const nBlock = chunk.getBlock(new Vector3(nd1, d2, d3));
                                if (nBlock.isSolid()) {
                                    //
                                } else {
                                    break;
                                }
                            }
                            nd1 -= 1;
                            for (nd2 = d2; nd2 < CHUNK_WIDTH; nd2++) {
                                let ok = true;
                                for (let nnd1 = d1; nnd1 <= nd1; nnd1++) {
                                    const nBlock = chunk.getBlock(new Vector3(nnd1, nd2, d3));
                                    if (nBlock.isSolid()) {
                                        //
                                    } else {
                                        ok = false;
                                        break;
                                    }
                                }
                                if (!ok) {
                                    break;
                                }
                            }
                            nd2 -= 1;

                            for (nd3 = d3; nd3 < CHUNK_WIDTH; nd3++) {
                                let ok = true;
                                const bs: Block[] = [];
                                for (let nnd1 = d1; nnd1 <= nd1; nnd1++) {
                                    for (let nnd2 = d2; nnd2 <= nd2; nnd2++) {
                                        const nBlock = chunk.getBlock(new Vector3(nnd1, nnd2, nd3));
                                        if (nBlock.isSolid()) {
                                            bs.push(nBlock);
                                        } else {
                                            ok = false;
                                            break;
                                        }
                                    }
                                    if (!ok) {
                                        break;
                                    }
                                }
                                if (ok && bs.length > 0) {
                                    bs.forEach(b => skipBlocks[b.toString()] = 1);
                                } else {
                                    break;
                                }
                            }
                            nd3 -= 1;

                            // console.log({ min: { d1, d2, d3 }, max: { nd1, nd2, nd3 } });
                            const x = nd1 - d1 + 1;
                            const y = nd2 - d2 + 1;
                            const z = nd3 - d3 + 1;
                            const loc = new Vector3(d1, d2, d3)
                                .add(chunk.getLocation())
                                .add(new Vector3((x) / 2, (y) / 2, (z) / 2));
                            // RenderHandler.renderDebugBox(loc, (x), (y), (z));

                            this.addBlock(body, new Vector3(d1, d2, d3), x, y, z);
                        }
                    }
                }
            }
            PhysicsHandler.world.addBody(body);
            body.sleep();
            PhysicsHandler.chunkBodies.set(chunk.getLocation(), body);

            // VoxelHandler.createPhysicsBall(new Vector3(CHUNK_WIDTH / 2, 10, CHUNK_WIDTH / 2).add(chunk.getLocation()), 1.5, 1);
            setTimeout(() => {
                resolve();
            }, 0);
        });
    }
    static addBlock(body: CANNON.Body, loc: Vector3, x: number, y: number, z: number) {
        body.addShape(new CANNON.Box(new CANNON.Vec3(x / 2, y / 2, z / 2)),
            new CANNON.Vec3(loc.x + (x / 2), loc.y + (y / 2), loc.z + (z / 2)));
    }
}