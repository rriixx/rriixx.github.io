var container, camera, scene, renderer, poly;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

$(document).ready(function() {
	init();
	$(window).load(function() {
		setTimeout(function() {
			animate();
		}, 100);
	});

	// resize window
	$(window).on('resize', onWindowResize);
});


function init() {
	container = document.getElementById('poly');
	// camera
	camera = new THREE.PerspectiveCamera(5, 750 / 500, 1, 1000);
	camera.position.z = 50;

	// scene
	scene = new THREE.Scene();

	// light
	var ambientLight = new THREE.AmbientLight(0xc399d0);
	scene.add(ambientLight);

	var directionalLight = new THREE.DirectionalLight(0xf0dcf6);
	directionalLight.intensity = 0.35;
	directionalLight.position.set(1, 1, 1);

	scene.add(directionalLight);

	// manager
	var manager = new THREE.LoadingManager();

	//texture
	var texture = new THREE.Texture();
	var loader = new THREE.ImageLoader(manager);
	loader.load('../textures/texture2.jpg', function (image) {
		texture.image = image;
		texture.needsUpdate = true;
	});

	// poly model
	var loader = new THREE.OBJLoader(manager);
	loader.load('../obj/poly.obj', function(object) {
		poly = object
		poly.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				//child.material.map = texture;
			}
		});
		poly.position.y = 0;
		poly.position.z = 23;

		scene.add(object);
	});

	// render
	renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
	renderer.setSize(750, 500);
	container.appendChild(renderer.domElement);

	container.addEventListener( 'mousedown', onDocumentMouseDown, false );
	container.addEventListener( 'touchstart', onDocumentTouchStart, false );
	container.addEventListener( 'touchmove', onDocumentTouchMove, false );
	camera.lookAt( scene.position );
}

function onDocumentMouseDown( event ) {
	event.preventDefault();

	container.addEventListener( 'mousemove', onDocumentMouseMove, false );
	container.addEventListener( 'mouseup', onDocumentMouseUp, false );
	container.addEventListener( 'mouseout', onDocumentMouseOut, false );

	mouseXOnMouseDown = event.clientX - windowHalfX;
	targetRotationOnMouseDown = targetRotation;
}

function onDocumentMouseMove( event ) {
	mouseX = event.clientX - windowHalfX;

	targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;

}

function onDocumentMouseUp( event ) {
	container.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	container.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	container.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentMouseOut( event ) {
	container.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	container.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	container.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentTouchStart( event ) {
	if ( event.touches.length === 1 ) {
		event.preventDefault();

		mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
		targetRotationOnMouseDown = targetRotation;
	}
}

function onDocumentTouchMove( event ) {
	if ( event.touches.length === 1 ) {
		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;
	}
}

function animate() {
	requestAnimationFrame(animate);
	render();
}

function render() {
	poly.rotation.y = poly.rotation.y += ( targetRotation - poly.rotation.y ) * 0.05;
	//poly.rotation.y -= 0.05;

	camera.lookAt(scene.position);
	renderer.render(scene, camera);
}

function onWindowResize() {
	camera.aspect = $(container).innerWidth() / $(container).innerHeight();
	camera.updateProjectionMatrix();

	renderer.setSize($(container).innerWidth(), $(container).innerHeight());
}