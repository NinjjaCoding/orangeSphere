import './style/main.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import * as dat from 'dat.gui'; //npm i dat.gui
import { PointLightHelper } from 'three';

    //to apply texture to geometry we need TextureLoaders threejs component
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('./textures/earth.png'); //texture is not applying 

    // //debugging
// const gui = new dat.GUI();

    //canvas and scene
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

    //geometry & material = Mesh
const sphereGeometry = new THREE.SphereBufferGeometry(.5, 65, 65);

    // const material = new THREE.MeshBasicMaterial()
const material = new THREE.MeshStandardMaterial()
material.metalness= 0.7
material.roughness= 0.3
material.stars1 = normalTexture //texture applied

    //Mesh
const sphere = new THREE.Mesh(sphereGeometry, material);
scene.add(sphere);
    // Test
// const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), new THREE.MeshNormalMaterial())
// scene.add(cube)

    //lights and types of lights
const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.set(2,3,4);
scene.add(pointLight)

    //light 2
const pointLight2 = new THREE.PointLight(0xff0000, 2);
pointLight2.position.set(1,1,1); //we get the  values from gui display site and plug them here 
pointLight2.intensity = 1;
scene.add(pointLight2);

        //gui is for dev purposes and fun
// gui.add(pointLight2.position, 'z').min(-5).max(20).step(0.5);
// gui.add(pointLight2.position, 'x');
// gui.add(pointLight2.position, 'y');
// gui.add(pointLight2, 'intensity').min(0).max(10).step(0.5);

        //light 3
const pointLight3 = new THREE.PointLight(0xff0000, 2);
pointLight3.position.set(-1.86,1,-1.65); //we get the  values from gui display site and plug them here 
pointLight3.intensity = 10;
scene.add(pointLight3);

        //we can put gui display for each object in separate folders
// const light2 = gui.addFolder('light2')

        //gui is for dev purposes and fun
// light2.add(pointLight3.position, 'z').min(-5).max(20).step(0.5);
// light2.add(pointLight3.position, 'x');
// light2.add(pointLight3.position, 'y');
// light2.add(pointLight3, 'intensity').min(0).max(10).step(0.5);


        //if we want to change color for each light we create an object with color prop the use onChange
// const lightColor = {
//     color: 0xff0000
// }
// light2.addColor(lightColor, 'color')
// .onChange(() => {
//     pointLight2.color.set(lightColor.color)
// })

        //we can also add lightHelpers to help with lighting...many diff types
// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1);
// scene.add(pointLightHelper)

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1);
// scene.add(pointLightHelper2)


    /*** Sizes*/
window.addEventListener('resize', () =>
{    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
})



    // Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 3 //camera.position.z = 0 or 3 etc for y & z
camera.lookAt(0,0,0)
scene.add(camera)

    // Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: false,
})
renderer.setPixelRatio(window.devicePixelRatio, 2)
renderer.setSize(window.innerWidth, window.innerHeight)

    //to move objects around with mouse--we addEventListener and function to track mouse onDocumentMouseMove
document.addEventListener('mouseover', onDocumentMouseMove)
let mouseX = 0; //mouse x/y are cursore positions
let mouseY =0;
let targetX = 0; //targetx/y are screen postions at mousex/y positions
let targetY = 0;

const windowHalfX = window.innerWidth / 2; //screen is divided into 2 halves and 
const windowHalfY = windowHalfX.innerHeight / 2; //cursor position subtracted from each coordinates 
    //now to create the function
 function  onDocumentMouseMove(event)  {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
}

//now let say we want the size of sphere to change when scrolling
const updateSphere= (event) => {
    sphere.position.y = window.scrollY * .001
}
window.addEventListener('scroll', updateSphere);




const clock = new THREE.Clock()


    /**Loop */
const animate = () =>{// Keep looping through animation
    window.requestAnimationFrame(animate) 
    //code for 3d effects pur here 

    const elapsedTime = clock.getElapsedTime()
    sphere.rotation.y = .5 * elapsedTime
    //interact with mouse rotation
    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.z += 1.5 * (targetY - sphere.rotation.x)
    sphere.position.y += -.5 * (targetY - sphere.rotation.x)

    // cube.rotation.y += 0.0
    // cube.rotation.x += 0.01

    // update Renderer
    renderer.render(scene, camera)  
}
animate();