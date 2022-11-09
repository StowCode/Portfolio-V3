/////////////////////////////////////////////////////////////////////////
///// IMPORT
import './main.css'
import * as THREE from 'three'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/////////////////////////////////////////////////////////////////////////
//// DRACO LOADER TO LOAD DRACO COMPRESSED MODELS FROM BLENDER
const dracoLoader = new DRACOLoader()
const loader = new GLTFLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
dracoLoader.setDecoderConfig({ type: 'js' })
loader.setDRACOLoader(dracoLoader)

/////////////////////////////////////////////////////////////////////////
///// DIV CONTAINER CREATION TO HOLD THREEJS EXPERIENCE
const container = document.getElementById('canvas')

/////////////////////////////////////////////////////////////////////////
///// SCENE CREATION
const scene = new THREE.Scene()
scene.background = new THREE.Color('rgb(22,22,22)')

/////////////////////////////////////////////////////////////////////////
///// RENDERER CONFIG

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true}) // turn on antialias
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) //set pixel ratio
renderer.setSize(sizes.width, sizes.height) // make it full screen
renderer.outputEncoding = THREE.sRGBEncoding // set color encoding
container.appendChild(renderer.domElement) // add the renderer to html div
renderer.setClearColor( 0x000000, 0 );

/////////////////////////////////////////////////////////////////////////
///// CAMERAS CONFIG


const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, .001, 100)
camera.position.set(0,0,1)
scene.add(camera)


/////////////////////////////////////////////////////////////////////////
///// CREATE ORBIT CONTROLS
const controls = new OrbitControls(camera, renderer.domElement)

///// UPDATE RENDER SIZE
window.addEventListener('resize', () => {
    const width = window.innerWidth
    const height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
    renderer.setPixelRatio(2)
})

/////////////////////////////////////////////////////////////////////////
///// SCENE LIGHTS
const ambient = new THREE.AmbientLight(0xa0a0fc, 0.82)
scene.add(ambient)

const sunLight = new THREE.DirectionalLight(0xe8c37b, 1.96)
sunLight.position.set(-69,44,14)
scene.add(sunLight)

/////////////////////////////////////////////////////////////////////////
///// LOADING GLB/GLTF MODEL FROM BLENDER
loader.load('models/gltf/space_exploration_wlp_series_8.glb', function (gltf) {
    const spaceScene = gltf.scene;
    spaceScene.position.y = 4;
    
    /////////////////////////////////////////////////////////////////////////
    //// Planet Tween Chain


    
    scene.add(gltf.scene)
})

/////////////////////////////////////////////////////////////////////////
//// INTRO CAMERA ANIMATION USING TWEEN
function introAnimation() {
    controls.enabled = false //disable orbit controls to animate the camera
    
    new TWEEN.Tween(camera.position.set(26,4,-35 )).to({ // from camera position
        x: 16, //desired x position to go
        y: 50, //desired y position to go
        z: -0.1 //desired z position to go
    }, 6500) // time take to animate
    .delay(1000).easing(TWEEN.Easing.Quartic.InOut).start() // define delay, easing
    .onComplete(function () { //on finish animation
        controls.enabled = true //enable orbit controls
        setOrbitControlsLimits() //enable controls limits
        TWEEN.remove(this) // remove the animation from memory
    })
}

// introAnimation() // call intro animation on start



/////////////////////////////////////////////////////////////////////////
//// DEFINE ORBIT CONTROLS LIMITS
function setOrbitControlsLimits(){
    controls.enableDamping = false
    controls.dampingFactor = 1
    controls.minDistance = 35
    controls.maxDistance = 60
    controls.enableRotate = false
    controls.enableZoom = false;
    controls.maxPolarAngle = Math.PI /2.5
    controls.autoRotate = true
    controls.autoRotateSpeed = 3
    controls.enablePan = false
}

setOrbitControlsLimits()

/////////////////////////////////////////////////////////////////////////
//// RENDER LOOP FUNCTION
function renderLoop() {

    TWEEN.update() // update animations

    controls.update() // update orbit controls

    renderer.render(scene, camera) // render the scene using the camera

    requestAnimationFrame(renderLoop) //loop the render function
    
}

renderLoop() //start rendering

////////////////////////////////////////////////
//////////////////////////////////////////////// 
// Mobile Navbar

function mobileMenu() {
    if (document.getElementById('mobilenavlinkcontainer').style.display ==  'block') {
        document.getElementById('mobilenavlinkcontainer').style.display = 'none';
    } else {
        document.getElementById('mobilenavlinkcontainer').style.display = 'block';
    } 
}
document.getElementById('hamburger').addEventListener('click', mobileMenu);


function mobileLinkClick() {
    document.getElementById('mobilenavlinkcontainer').style.display = 'none';
}

// Intersection Observer 1
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0
    }

    const bio = document.getElementById("biocontainer");
    const wtf = document.getElementById("wtf");
    const portfolio = document.getElementById("portfolio");
    const weather = document.getElementById("weather");
    const todo = document.getElementById("todolist");
    const three_js = document.getElementById('three_js_demo')

    function IntersectionSlideUp(entries) {
        entries.map((entry) =>{
            if (entry.intersectionRatio > 0) {
                // Call this function only once per element
            if (entry.isIntersecting) {
                entry.target.classList.add('slideUp')
            } else {
                entry.target.classList.remove('slideUp')
            }
        }
    });
}

const observer = new IntersectionObserver(IntersectionSlideUp,options);

observer.observe(bio);
observer.observe(wtf);
observer.observe(portfolio);
observer.observe(weather);
observer.observe(todo);
observer.observe(three_js)

/* parallax mouse move */

document.addEventListener("mousemove", parallax);
function parallax(e){
    this.querySelectorAll('.layer').forEach(layer => {
        const speed = layer.getAttribute('data-speed')

        const x = (window.innerWidth - e.pageX*speed)/100
        const y = (window.innerHeight - e.pageY*speed)/100

        layer.style.transform = `translateX(${x}px) translateY(${y}px)`
    })
}

/* parallax scroll effects */

const geo1 = document.getElementById('geo1');
const geo2 = document.getElementById('geo2');
const geo3 = document.getElementById('geo3');
const geo4 = document.getElementById('geo4');

window.addEventListener('scroll', function(){
    var value = window.scrollY;

    geo1.style.marginLeft = value * -.5 + 'px';
    geo3.style.marginLeft = value * -1 + 'px';

    geo2.style.marginRight = value * -.5 + 'px';
    geo4.style.marginRight = value * -1 + 'px';


})

