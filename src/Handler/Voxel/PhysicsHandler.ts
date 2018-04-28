import { Block } from './../../Model/Voxel/Block';
import { Array3d } from './../../Model/Voxel/Array3d';
import { Chunk } from './../../Model/Voxel/Chunk';
import CANNON from "cannon";

export class PhysicsHandler {

    static world = new CANNON.World();
    static physicsBlocks: Array3d<CANNON.Body> = new Array3d();
    static init() {
        PhysicsHandler.world.gravity.set(0, 0, -9.82);

        var fixedTimeStep = 1.0 / 20.0; // seconds
        var maxSubSteps = 3;

        // Start the simulation loop
        let lastTime: number;
        const simloop = (time?: any) => {
            requestAnimationFrame(simloop);
            if (lastTime !== undefined) {
                var dt = (time - lastTime) / 1000;
                PhysicsHandler.world.step(fixedTimeStep, dt, maxSubSteps);
            }
            lastTime = time;
        };
        setTimeout(() => {

            simloop();
        }, 2000);
        console.log("Physics initiated");
    }
    static addBlock(block: Block) {
        const loc = block.getLocation();
        const blockBody = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(loc.x, loc.y, loc.z), // m 
            type: CANNON.Body.STATIC
        });
        blockBody.addShape(new CANNON.Box(new CANNON.Vec3(1, 1, 1)));
        PhysicsHandler.world.addBody(blockBody);
        PhysicsHandler.physicsBlocks.set(block.getLocation(), blockBody);
    }
    static addChunk(chunk: Chunk) {
        chunk.getBlocks().filter(b => b.shouldRender()).forEach(PhysicsHandler.addBlock);
    }

}