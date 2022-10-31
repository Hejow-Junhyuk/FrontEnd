import React, {useEffect, useState} from "react";
// import { Shop } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./FindShop.scss";
// import { db } from '../../firebase';
// import { getDoc, updateDoc, doc, setDoc, serverTimestamp, arrayUnion } from "firebase/firestore";
import KakaoMap from "../../components/KakaoMap";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";

const ShopPagination = ({shopData}) => {
    const [currentItems, setCurrentItems] = useState([]);

    console.log(shopData.data)
    console.log(shopData.dataCount)
    return(
            <Pagination items={shopData.data}
            currentItems={currentItems}
            setCurrentItems={setCurrentItems}
            itemsPerPage={4}/>
    )
}

const FindShop = () => {
    const [filterOption, setFilterOption] = useState("rank");
    const alchohols = ["와인", "위스키", "칵테일"];
    const cities = ["서울", "부산", "인천", "수원", "대전", "대구", "광주"];
    const [modal, setModal] = useState(false);
    const [keyword, setKeyword] = useState("와인바");
    const [shopData, setShopData] = useState({
        data: [],
        dataCount: 0
    });
    

    const tmp = {
        img: "이미지",
        name: "가게이름",
        description: "가게 특징/한줄평",
        city: "지역",
        reviews: 5.0,
        tags: ["와인", "칵테일", "위스키"]
    }

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
                    setShopData={setShopData}
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
                        {cities.map(c => 
                            <ul key={c.toString()} className="findshop-filter-tag pointer">{c}</ul>
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
                <ShopPagination shopData={shopData}/>
            </div>
        </div>
    )
};

export default FindShop;