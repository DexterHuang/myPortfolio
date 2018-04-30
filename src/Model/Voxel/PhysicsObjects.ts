
import CANNON from "cannon";
import * as THREE from "three";

export class PhysicsObject {

    constructor(public mesh: THREE.Mesh, public body: CANNON.Body) {

    }
    update() {
        this.mesh.position.copy(this.body.position as any);
        this.mesh.quaternion.copy(this.body.quaternion as any);
    }
}