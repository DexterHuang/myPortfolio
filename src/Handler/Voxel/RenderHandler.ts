import { PhysicsHandler } from './PhysicsHandler';
import { Direction } from './../../Model/Voxel/Direction';
import { Vector3, BoxGeometry } from 'three';
import * as THREE from "three";
import { WebGLRenderer } from 'three';
import { Camera } from 'three';
import { Scene } from 'three';
// @ts-ignore
import * as OrbitControls from "three-orbitcontrols";

import { VX } from './VX';
import { Mesh, Geometry, MeshBasicMaterial, TextureLoader, Face3, Vector2, MeshLambertMaterial } from 'three';
import { Chunk, CHUNK_WIDTH } from './../../Model/Voxel/Chunk';
import { World } from '../../Model/Voxel/World';
import { Block } from '../../Model/Voxel/Block';

export class RenderHandler {

    static scene: Scene;
    static camera: Camera;
    static renderer: WebGLRenderer;
    static canvasRef: HTMLCanvasElement;
    static ctx: CanvasRenderingContext2D;
    static control: OrbitControls;
    static init(canvasRef: HTMLCanvasElement) {

        this.canvasRef = canvasRef;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.camera.position.x = 50;
        this.camera.position.z = 50;
        this.camera.position.y = 10;
        this.control = new OrbitControls(this.camera, this.renderer.domElement);

        var light = new THREE.AmbientLight(0x404040, 1.6); // soft white light
        this.scene.add(light);

        var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        this.scene.add(directionalLight);
        window["scene"] = this.scene;
        window["THREE"] = THREE;
    }
    static render() {
        this.renderer.render(this.scene, this.camera);
        this.control.update();
        const el: HTMLElement = document.getElementById("info") as any;
        const html = `<p>Triangle Count: ${this.renderer.info.render["triangles"]}</p>`;
        if (el.innerHTML !== html) {
            el.innerHTML = html;
        }
    }
    static getChunkMeshes(chunk: Chunk): Promise<Mesh[]> {
        return new Promise(resolve => {
            const meshes: Mesh[] = [];

            for (let currentType of chunk.getContainedTypes()) {
                var geom = new Geometry();
                let verticesIndex = 0;
                for (let direction of VX.eachEnum(Direction)) {
                    for (let elevation = 0; elevation < CHUNK_WIDTH; elevation++) {
                        const skipBlocks: { [key: string]: any } = {};
                        for (let d1 = 0; d1 < CHUNK_WIDTH; d1++) {
                            for (let d2 = 0; d2 < CHUNK_WIDTH; d2++) {
                                const block = chunk.getBlock(this.transformElevationVector(direction, elevation, d1, d2));
                                if (block.getType() === currentType &&
                                    block.shouldRender(direction) &&
                                    !skipBlocks[block.toString()]) {
                                    let nd1, nd2 = 0;
                                    for (nd1 = d1 + 1; nd1 < CHUNK_WIDTH; nd1++) {
                                        const nBlock = chunk.getBlock(this.transformElevationVector(direction, elevation, nd1, d2));
                                        if (this.canRenderMesh(nBlock, currentType, skipBlocks, direction)) {
                                            //
                                        } else {
                                            break;
                                        }
                                    }
                                    nd1 -= 1;
                                    for (nd2 = d2; nd2 < CHUNK_WIDTH; nd2++) {
                                        let ok = true;
                                        const bs: Block[] = [];
                                        for (let nnd1 = d1; nnd1 <= nd1; nnd1++) {
                                            const nBlock = chunk.getBlock(this.transformElevationVector(direction, elevation, nnd1, nd2, ));
                                            if (this.canRenderMesh(nBlock, currentType, skipBlocks, direction)) {
                                                bs.push(nBlock);
                                            } else {
                                                ok = false;
                                                break;
                                            }
                                        }
                                        if (ok && bs.length > 0) {
                                            bs.forEach(b => skipBlocks[b.toString()] = 1);
                                        } else {
                                            break;
                                        }
                                    }
                                    nd2 -= 1;
                                    const b0 = chunk.getBlock(this.transformElevationVector(direction, elevation, d1, d2))
                                        .getVertices();
                                    const b1 = chunk.getBlock(this.transformElevationVector(direction, elevation, nd1, d2)).getVertices();
                                    const b2 = chunk.getBlock(this.transformElevationVector(direction, elevation, nd1, nd2)).getVertices();
                                    const b3 = chunk.getBlock(this.transformElevationVector(direction, elevation, d1, nd2)).getVertices();
                                    let v = Block.getFaceVerticesIndexes(direction);
                                    let vertices = [];
                                    switch (direction) {
                                        case (Direction.NORTH): {
                                            vertices = [b3[v[2]], b2[v[3]], b1[v[0]], b0[v[1]]];
                                            break;
                                        }
                                        case (Direction.SOUTH): {
                                            vertices = [b0[v[0]], b1[v[1]], b2[v[2]], b3[v[3]]];
                                            break;
                                        }
                                        case (Direction.EAST): {
                                            vertices = [b3[v[1]], b2[v[2]], b1[v[3]], b0[v[0]]];
                                            break;
                                        }
                                        case (Direction.WEST): {
                                            vertices = [b0[v[1]], b1[v[2]], b2[v[3]], b3[v[0]]];
                                            break;
                                        }
                                        case (Direction.DOWN): {
                                            vertices = [b3[v[0]], b2[v[1]], b1[v[2]], b0[v[3]]];
                                            break;
                                        }
                                        case (Direction.UP): {
                                            vertices = [b0[v[0]], b1[v[1]], b2[v[2]], b3[v[3]]];
                                            break;
                                        }
                                        default: {
                                            throw (new Error("WTF"));
                                        }
                                    }
                                    geom.vertices = geom.vertices.concat(vertices);

                                    geom.faces.push(new Face3(
                                        0 + verticesIndex,
                                        2 + verticesIndex,
                                        1 + verticesIndex));
                                    geom.faces.push(new Face3(
                                        0 + verticesIndex,
                                        3 + verticesIndex,
                                        2 + verticesIndex));
                                    const width = nd1 - d1 + 1;
                                    const height = nd2 - d2 + 1;
                                    geom.faceVertexUvs[0].push([
                                        new Vector2(0, 0),
                                        new Vector2(width, height),
                                        new Vector2(width, 0),
                                    ], [
                                            new Vector2(0, 0),
                                            new Vector2(0, height),
                                            new Vector2(width, height),
                                        ]);
                                    geom.computeFaceNormals();
                                    verticesIndex += 4;
                                }
                            }
                        }
                    }
                }
                const texture = new TextureLoader().load(VX.getTexture(currentType));
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                var mesh = new Mesh(geom, new MeshLambertMaterial({
                    map: texture,
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
    private static canRenderMesh(block: Block, currentType: number, skipList: { [key: string]: any }, direction: Direction) {
        if ((block.getType() === currentType &&
            !skipList[currentType.toString()]) ||
            (block.getType() !== 0 && block.shouldRender(direction) === false)) {
            return true;
        }
        return false;
    }
    public static transformElevationVector(direction: Direction, elevation: number, d1: number, d2: number) {
        switch (direction) {
            case (Direction.NORTH): {
                return new Vector3(d1, d2, elevation);
            }
            case (Direction.SOUTH): {
                return new Vector3(d1, d2, elevation);
            }
            case (Direction.EAST): {
                return new Vector3(elevation, d1, d2);
            }
            case (Direction.WEST): {
                return new Vector3(elevation, d1, d2);
            }
            case (Direction.DOWN): {
                return new Vector3(d1, elevation, d2);
            }
            case (Direction.UP): {
                return new Vector3(d1, elevation, d2);
            }
            default: {
                throw (new Error("No such direction: " + direction));
            }
        }
    }
    static renderDebugBox(loc: Vector3, x: number, y: number, z: number) {

        var mesh = new Mesh(new BoxGeometry(x, y, z), new MeshLambertMaterial({
            wireframe: true,
        }));
        mesh.position.set(loc.x, loc.y, loc.z);
        this.scene.add(mesh);
    }
}