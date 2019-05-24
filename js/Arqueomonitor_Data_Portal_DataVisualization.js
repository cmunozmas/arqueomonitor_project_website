// JavaScript Document


//-----------------------------------------------------------------------------------------
//---------------------- Generación de mapa ----------------------------------------------
//-----------------------------------------------------------------------------------------

var map = L.map('map', {crs: L.CRS.EPSG3857}).setView([36.5008762379097,-6.2684345022], 11,

 {
  fullscreenControl: true,
  fullscreenControlOptions: {
    position: 'bottomleft'
  }
});

//evento en el mapa para edición de elementos
map.on('draw:created', function (evento) {
var layer = evento.layer;
capaEdicion.addLayer(layer);	//permite editar los elementos dibujados en la capa de dibujo creada con el plugin Draw
});


//marcador de coordenadas del mouse
L.control.mousePosition({position:'topright',}).addTo(map);

// create a fullscreen button and add it to the map
L.control.fullscreen({
  position: 'topleft', // change the position of the button can be topleft, topright, bottomright or bottomleft, defaut topleft
  title: 'Show fullscreen', // change the title of the button, default Full Screen
  titleCancel: 'Exit fullscreen mode', // change the title of the button when fullscreen is on, default Exit Full Screen
  content: null, // change the content of the button, can be HTML, default null
  forceSeparateButton: true, // force seperate button to detach from zoom buttons, default false
  forcePseudoFullscreen: true, // force use of pseudo full screen even if full screen API is available, default false
  fullscreenElement: false // Dom element to render in full screen, false by default, fallback to map._container
}).addTo(map);

// events are fired when entering or exiting fullscreen.
map.on('enterFullscreen', function(){
  console.log('entered fullscreen');
});

map.on('exitFullscreen', function(){
  console.log('exited fullscreen');
});


//-----------------------------------------------------------------------------------------
//---------------------- Generación de capas ----------------------------------------------
//-----------------------------------------------------------------------------------------

//capa base mapbox satelite
L.mapbox.accessToken = 'pk.eyJ1IjoiY3Jpc3RpYW5tbWFzIiwiYSI6ImNpaTRmcTR3MDAxYXd0eGtxc2NiczcxMm8ifQ.l3IYt536DYO_OfE1qSHmlw';
var mapboxTiles = L.tileLayer('https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
    attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
}).addTo(map);

//capa para mapa base MapQuest
var mqo = L.tileLayer('http://otile4.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
	maxZoom: 30, 
	name: 'mapquest',	
	attribution: 'Map data &copy;<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/bysa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
	subdomains: '1234'
});

//capa para mapa de referencia
var osm1 = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  name: 'osm',
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});


var imageUrl = '../data/bucentaure/bathimetry/buc_EPSG_4326.png',
    imageBounds = [[36.53550663310392, -6.328099222437864], [36.54439008748451, -6.317298910086497]];
var buc_bat = L.imageOverlay(imageUrl, imageBounds);

var imageUrl_foug = '../data/fougueux/bathimetry/foug_EPSG_4326.png',
    imageBounds = [[36.40610443507485, -6.24002080621217], [36.41377218845839, -6.2306157374222355]];
var foug_bat = L.imageOverlay(imageUrl_foug, imageBounds);
//capa REG_Hs_20091230
var imageUrl_1 = '../data/fougueux/modeling/Hs_20091230_EPSG4326.png',
    imageBounds_1 = [[36.369677752511066, -6.317495597750756], [36.45191962020507, -6.184139640580649]];
var foug_Hs20091230 = L.imageOverlay(imageUrl_1, imageBounds_1);
//capa REG_Hs_2015122217
var imageUrl_2 = '../data/bucentaure/modeling/REG_Hs_2015122217_EPSG4326.png',
    imageBounds_2 = [[36.39656895912218, -6.534172978967404], [36.665911101732675, -6.0966243329601495]];
