// JavaScript Document

//-----------------------------------------------------------------------------------------
//---------------------- Overview Map -----------------------------------------------------
//-----------------------------------------------------------------------------------------
//Parámetro options
var overviewoptions = {
//Definimos la clase para asignar un estilo concreto al objeto
className: 'ol-overviewmap ol-custom-overviewmap',
//Capas que se mostrarán en el OverviewMap
//Mantenemos la misma capa del mapa aunque podría ser distinta
layers: [
new ol.layer.Tile({
source: new ol.source.OSM({
'url': 'http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'
})
})
],


//Oculto por defecto
collapsed: false,
//ToolTip
tipLabel: 'Mapa de referencia'
}


//-----------------------------------------------------------------------------------------
//---------------------- Generación de Popups ----------------------------------------------
//-----------------------------------------------------------------------------------------
var popup = new ol.Overlay({
//indicamos cual es el elemento contenedor
element: document.getElementById('popup')
});

//Definimos la interacción
var selectInteraction = new ol.interaction.Select({
condition: ol.events.condition.onclick
//layers: function (layer) {
//return layer.get('id') == '1';

});
selectInteraction.on('select', function(browserevent) {
var coordinate = browserevent.mapBrowserEvent.coordinate
feature = browserevent.target.getFeatures().getArray()[0];
//Si se ha seleccionado una entidad
if (feature){
var content = document.getElementById('popup');
var info = feature.get('nombre');
}
//Insertamos las coordenadas en el objeto popup
popup.setPosition(coordinate);
content.innerHTML = info;

});


//-----------------------------------------------------------------------------------------
//---------------------- Generación de capas ----------------------------------------------
//-----------------------------------------------------------------------------------------

//Genero variable micapa donde almaceno mapa OSM
var micapa = new ol.layer.Tile({
source: new ol.source.OSM()
});

var estaciones = new ol.layer.Vector({
source: new ol.source.Vector({
url: '../data/estaciones_arqueomonitor.kml',
format: new ol.format.KML()
})
});

//Capa geoJson
estaciones = new ol.layer.Vector({
source: new ol.source.Vector({
url: '../data/estaciones_arqueomonitor.geojson',
format: new ol.format.GeoJSON()
}),
symbolizer: {pointRadius: 20, fillColor: "red",
               fillOpacity: 0.7, strokeColor: "black"}
});


var extent = [-704440.7831310942,4374558.658752542,-703238.4978597317,4375789.490222763];
//var extent = [-6.3280992224378645,36.535506397332355,-6.31729892184508,36.54439008748452];

/*var projection = new ol.proj.Projection({
code: 'EPSG:4326',
units: 'degrees',
extent: extent
});*/

buc_bath = new ol.layer.Image({
//El origen de la capa es una instancia de ol.source.ImageStatic
//definida con sus opciones: attributions, url, projection e imageExtent.
source: new ol.source.ImageStatic({

//indicamos la url donde se encuentra la imagen
url: '../data/bucentaure/bathimetry/buc_grid05cm.jpg',
//Utilizamos la proyección definida en la variable projection
//Utilizaremos la misma proyección al definir la vista del mapa
//projection: projection,
//Aplicamos la extension de la variable extent

imageExtent: extent
})
});




//-----------------------------------------------------------------------------------------
//---------------------- Generación de MAPA ----------------------------------------------
//-----------------------------------------------------------------------------------------
//Definimos la variable map que alojará nuestro mapa
var center = ol.proj.transform([-6.2684345022, 36.5008762379097], 'EPSG:4326','EPSG:3857');
var map = new ol.Map({

view: new ol.View({
//center: ol.proj.transform([-6.2684345022, 36.5008762379097], 'EPSG:4326','EPSG:3857'),
center: center,

zoom: 11
})
,
layers: [micapa,buc_bath,estaciones],
/*new ol.layer.Tile({
source: new ol.source.OSM()
})
],*/
//Agregamos nuestro control OverviewMap Extendiendo los controles por defecto
//controls: ol.control.defaults().extend([
//new ol.control.OverviewMap(overviewoptions)
//]),

target: 'map',
//Agregamos nuestro control OverviewMap Extendiendo los controles por defecto
controls: ol.control.defaults().extend([
new ol.control.OverviewMap(overviewoptions),
new ol.control.FullScreen(),
new ol.control.ScaleLine(),
new ol.control.MousePosition({projection:'EPSG:4326'})
]),
interactions: ol.interaction.defaults().extend([selectInteraction]),
overlays: [popup]
});
