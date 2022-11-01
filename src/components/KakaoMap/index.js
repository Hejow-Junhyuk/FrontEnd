import React, { useEffect, useState  } from 'react'

const { kakao } = window;

const KakaoMap = ({keyword, shopData, setShopData, shopHasPage, setShopHasPage, currentPage, setCurrentPage, shopPrevNextPage, setShopPrevNextPage}) => {
    const [myLocation, setMyLocation] = useState({
        latitude: null, 
        longitude: null,
    });
    
    useEffect(() => {
        // 지도 생성
        const mapCotainer = document.getElementById("map"),
            mapOption = {
                center: new kakao.maps.LatLng(37.5726, 126.98),
                level: 6,
        };
        const map = new kakao.maps.Map(mapCotainer, mapOption);


        // 마커 클릭시 장소명을 표출할 인포윈도우
        const infowindow = new kakao.maps.InfoWindow({zIndex: 1});

        // 장소 검색 객체 생성
        const ps = new kakao.maps.services.Places();

        // 현재위치 좌표 찾기
        // 위치추적에 성공했을때 위치 값
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                setMyLocation({
                    latitude: position.coords.latitude, 
                    longitude: position.coords.longitude,
                });
                const locPosition = new kakao.maps.LatLng(myLocation.latitude, myLocation.longitude);
                displayMyMarker(locPosition);
            });



        }else{
            // 위치 추적에 실패 했을때 초기값
            const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
            displayMyMarker(locPosition)
        }
                
        const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다    
            imageSize = new kakao.maps.Size(30, 38), // 마커이미지의 크기입니다
            imageOption = { offset: new kakao.maps.Point(27, 69) };
    
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)       
        
        // 현재 나의 위치 마커 표시
        function displayMyMarker(position){
            const marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(myLocation.latitude, myLocation.longitude),
                map: map,
                image: markerImage,
            })

            map.setCenter(position);
        }        

        // 키워드로 장소 검색
        ps.keywordSearch(keyword, placesSearchCB, {
            radius : 5000, // 반경
            location: new kakao.maps.LatLng(myLocation.latitude, myLocation.longitude),
            size: 4, // 한페이지에 몇개를 보여줄지
        });
        
        function placesSearchCB(data, status, pagination){
            if(status === kakao.maps.services.Status.OK){
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정
                const bounds = new kakao.maps.LatLngBounds();
                for(let i=0; i < data.length; i++){
                    displayMarker(data[i]);
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }
                
                setShopData({
                    data: data,
                    dataCount: pagination.totalCount,
                })

                // if(currentPage < shopPrevNextPage.pagelength === true){
                //     pagination.gotoPage(currentPage+1);
                //     setCurrentPage(currentPage);
                //     setShopPrevNextPage({next: false, prev: false})
                // }    

                if(shopHasPage === true){
                    pagination.gotoPage(currentPage)
                    setCurrentPage(currentPage)
                }
                console.log(shopHasPage)
                console.log(currentPage)
            }else{
                alert("주변에 상점이 없습니다.")
            }
        }

        function displayMarker(place){
            const marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x)
            })

            kakao.maps.event.addListener(marker, 'click', function(){
                infowindow.setContent('<div style="padding:5px; font-size:12px;">' + place.place_name + '</div>')
                infowindow.open(map, marker);
            })
        }

}, [myLocation.latitude, myLocation.longitude, keyword, currentPage, setShopData, shopHasPage, setCurrentPage]);
    return(
        <div id="map"></div>
    )
}

export default KakaoMap;