var buc_REG_Hs2015122217 = L.imageOverlay(imageUrl_2, imageBounds_2);
//capa buc_vel_2015122217
var imageUrl_3 = '../data/bucentaure/modeling/REG_VEL_2015122217_EPSG4326.png',
    imageBounds_3 = [[36.39656895912218, -6.534172978967404], [36.665911101732675, -6.096624332960149]];
var buc_vel_2015122217 = L.imageOverlay(imageUrl_3, imageBounds_3);
//capa foug_vel_20091230
var imageUrl_4 = '../data/fougueux/modeling/VEL_20091230_EPSG4326.png',
    imageBounds_4 = [[36.369677752511066, -6.317495597750756], [36.45191962020507, -6.184139640580649]];
var foug_vel_20091230 = L.imageOverlay(imageUrl_4, imageBounds_4);
//capa foug_dispersion
var imageUrl_5 = '../data/fougueux/modeling/DISPERSION_FOUGUEUX_EPSG4326.png',
    imageBounds_5 = [[36.36213634737286, -6.318474488372591], [36.45612420613551, -6.166486767330522]];
var foug_dispersion = L.imageOverlay(imageUrl_5, imageBounds_5);
//capa buc_CSR
var imageUrl_6 = '../data/bucentaure/modeling/CSR_EPSG4326.png',
    imageBounds_6 = [[36.3969762241966, -6.546981895104666], [36.66605525312654, -6.108535857467036]];
var buc_CSR = L.imageOverlay(imageUrl_6, imageBounds_6);
//capa buc_CSI
var imageUrl_7 = '../data/bucentaure/modeling/CSI_EPSG4326.png', imageBounds_6
var buc_CSI = L.imageOverlay(imageUrl_7, imageBounds_6);
//capa buc_CRI
var imageUrl_8 = '../data/bucentaure/modeling/CRI_EPSG4326.png', imageBounds_6
var buc_CRI = L.imageOverlay(imageUrl_8, imageBounds_6);
//estilo personalizado para los puntos de lacapa vectorial kml
var estiloCirculosAmarillo = {
radius: 5,
fillColor: "#FF0",
color: "#F00",
weight: 1,
opacity: 1,
fillOpacity: 0.8
};

var estiloLinea = {
radius: 5,
fillColor: "#FF0",
color: "#F00",
weight: 5,
opacity: 1,
fillOpacity: 0.8
};

//capa vectorial de puntos de interés desde KML
//al principio la declaro como geojson
var estaciones = L.geoJson(null, {
//añade a los elementos de la capa el estilo personalizado
pointToLayer: function (feature, latlng) { 
return L.circleMarker(latlng,estiloCirculosAmarillo);
}
//agrega popups a cada elemento de la capa
,onEachFeature: agregarPopup_estaciones
});

var zonaServ = L.geoJson(null, {
onEachFeature: agregarPopup_zonaServ,
style: estiloLinea
});
//plugin omnivore para importar fichero kml en la variable puntos_kml
omnivore.kml('../data/estaciones_arqueomonitor_4326.kml', null, estaciones).addTo(map);
omnivore.kml('../data/zonaServArqBahiaCadiz_4326.kml', null, zonaServ).addTo(map);



	//Agrupo capas
	var baseLayers = {
	//"Base de OpenStreetMap": osm,
	"MapQuest Base Map": mqo,
	"Satellite Mapbox Base Map": mapboxTiles
	
	};
	
	// Overlay layers are grouped
	var overlays = {
		"Monitoring Stations": {
			"Arqueomonitor Stations": estaciones,
			"Archaeological Easement Area": zonaServ,
			
		},
		"Bathymetries": {
			"Bucentaure": buc_bat,
			"Fougueux": foug_bat,
			
		
		},
		"Modelling Outputs": {
			"Bucentaure Significant Wave Height": buc_REG_Hs2015122217,
			"Bucentaure Water Current": buc_vel_2015122217,
			"Fougueux Significant Wave Height": foug_Hs20091230,
			"Fougueux Water Current": foug_vel_20091230,
			"Fougueux Dispersion Probability": foug_dispersion
			
		},
		
		"Risk Maps in Cadiz Bay Area": {
			"CSR: Critical Diameter of Object Mobility": buc_CSR,
			"CSI: Transport Mode Index": buc_CSI,
			"CRI: Critical Size of Object Mobility Risk Index": buc_CRI
			
		}
		
	};

