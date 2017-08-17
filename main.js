function init() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth/window.innerHeight,
    1,
    1000
  );
  var spotLight_01 = getSpotlight('rgb(145, 200, 255)', 1);
  spotLight_01.name = 'spotLight_01';
  var spotLight_02 = getSpotlight('rgb(255, 220, 180)', 1);
  spotLight_02.name = 'spotLight_02';
  
  // create geometric objects
  var plane = getPlane(50, 50);
  var sphere = getSphere(3);
  
  var tree = getTree(3);
  
  
  var grMountain = new THREE.Group();        
        grMountain.add(tree);
        grMountain.add(sphere);
  
  sphere.name = 'sphere';
  grMountain.name = 'grMountain';
  
  grMountain.position.z = 4;
  //LINIA POMOCNICZA
        //x = czerwony
        //y = zielony
        //z = niebieski
            //var axeLines = new THREE.AxisHelper(20);
            //scene.add(axeLines);
      
  
  // add objects to the scene
  scene.add(grMountain);
  //scene.add(tree);
  scene.add(plane);
  scene.add(spotLight_01);
  scene.add(spotLight_02);
  
  // transform objects
  camera.position.x = 0;
  camera.position.y = 6;
  camera.position.z = 6;
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  
    spotLight_01.position.x = 6;
    spotLight_01.position.y = 8;
    spotLight_01.position.z = -20;
  
    spotLight_02.position.x = -12;
    spotLight_02.position.y = 6;
    spotLight_02.position.z = -10;
  
  plane.rotation.x = Math.PI/2;
  //sphere.position.y = sphere.geometry.parameters.radius;
  
  var planeMaterial = plane.material;
  var sphereMaterial = sphere.material;
  
  planeMaterial.roughness = 0.65;
  planeMaterial.metalness = 0.75;
  planeMaterial.bumpScale = 0.01;
  
  sphereMaterial.bumpScale = 0.01;
  sphereMaterial.roughness = 0.75;
  sphereMaterial.metalness = 0.25;
  

  
  var renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  document.getElementById('webgl').appendChild(renderer.domElement);
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  var controls = new THREE.OrbitControls(camera, renderer.domElement);

  var winResize = new THREEx.WindowResize(renderer, camera);
  
  update(renderer, scene, camera, controls);
}

function getSphere(radius) {
	
  //ar geo = new THREE.SphereGeometry(radius, 24, 24);
  var geo = new THREE.CylinderGeometry(radius, radius, 7, 32);
  var material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  });
  var mesh = new THREE.Mesh(geo, material);
  //console.log('no i co?');
 
  mesh.rotation.z = -0.5 * Math.PI;
  //mesh.position.z = 4;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function getTree(radius) {
	
  var geo = new THREE.BoxGeometry(0.1, 1, 0.5);
  var material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  });
  var mesh = new THREE.Mesh(geo, material);
  //console.log('no i co?');
 
  //mesh.rotation.z = -0.5 * Math.PI;
  //mesh.position.z = 4;
  mesh.castShadow = true;
  mesh.position.y = 3.5;
  mesh.rotation.y = -0.5 * Math.PI;
  mesh.position.x = 2;
  
  return mesh;
}

function getPlane(w, h) {
  var geo = new THREE.PlaneGeometry(w, h);
  var material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  var mesh = new THREE.Mesh(geo, material);
  mesh.receiveShadow = true;
  
  return mesh;
}

function getSpotlight(color, intensity) {
  var light = new THREE.SpotLight(color, intensity);
  light.castShadow = true;
  
  light.shadow.mapSize.x = 4096;
  light.shadow.mapSize.y = 4096;
  
  return light;
}

function update(renderer, scene, camera, controls) {
  renderer.render(scene, camera);
  controls.update();

  var spotLight_02 = scene.getObjectByName('spotLight_02');
  spotLight_02.position.z = spotLight_02.position.z + 0.01;
  
  var sphere = scene.getObjectByName('grMountain');
  sphere.rotation.x += 0.01
  
  //var spotLight_01 = scene.getObjectByName('spotLight_01');
  //spotLight_01.position.z = spotLight_01.position.z - 0.01;
  
  requestAnimationFrame(function() {
    update(renderer, scene, camera, controls);
  })
}

init();
