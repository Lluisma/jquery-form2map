# jquery-form2map

## Description
Creates a Leaflet map linked to an existing form: shows existing coordinates and provides the location of addresses using the Nominatim geocode.

## Mandatory requirements
* [jQuery](https://jquery.com/)
* [Leaflet](https://leafletjs.com/)

## Installation
Include script and stylesheet *after* the jQuery library:

```html
<script src="/path/to/jquery-form2map.js"></script>
<link rel="stylesheet" href="/path/to/jquery-form2map.css" />
```

## Usage

Set the **form2map_lat** and **form2map_lon** classes to the input boxes with lat/long coordinates to mark on map.

Set the **form2map_search** class to the input boxes that you want to include in the search of the Nominatim geocoder. The search string will follow the order established by the input boxes.

Set the **form2map_button** class to the element which triggers the geocoder search and shows the results list, if any.

Apply the **form2map()** function to the desired div, setting de required configuration options:

```javascript
$("#map_div_name").form2map( { options } );
```


## Configuration Options

### `mapprovider`
(Required). URL Template for the [TileLayer](https://leafletjs.com/reference-1.3.4.html#tilelayer) used by the Leaflet map.

You can find a lot of examples on [https://leaflet-extras.github.io/leaflet-providers/preview/], the mini maps example page for all the layers available in [Leaflet-providers](https://github.com/leaflet-extras/leaflet-providers).


### [`attribution`](https://leafletjs.com/reference-1.3.4.html#tilelayer-attribution)
String to be shown in the attribution control, describes the layer data, e.g. `"© Mapbox"`.

### [`subdomains`]((https://leafletjs.com/reference-1.3.4.html#tilelayer-subdomains))
(Required). Subdomains of the tile service.

### `mapgheight`
Height of the map. Default value: `'400px'`.

### `mapcenter`
Default map center coordinates if null values for lat/long input boxes. Expects an array of the form `[Number, Number]`. Default value: `[41, 2]`.

### `markerzoom`
Zoom level when a marker is created. Default value: `10`.


## Example

```html

	<!-- FORM -->

    <form>
		<label for="address">Address</label>
		<input type="text" name="address" placeholder="Address" class="form2map_search" />

		<label for="city">City</label>
        <input type="text" name="city" placeholder="City" class="form2map_search" />

		<label for="country">Country</label>
        <input type="text" name="country" placeholder="Country" class="form2map_search" />

        <label for="lat">Latitude</label>
        <input type="text" name="lat" value="" class="form2map_lat" />

        <label for="lon">Longitude</label>
        <input type="text" name="lon" value="" class="form2map_lon" />

        <button class="form2map_button">Search</button>
    </form>

    <div id="map_group"></div>

    <!-- SCRIPTS -->

    <script type="text/javascript">

		$(function() {

		    $("#map_div_name").form2map( {

				mapprovider : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
		        attribution : '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
		        subdomains  : 'abcd',

		        mapheight   : '400px',
		        mapcenter   : [41.66, 2.41],
		        markerzoom  : 10,

		    });

		});

	</script>
```

## License
Released under the [MIT license](https://opensource.org/licenses/MIT).