L.control.groupedLayers(baseLayers, overlays).addTo(map);



//-----------------------------------------------------------------------------------------
//---------------------- Generación de Controles ------------------------------------------
//-----------------------------------------------------------------------------------------

//L.control.layers(baseLayers,overlays).addTo(map);//Control de capas.
//L.control.overview([osm1]).addTo(map);//Control de mapa de referencia.


// Insertando una leyenda en el mapa
var legend_default = L.control({position: 'bottomleft'});
legend_default.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info legend');
div.innerHTML +=
"";//'<img alt="legend" src="../data/bucentaure/modeling/REG_Hsig_2015122217_scale_bar.png" width="150" height="150" />';
return div;
};
legend_default.addTo(map);

var text_default = L.control({position: 'bottomright'});
text_default.onAdd = function (map) {
var divText = L.DomUtil.create('div', 'infoLayer');
divText.innerHTML +=
"";
return divText;
};
text_default.addTo(map);


// Insertando una leyenda Hs 
var legendHs = L.control({position: 'bottomleft'});
legendHs.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info legend');
div.innerHTML +=
'<img alt="legendHs" src="../data/bucentaure/modeling/REG_Hsig_2015122217_legend.png" width="80" height="315" style = "border-radius:5px; opacity: 0.9;" />';
return div;
};
var textHs = L.control({position: 'bottomleft'});
textHs.onAdd = function (map) {
var divTextHs = L.DomUtil.create('div', 'infoLayer');
divTextHs.innerHTML +=
'A storm occurring in December 2009 was simulated. The wave model setup was conducted using a fine model grid (10m resolution) in the shipwreck sites nested to a coarser 50 m resolution grid. Wave open boundary conditions were set as constant on the whole west boundary in the coarse mesh, and taken from wave directional buoy data pertaining to REDCOS network of Spanish agency, Puertos Del Estado. In addition, to ensure a good reproduction of the real hydrodynamics by the model, a calibration and validation procedures were carried out, comparing experimental in situ wave, current and water level data field with the model output.';
return divTextHs;
};
// Insertando una leyenda VEL 
var legendVel = L.control({position: 'bottomleft'});
legendVel.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info legend');
div.innerHTML +=
'<img alt="legend" src="../data/bucentaure/modeling/REG_VEL_2015122217_legend.png" width="100" height="315" style = "border-radius:5px; opacity: 0.9;" />';
return div;
};
var textVel = L.control({position: 'bottomleft'});
textVel.onAdd = function (map) {
var divTextVel = L.DomUtil.create('div', 'infoLayer');
divTextVel.innerHTML +=
'A storm occurring in December 2009 was simulated. The wave model setup was conducted using a fine model grid (10m resolution) in the shipwreck sites nested to a coarser 50 m resolution grid. Wave open boundary conditions were set as constant on the whole west boundary in the coarse mesh, and taken from wave directional buoy data pertaining to REDCOS network of Spanish agency, Puertos Del Estado. In addition, to ensure a good reproduction of the real hydrodynamics by the model, a calibration and validation procedures were carried out, comparing experimental in situ wave, current and water level data field with the model output.';
return divTextVel;
};
// Insertando una leyenda Dispersion Probability 
var legendDispersion = L.control({position: 'bottomleft'});
legendDispersion.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info legend');
div.innerHTML +=
'<img alt="legendDispersion" src="../data/fougueux/modeling/DISPERSION_FOUGUEUX_legend.png" width="100" height="315" style = "border-radius:5px; opacity: 0.9;" />';
return div;
};
var textDisp = L.control({position: 'bottomleft'});
textDisp.onAdd = function (map) {
var divTextDisp = L.DomUtil.create('div', 'infoLayer');
divTextDisp.innerHTML +=
'The likelihood distribution map depicts the most probable areas where Fougueux remains could be scattered during the storm after the Battle of Trafalgar. The dispersion area extends from the original Fougueux site to the north along the coast. The area where Fougueux remains may be found is 4 km long and 1.2 km wide, with its longitudinal axis aligned parallel to the current coastline. According to our calculations, most of the Fougueux remains should be located within the probability contour line of 90 %, bounded by the coastline and the shoaling bedrock that crops out off shore.';
return divTextDisp;
};
// Insertando una leyenda Risk
var legendRisk = L.control({position: 'bottomleft'});
legendRisk.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info legend');
div.innerHTML +=
'<img alt="legendRisk" src="../data/bucentaure/modeling/CRI_legend.png" width="110" height="315" style = "border-radius:5px; opacity: 0.9;" />';
return div;
};
//Insertando cuadros explicativos para Risk CSR
var textCSR = L.control({position: 'bottomleft'});
textCSR.onAdd = function (map) {
var divTextCSR = L.DomUtil.create('div', 'infoLayer');
divTextCSR.innerHTML +=
'Description not available yet...';
return divTextCSR;
};
//Insertando cuadros explicativos para Risk CRI
var textCRI = L.control({position: 'bottomleft'});
textCRI.onAdd = function (map) {
var divTextCRI = L.DomUtil.create('div', 'infoLayer');
divTextCRI.innerHTML +=
'The critical size for object movement criteria has been selected to characterize the risk of scattering and loss of archaeological objects and artefacts promote by drag forces induced by waves. The risk of scattering loss, depend on characteristics of the archaeological object which may differ largely in density and shape according to the archaeological material. For simplicity, spherical shape and quartz density (2600 kg m-3) has been assumed in the present study. While on the other hand, waves are the only one physical agent evaluated with this criterion, specifically peak period and maximum orbital velocity near bottom, which was calculated according to linear theory.';
return divTextCRI;
};
//Insertando cuadros explicativos para Risk CSI
var textCSI = L.control({position: 'bottomleft'});
textCSI.onAdd = function (map) {
var divTextCSI = L.DomUtil.create('div', 'infoLayer');
divTextCSI.innerHTML +=
'Description not available yet...';
return divTextCSI;
};
//legend.addTo(map);
currentLegend = legend_default;
currentText = text_default;
// Add and remove layers
map.on('overlayadd', function (eventLayer) {

    if (eventLayer.name === 'Bucentaure Significant Wave Height') {
        map.removeControl(currentLegend);
		currentLegend = legendHs;
        currentLegend.addTo(map);
		map.removeControl(currentText);
		currentText = textHs;
        currentText.addTo(map);
		
	}
	else if (eventLayer.name === 'Fougueux Significant Wave Height') {
        map.removeControl(currentLegend);
		currentLegend = legendHs;
        currentLegend.addTo(map);
		map.removeControl(currentText);
		currentText = textHs;
        currentText.addTo(map);
	}
	else if (eventLayer.name === 'Bucentaure Water Current') {
        map.removeControl(currentLegend);
		currentLegend = legendVel;
        currentLegend.addTo(map);
		map.removeControl(currentText);
		currentText = textVel;
        currentText.addTo(map);
	}
	else if (eventLayer.name === 'Fougueux Water Current') {
        map.removeControl(currentLegend);
		currentLegend = legendVel;
        currentLegend.addTo(map);
		map.removeControl(currentText);
		currentText = textVel;
        currentText.addTo(map);
	}
	else if (eventLayer.name === 'Fougueux Dispersion Probability') {
        map.removeControl(currentLegend);
		currentLegend = legendDispersion;
        currentLegend.addTo(map);
		map.removeControl(currentText);
		currentText = textDisp;
        currentText.addTo(map)
	}
	else if (eventLayer.name === 'CSR: Critical Diameter of Object Mobility') {
        map.removeControl(currentLegend);
		currentLegend = legendRisk;
        currentLegend.addTo(map);
		map.removeControl(currentText);
		currentText = textCSR;
        currentText.addTo(map)
	}
	else if (eventLayer.name === 'CSI: Transport Mode Index') {
        map.removeControl(currentLegend);
		currentLegend = legendRisk;
        currentLegend.addTo(map);
		map.removeControl(currentText);
		currentText = textCSI;
        currentText.addTo(map);
	}
	else if (eventLayer.name === 'CRI: Critical Size of Object Mobility Risk Index') {
        map.removeControl(currentLegend);
		currentLegend = legendRisk;
        currentLegend.addTo(map);
		map.removeControl(currentText);
		currentText = textCRI;
        currentText.addTo(map);
    
    } else { // Or switch to the treeline legend...
        map.removeControl(currentLegend);
		currentLegend = legend_default;
        currentLegend.addTo(map);
    }
});

