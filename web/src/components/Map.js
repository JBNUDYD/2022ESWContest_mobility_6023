/*global kakao*/
import React, { useEffect } from 'react'

const Map=({ Lat, Lon, style })=>{

  useEffect(()=>{
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(Lat, Lon),
      level: 3
    };

    var map = new kakao.maps.Map(container, options);
    var markerPosition  = new kakao.maps.LatLng(Lat, Lon); 
    var marker = new kakao.maps.Marker({
      position: markerPosition
    });
  marker.setMap(map);
  map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);  
  },[Lat, Lon])

    return (
      <div>
        <div id="map" style={style}></div>
      </div>
    )
}

export default Map;