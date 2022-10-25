import React, { useEffect, useState  } from 'react'

const { kakao } = window;
const KakaoMap = () => {
    const [myLocation, setMyLocation] = useState({
        latitude: 33.450701, 
        longitude: 126.570667,
    });

    useEffect(() => {
        // 지도 생성
        const mapCotainer = document.getElementById("map"),
            mapOption = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 5,
        };
        // const infowindow = new kakao.maps.infowindow({zIndex: 1});

        const map = new kakao.maps.Map(mapCotainer, mapOption);

        // 현재위치 좌표 찾기
        // 위치추적에 성공했을때 위치 값
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function(position){
                setMyLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });

                const locPosition = new kakao.maps.LatLng(myLocation.latitude, myLocation.longitude)
                displayMyMarker(locPosition);
            });
        }else{
            // 위치 추적에 실패 했을때 초기값
            const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
            displayMyMarker(locPosition)
        }
                
        const imageSrc = 'map-marker-1_icon-icons.com_56710.png', // 마커이미지의 주소입니다    
            imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
            imageOption = { offset: new kakao.maps.Point(27, 69) };
    
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)       
        
        // 현재 위치 마커 표시
        function displayMyMarker(position){
            const marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(myLocation.latitude, myLocation.longitude),
                map: map
            })

            map.setCenter(position);
        } 
}, [myLocation.latitude, myLocation.longitude]);

    return(
        <div id="map"></div>
    )
}

export default KakaoMap;