map.on('overlayremove', function (eventLayer) {

    if (eventLayer.name === 'Bucentaure Significant Wave Height') {
        map.removeControl(currentLegend);
		currentLegend = legend_default;
        currentLegend.addTo(map);

	}
	else if (eventLayer.name === 'Fougueux Significant Wave Height') {
        map.removeControl(currentLegend);
		currentLegend = legend_default;
        currentLegend.addTo(map);
	}
	else if (eventLayer.name === 'Bucentaure Water Current') {
        map.removeControl(currentLegend);
		currentLegend = legend_default;
        currentLegend.addTo(map);
	}
	else if (eventLayer.name === 'Fougueux Water Current') {
        map.removeControl(currentLegend);
		currentLegend = legend_default;
        currentLegend.addTo(map);
	}
	else if (eventLayer.name === 'Fougueux Dispersion Probability') {
        map.removeControl(currentLegend);
		currentLegend = legend_default;
        currentLegend.addTo(map);
	}
	else if (eventLayer.name === 'CSR: Critical Diameter of Object Mobility') {
        map.removeControl(currentLegend);
		currentLegend = legend_default;
        currentLegend.addTo(map);
	}
	else if (eventLayer.name === 'CSI: Transport Mode Index') {
        map.removeControl(currentLegend);
		currentLegend = legend_default;
        currentLegend.addTo(map);
	}
	else if (eventLayer.name === 'CRI: Critical Size of Object Mobility Risk Index') {
        map.removeControl(currentLegend);
		currentLegend = legend_default;
        currentLegend.addTo(map);


    } else { // Or switch to the treeline legend...
        map.removeControl(currentLegend);
		currentLegend = legend_default;
        currentLegend.addTo(map);


    }
});
//-----------------------------------------------------------------------------------------
//---------------------- Generación de Funciones ------------------------------------------
//-----------------------------------------------------------------------------------------

