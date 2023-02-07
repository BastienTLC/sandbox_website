import {EventEmitter} from "events";
import {Experience} from "../Experience";
import {Renderer} from "../Renderer";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import * as THREE from 'three';


export class Resources extends EventEmitter{
    private experience: Experience;
    private renderer: Renderer;
    assets: any;
    items: { [key: string]: any } = {};
    private queue: number;
    private loaded: number;
    private loarders: any;
    private video!: any;
    private videoTexture!: any;


    constructor(assets:any) {
        super();
        this.experience = Experience.instance;
        this.renderer = this.experience.renderer;

        this.assets = assets;

        this.items = {};
        this.queue = this.assets.length;
        this.loaded = 0;

        this.setLoarders();
        this.startLoading();
    }

    setLoarders(){
        this.loarders = {};
        this.loarders.gltfLoader = new GLTFLoader();
        this.loarders.dracoLoader = new DRACOLoader();
        this.loarders.dracoLoader.setDecoderPath("../../assets/draco/");
        this.loarders.gltfLoader.setDRACOLoader(this.loarders.dracoLoader);

    }
    startLoading(){
        for(const asset of this.assets){
            if (asset.type==="gltf"){
                this.loarders.gltfLoader.load(asset.path,(file:any) =>{
                    this.singleAssetLoaded(asset, file);
                })
            }
            else if (asset.type === "mp4"){
                this.video ={};
                this.videoTexture = {};

                this.video[asset.name] = document.createElement("video");
                this.video[asset.name].src = asset.path;
                this.video[asset.name].playsInline = true;
                this.video[asset.name].muted = true;
                this.video[asset.name].autoplay = true;
                this.video[asset.name].loop = true;
                this.video[asset.name].play();
                this.videoTexture[asset.name] = new THREE.VideoTexture(
                    this.video[asset.name]
                );
                this.videoTexture[asset.name].flipY = true;
                this.videoTexture[asset.name].minFilter = true;
                this.videoTexture[asset.name].mageFilter = THREE.NearestFilter;
                this.videoTexture[asset.name].generateMipmaps = false;
                this.videoTexture[asset.name].encoding = THREE.sRGBEncoding
            }
            else if(asset.type === "texture"){
                this.loadImage(asset);
            }
        }
    }

    singleAssetLoaded(asset: any, file: any){
        this.items[asset.name] = file;
        this.loaded++;
        if (this.loaded === this.queue){
            this.emit("ready");
        }
    }
    loadImage(asset: any){
        this.items[asset.name] = asset.path;
        this.loaded++;
        if (this.loaded === this.queue)
            this.emit("ready");
    }
}