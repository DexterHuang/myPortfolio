import { Chunk } from './../Model/Voxel/Chunk';

import * as THREE from "three";
import { Camera, Scene, WebGLRenderer, Vector3 } from "three";
// @ts-ignore
import * as OrbitControls from "three-orbitcontrols";

export class VoxelHandler {
    static scene: Scene;
    static camera: Camera;
    static renderer: WebGLRenderer;
    static canvasRef: HTMLCanvasElement;
    static setUp(canvasRef: HTMLCanvasElement) {
        this.canvasRef = canvasRef;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.camera.position.z = 5;
        const control = new OrbitControls(this.camera, this.renderer.domElement);
        const animate = () => {
            requestAnimationFrame(animate);
            this.renderer.render(this.scene, this.camera);
            control.update();
        };
        animate();

        const chunk = new Chunk(new Vector3(0, 0, 0));
        this.scene.add(chunk.getMesh());
    }
    static createCube(pos: Vector3) {
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: "skyblue" });
        var cube = new THREE.Mesh(geometry, material);
        cube.position.set(pos.x, pos.y, pos.z);
        this.scene.add(cube);
    }
    static createPlane() {
        var geometry = new THREE.PlaneGeometry(1, 2);
        var material = new THREE.MeshBasicMaterial({ color: "skyblue" });
        var cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
    }
}