//Agraga popup con los tres atributos que describen los elementos(name,type,decript) del fichero estacionesArqueomonitor.geoJson
function agregarPopup_estaciones(feature, layer) {
layer.bindPopup(('Type: ' + feature.properties.type + '</br>'  + 'Name: '  + feature.properties.name +  '</br>' + 'Depth: ' + feature.properties.depth +  '</br>' + '<a href= "../html/getData.html">Get Data </a>' + '</br>'+ '<a href=' + feature.properties.description + '>Site Description </a>' ));
}
//Agraga popup con los tres atributos que describen los elementos(name,type,decript) del fichero estacionesArqueomonitor.geoJson
function agregarPopup_zonaServ(feature, layer) {
layer.bindPopup('<b>' + 'Archaeological Easement Area of the Bay of Cadiz' + '</b>' +  '</br>' + 'Resolution of January 17, 2008, of the <a href = "http://www.juntadeandalucia.es/organismos/cultura/consejeria/sgc/dgbcm.html" target = "blank">Directorate of Cultural Property</a>, which initiates the procedure for the archaeological easement areas declaration in the space defined in the continental and inland waters of Andalusia, its territorial sea and the continental shelf, <a href = "http://www.juntadeandalucia.es/boja/2008/63/d16.pdf" target = "blank">BOJA num 63 of April 1, 2008</a>.');
}

