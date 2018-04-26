import { RenderHandler } from './RenderHandler';

import * as THREE from "three";
import { Camera, Scene, WebGLRenderer, Vector3, Vector2, GeometryUtils, Geometry, Mesh } from "three";
// @ts-ignore
import * as OrbitControls from "three-orbitcontrols";
import { Chunk } from "../../Model/Voxel/Chunk";
import { World } from "../../Model/Voxel/World";

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

        this.camera.position.x = 50;
        this.camera.position.z = 50;
        this.camera.position.y = 10;
        const control = new OrbitControls(this.camera, this.renderer.domElement);

        var light = new THREE.AmbientLight(0x404040, 1.6); // soft white light
        this.scene.add(light);

        var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        this.scene.add(directionalLight);

        const animate = () => {
            requestAnimationFrame(animate);
            this.renderer.render(this.scene, this.camera);
            control.update();
        };

        animate();
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
        (async () => {
            for (const chunk of world.chunks.getAll()) {
                const meshes = await RenderHandler.render(chunk);
                meshes.forEach(mesh => this.scene.add(mesh));
            }

        })();
        window["scene"] = this.scene;
        window["THREE"] = THREE;
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