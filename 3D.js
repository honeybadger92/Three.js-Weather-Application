var main = function(){
  var camera,scene,renderer;
  var cubeMesh;
  var hElW = $('#background').width();
	var hElH = $('#background').height();
  
  
  function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 55, 1, 1, 10000 ); 		// camera var assigned
		camera.position.z = 400;										
		camera.aspect = hElW / hElH;									              // aspect ratio set to width and height of the div tag.
		scene.add(camera);		
		camera.updateProjectionMatrix();
		
		
		var geo = new THREE.BoxGeometry(100,100,100);
		var mat = new THREE.MeshBasicMaterial({color:0xff0000});
		
		cubeMesh = new THREE.Mesh(geo,mat);
		scene.add(cubeMesh);
		
		
		
		renderer = new THREE.WebGLRenderer({ antialias: true });
		//size of the canvas
    renderer.setSize( hElW, hElH );
    
    
    document.getElementById("background").appendChild(renderer.domElement);
  }
  
  var render = function(){
    requestAnimationFrame(render);
    renderer.render(scene,camera);
  }
  
  render();
  
  
};

$(document).ready(main);
