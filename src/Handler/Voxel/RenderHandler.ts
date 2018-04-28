import { Vector3 } from 'three';
import * as THREE from "three";
import { WebGLRenderer } from 'three';
import { Camera } from 'three';
import { Scene } from 'three';
// @ts-ignore
import * as OrbitControls from "three-orbitcontrols";

import { VX } from './VX';
import { Mesh, Geometry, MeshBasicMaterial, TextureLoader, Face3, Vector2, MeshLambertMaterial } from 'three';
import { Chunk, CHUNK_WIDTH } from './../../Model/Voxel/Chunk';
import { Direction } from '../../Model/Voxel/Direction';
import { World } from '../../Model/Voxel/World';

export class RenderHandler {

    static scene: Scene;
    static camera: Camera;
    static renderer: WebGLRenderer;
    static canvasRef: HTMLCanvasElement;
    static ctx: CanvasRenderingContext2D;
    static init(canvasRef: HTMLCanvasElement) {

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
            const el: HTMLElement = document.getElementById("info") as any;
            el.innerHTML = this.renderer.info.render["lines"] / 3 as any;
        };

        animate();
        window["scene"] = this.scene;
        window["THREE"] = THREE;
    }
    static render(chunk: Chunk): Promise<Mesh[]> {
        return new Promise(resolve => {
            const meshes: Mesh[] = [];
            let verticesIndex = 0;
            var geom = new Geometry();

            for (let currentType of chunk.getContainedTypes()) {
                for (let direction of VX.eachEnum(Direction)) {
                    for (let x = 0; x < CHUNK_WIDTH; x++) {
                        for (let y = 0; y < CHUNK_WIDTH; y++) {
                            for (let z = 0; z < CHUNK_WIDTH; z++) {
                                const block = chunk.getBlock(new Vector3(x, y, z));
                                if (block.getType() === currentType && block.shouldRender(direction)) {
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
                    }
                }
                var mesh = new Mesh(geom, new MeshLambertMaterial({
                    map: new TextureLoader().load(VX.getTexture(currentType)),
                    wireframe: true
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