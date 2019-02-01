/*!
 * jQuery Form2Map v1.0.0
 * https://github.com/lluisma/jquery-form2map
 *
 * @author Lluís Martí i Garro: http://github.com/Lluisma
 * @license MIT
 *
 * Date: 2019-01-01
 */


(function ( $ ) {


    // * CONFIGURATION VARIABLES :: Edit to translate the plugin messages

    msg_close     = 'Close';
    msg_noresults = 'No results found';

    // * * * DON'T EDIT BELOW THIS LINE ----------------------------------- */



    // * Private variables

    var url_geocoder = 'http://nominatim.openstreetmap.org/search?format=json&limit=5&q=';
    var map;
    var marker;


    $.fn.form2map = function( options ) {

        // * Private functions

        /**
         * Updates coordinates on form & map fields
         */

        function update_latlon( lat, lon ) {

            $("#form2map_lat").val( lat );
            $("#form2map_lon").val( lon );

            $(".form2map_lat").val( lat );
            $(".form2map_lon").val( lon );

        }

        /**
         * Adds a draggable marker on selected coordinates
         */

        function add_marker(lat, lon) {

            map.panTo(new L.LatLng(lat, lon));

            update_latlon( lat, lon );

            if (marker) {
                map.removeLayer(marker);
            }

            marker = L.marker([lat, lon], { draggable: true} ).addTo(map);
 
            marker.on('dragend', function(e) {

                var curPos = marker.getLatLng();

                update_latlon( curPos.lat, curPos.lng );

            });

        }

        /**
         * Searches on nominatim geocoder
         */

        function form2map_search() {

            var adress = "";

            $(".form2map_search").each( function( index, value ) {
                adress += $(this).val() + " ";
            });

            $.getJSON( url_geocoder + adress, function(data) {

                var lst = "";
                var cnt = 0;

                $.each(data, function(key, val) {

                    lst += "<li data-lat=\"" + val.lat + "\" data-lon=\"" + val.lon + "\" class=\"form2map_address\">" + val.display_name + "</li>";
                    cnt++;

                });

                if (cnt==0) {
                    lst = "<li>" + msg_noresults + "</li>";
                }

                $('#form2map_results').html( "<ul>" + lst + "</ul><span id=\"form2map_close\">" + msg_close + "</span>" );

                if (cnt>0) {
                    $("#form2map_results li").click( function() { 
                        add_marker( $(this).data("lat"), $(this).data("lon") ); 
                    });
                }

                $("#form2map_close").click( function() {
                    $('#form2map_results').html( '' );
                });    

            });
        }

        // * Checks required values

        mapheight  = (options.mapheight) ? options.mapheight : '400px';
        mapcenter  = (options.mapcenter) ? options.mapcenter : [41, 2];
        markerzoom = (options.markerzoom) ? options.markerzoom : 7;

        if (!options.mapprovider) {

            this.append( 'No map provider. Check the plugin settings.' );

        } else if (!options.subdomains) {

            this.append( 'No subdomains. Check the plugin settings.' );

        } else {

            // * Creates map elements

            res = document.createElement('div');
            res.setAttribute("id", "form2map_results");

            map = document.createElement('div');
            map.setAttribute("id", "form2map_map");
            map.setAttribute("style","height:" + mapheight);

            lat = document.createElement('input');
            lat.setAttribute("id", "form2map_lat");
            lat.setAttribute("type", "text");
            lat.setAttribute("readonly", "readonly");
            lat.setAttribute("value", $(".form2map_lat").val()) ;

            lon = document.createElement('input');
            lon.setAttribute("id", "form2map_lon");
            lon.setAttribute("type", "text");
            lon.setAttribute("readonly", "readonly");
            lon.setAttribute("value", $(".form2map_lon").val()) ;


            this.append( res, map, lat, lon);

            // * Sets action on form button

            $(".form2map_button").click( function() {
                form2map_search();
            });

            // * Loads map

            map = L.map('form2map_map').setView( mapcenter, markerzoom );

            var layer = L.tileLayer( options.mapprovider, 
                                     { attribution: options.attribution, subdomains: options.subdomains }
                                   );

            layer.addTo(map);

            // * Shows marker for existing coordinates

            if ($("#form2map_lat").val() && $("#form2map_lon").val()) {
                add_marker( $("#form2map_lat").val(),  $("#form2map_lon").val() );
            }

        }

        return this;                    // Makes the plugin method chainable

    };
 
}( jQuery ));
