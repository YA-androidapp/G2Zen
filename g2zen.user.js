// ==UserScript==
// @name     G2Zen
// @version  0.1
// @namespace   https://github.com/YA-androidapp/g2zen
// @include	https://www.google.co.jp/maps*
// ==/UserScript==

var gUriPrefix = 'https://www.google.co.jp/maps'

if (((window.location.href).startsWith(gUriPrefix)) && ((window.location.href).indexOf('/@') > -1)) {
    window.location.href = gmapuri_to_zenuri(window.location.href);
}

var anchor = document.getElementsByTagName('a');
for (var i in anchor) {
    var href = anchor[i].href;
    if ((href.startsWith(gUriPrefix)) && (href.indexOf('/@') > -1)) {
        var listener = {
            uri: gmapuri_to_zenuri(href),
            handleEvent: function handleEvent(event) {
                window.location.href = this.uri;
            }
        };

        anchor[i].addEventListener('click', listener, false);
    }
}

function gmapuri_to_zenuri(uri) {
    var locationparts = get_locationparts(uri);
    var lat = parseFloat(locationparts[0]),
        long = parseFloat(locationparts[1]),
        zoom = parseInt(locationparts[2]);
    var tlat = lat + 0.00010696 * lat - 0.000017467 * long - 0.0046020,
        tlong = long + 0.000046047 * lat + 0.000083049 * long - 0.010041;
    var zlat = tlat * 3600 * 1000,
        zlong = tlong * 3600 * 1000;

    return zenuri = 'https://www.its-mo.com/map/top_z/'+zlat+'_'+zlong+'_'+zoom+'//';
}

function get_locationparts(href) {
    var uripart1 = (href).split('/@')[1]
    var uripart2 = (uripart1.indexOf('/')) ? (uripart1.split('/')[0]) : (uripart1);
    var locationparts = uripart2.split(',');
    if (locationparts.length == 3) {
        return locationparts;
    } else {
        return [];
    }
}