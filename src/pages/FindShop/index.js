import React, { useState } from "react";
// import { Shop } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./FindShop.scss";
import KakaoMap from "../../components/KakaoMap";
import Modal from "../../components/Modal";
import ShopPagination from "../../components/ShopPagination";

const FindShop = () => {
    const [filterOption, /* setFilterOption*/] = useState("rank");
    const alchohols = ["와인", "위스키", "칵테일"];
    const cities = ["서울", "부산", "인천", "수원", "대전", "대구", "광주", "제주"];
    const citiesCoordinateArr = [
        {latitude: 37.55323, longitude: 126.97271}, {latitude: 35.11557, longitude: 129.04292}, {latitude: 37.45539, longitude: 126.70508},
        {latitude: 37.26547, longitude: 126.99946}, {latitude: 36.33161, longitude:127.43470}, {latitude: 35.87594, longitude: 128.59690},
        {latitude: 35.16567, longitude: 126.91042}, {latitude: 33.49939, longitude: 126.53074}];
    
    const [modal, setModal] = useState(false);
    const [keyword, setKeyword] = useState("와인");
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [shopData, setShopData] = useState({
        data: [],
        dataCount: 0
    });
    const [shopHasPage, setShopHasPage] = useState(false);
    const [myLocation, setMyLocation] = useState({
        latitude: null, 
        longitude: null,
    });


    return(
        <div className="findshop-area">            
            {modal && <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    width: "100%",
                    height: "100vh",
                    backgroundColor: "rgb(255, 255, 255, 0.7)"
            }}/>}
            <div className="findshop-map-area">
                <div className="findshop-map">
                    <KakaoMap keyword={keyword} 
                    shopHasPage={shopHasPage}
                    setShopHasPage={setShopHasPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    shopData={shopData}
                    setShopData={setShopData}
                    myLocation={myLocation}
                    setMyLocation={setMyLocation}
                    />
                </div>

                <div className="findshop-filter-row">
                    <p className="findshop-filter-title"><FontAwesomeIcon icon={faAngleDown}/>주종</p>
                    <div className="findshop-filter-tags">
                        {alchohols.map(a => 
                            <ul key={a.toString()} className="findshop-filter-tag pointer" onClick={()=>{setKeyword(a + "바")}}>{a}</ul>
                        )}
                    </div>
                </div>
                <div className="findshop-filter-row">
                    <p className="findshop-filter-title"><FontAwesomeIcon icon={faAngleDown}/>지역</p>
                    <div className="findshop-filter-tags">
                        {cities.map((c,index) => 
                            <ul key={c.toString()} className="findshop-filter-tag pointer" onClick={()=>{
                                setMyLocation(citiesCoordinateArr[index])
                            setCurrentPage(1)}}>{c}</ul>
                        )}
                    </div>
                </div>
            </div>
            <div className="findshop-detail-area">
                {modal && <Modal setModal={setModal}/>}
                <div className="findshop-search-area">
                    <div className="findshop-search-option">
                        <select name="search" id="search">
                            <option value="city">지역</option>
                        </select>
                    </div>
                    <div className="findshop-search-input">
                        <FontAwesomeIcon className="findshop-icon" icon={faMagnifyingGlass}/>
                        <input className="findshop-input-box"
                            type="text"
                            placeholder="검색"
                            />
                    </div>
                </div> 
                <div className="findshop-shop-filter">
                    <span className={filterOption === "rank" ? "pointer font-selected" : "pointer"}>추천순</span>
                    <span> | </span>
                    <span className={filterOption === "distance" ? "pointer font-selected" : "pointer"}>거리순</span>
                </div>
                <div className="findshop-shop-area">
                    {shopData && shopData.data.map((item) => (        
                    <div className='shop-container pointer' key={item.id} onClick={()=>setModal(true)}>
                        <div className='shop-img-area'>
                            {item.img}
                        </div>
                        <div className='shop-detail-area'>
                            <div className='shop-title-area'>
                                <p className='shop-name'>{item.place_name}</p>
                                <p className='shop-city'>{item.road_address_name.substr(0, 6)}</p>
                            </div>
                            <p className='shop-description'>{item.description}</p>
                            <div className='shop-review-area'>
                                <p className='shop-review'>☆☆☆☆☆ {item.reviews}</p>
                                <span className='shop-review-count'>00개</span>
                            </div>
                            <div className='shop-tag-area'>
                                {/* {item.tags.map(tag => (
                                    <span key={tag.toString()} className="shop-tag">{tag}</span>
                                ))} */}
                            </div>
                        </div>
                    </div>))}
                </div>
            <ShopPagination shopData={shopData}
                    shopHasPage={shopHasPage}
                    setShopHasPage={setShopHasPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}/>
            </div>
        </div>
    )
};

export default FindShop;