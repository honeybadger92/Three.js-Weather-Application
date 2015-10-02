var main = function(){
	
  var camera,scene,renderer;
  var angle = 0.001, radius = 400;
  var moonLight,sunLight,hemLight;
  
  var hElW = $('#background').width();
  var hElH = $('#background').height();
  
  init();
  
  function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 55, 1, 1, 10000 ); 		// camera var assigned
	camera.position.z = 400;										
	camera.aspect = hElW / hElH;									              // aspect ratio set to width and height of the div tag.
	scene.add(camera);		
	camera.updateProjectionMatrix();
		
	initSkySolar();
	//initSky();
		
	var cubeMesh = new THREE.Mesh(new THREE.BoxGeometry(100,100,100),new THREE.MeshBasicMaterial({color:0xFF0000}));
		scene.add(cubeMesh);
		
	renderer = new THREE.WebGLRenderer({ antialias: true });
	//size of the canvas
	 renderer.setSize( hElW, hElH );
    
    
    	document.getElementById("background").appendChild(renderer.domElement);
    	
  }
  
  function initSkySolar(){
  	console.log("initSkySolar");
  	var moonMeshHelper = new THREE.Mesh(new THREE.SphereGeometry(8,16,8),new THREE.MeshBasicMaterial({color:0xE6E6E6}));
  	var sunMeshHelper = new THREE.Mesh(new THREE.SphereGeometry(8,16,8),new THREE.MeshBasicMaterial({color:0xEECD4D}));
  	
  	var cycleOriginMeshHelper = new THREE.Mesh(new THREE.SphereGeometry(1,1,1),new THREE.MeshBasicMaterial({color:0xFFFFFF}));
  		cycleOriginMeshHelper.position.set(0,-185,-350);
  		scene.add(cycleOriginMeshHelper);
  		
  	var gGeo = new THREE.PlaneGeometry(1200,600);
  	var gMat = new THREE.MeshPhongMaterial({color:0xFFFFFF,specular:0x050505});
  		gMat.color.setHSL(0.095, 1 , 0.75);
  	var gnd = new THREE.Mesh(gGeo,gMat);
  		gnd.position.set(-1.7,-150,-100);
  		scene.add(gnd);
  		
  	//Lights
  	moonLight = new THREE.PointLight(0xA0B7FF,1,2000);
  		cycleOriginMeshHelper.add(moonLight);
  		moonLight.add(moonMeshHelper);
  		
  	sunLight = new THREE.PointLight(0xFF9900,5,2000);
  		cycleOriginMeshHelper.add(sunLight);
  		sunLight.add(sunMeshHelper);
  		
  	hemLight = new THREE.HemisphereLight(0xffffff,0xffffff,0.6);
		hemLight.color.setHSL(0.6,1,0.27);
		hemLight.groundColor.setHSL(0.095,1,0.75);
		hemLight.position.set(0,500,0);
		scene.add(hemLight);
		
  		
  	var sunSpotLight = new THREE.SpotLight(0xFFFFFF);
  		sunLight.intensity = 1.2;
  		sunLight.add(sunSpotLight);
  		sunSpotLight.target = camera;
  	
  	var moonSpotLight = new THREE.SpotLight(0x595959);
  		moonLight.intensity = 1.6;
  		moonLight.add(moonSpotLight);
  		moonSpotLight.target = camera;
  }
  
  var render = function(){
    	requestAnimationFrame(render);
	renderer.render(scene,camera);
  }
  
  render();
  
  
};

$(document).ready(main);
