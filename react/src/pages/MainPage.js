import { Link } from "react-router-dom";
import "./MainPage.css";
import lostIcon from "../images/lost.png";
import foundIcon from "../images/found.png";
import ArrowIcon from '../images/arrow-black.svg'; 
import React, { useState } from "react";
import searchIcon from "../images/search-icon.png";
import searchBtn from "../images/search-btn.png";
function MainPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const [selectedTags, setSelectedTags] = useState([]);
    const tags = ["전자기기","악세사리","지갑","의류/잡화","필기구","텀블러","도서"];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };


  const toggleTag = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) return prev.filter(t => t !== tag);
      return [...prev, tag];
    });
  };

  // 예시 카드 데이터 (실 데이터 있을 경우 API/props로 교체)
  const recentPosts = [
    {
      id: 1,
      title: "샤넬 지갑 분실했습니다. 3호관 근처에 두고온 것 같아요.",
      category: "지갑",
      place: "3호관",
      date: "2025.11.06",
      img: lostIcon,
      content: "지갑을 분실했습니다. 3호관 근처에 두고온 것 같아요.",
    },
    {
      id: 2,
      title: "에어팟 분실 — 검정 케이스 포함",
      category: "에어팟",
      place: "1호관",
      date: "2025.10.28",
      img: foundIcon,
      content: "에어팟을 분실했습니다. 검정 케이스 포함입니다.",
    },
    {
      id: 3,
      title: "흰색 이어폰 분실했습니다.",
      category: "이어폰",
      place: "카페",
      date: "2025.10.10",
      img: foundIcon,
      content: "흰색 이어폰을 분실했습니다.",
    },
    {
      id: 4,
      title: "노트북 가방 잃어버렸어요",
      category: "전자기기",
      place: "도서관",
      date: "2025.09.12",
      img: foundIcon,
      content: "노트북 가방을 잃어버렸어요",
    },
  ];

  return (
    <div className="mainpage-container">
      <h2 className="main-title">물건을 찾고 계신가요?</h2>

        <div className="main-search-box"> 
          <img src={searchIcon} className="main-search-icon"/>
          <input type="text" placeholder="모든 분실물을 빠르게 찾아보세요!" className="search" />
          <button className="main-search-btn">
            <img src={searchBtn} alt="검색"/>
          </button>
        </div>
    {/* 해시태그 버튼 영역 */}
      <div className="hashtag-container">
        {tags.map((tag) => (
         <button
            key={tag}
            type="button"
            className={`hashtag-btn ${selectedTags.includes(tag) ? "active" : ""}`}
            onClick={() => toggleTag(tag)}
            aria-pressed={selectedTags.includes(tag)}
         >
            #{tag}
         </button>
        ))}
      </div>

      <div className="main-buttons">
        <Link to="/lost" className="big-btn">
          <div className="flex">
          <h3>분실했어요!</h3>
          <p>최근 분실물 게시판으로 이동합니다.</p>
          </div>
          <div className="arrow-container">
            <img src={ArrowIcon} alt="화살표" className="arrow-icon" />
          </div>
        </Link>
        <Link to="/found" className="big-btn">
          <div className="flex">
          <h3>습득했어요!</h3>
          <p>최근 습득물 게시판으로 이동합니다.</p>
          </div>
          <div className="arrow-container">
            <img src={ArrowIcon} alt="화살표" className="arrow-icon" />
          </div>
        </Link>
         <Link to="/board" className="big-btn">
          <div className="flex">
          <h3>전체 글 보기</h3>
          <p>게시판 전체 글로 이동합니다.</p>
          </div>
          <div className="arrow-container">
            <img src={ArrowIcon} alt="화살표" className="arrow-icon" />
          </div>
          
        </Link>
      </div>
       {/* 최근 등록된 게시물 */}
      <section className="recent-section">
        <h3 className="section-title">최근 등록된 게시물</h3>
        {/* 습득물/분실물 선택 버튼 */}
        <div className="tab-buttons">
          <button
            className={selectedCategory === "lost" ? "active" : ""}
            onClick={() => handleCategoryChange("lost")}
          >
            분실물
          </button>
          <button
            className={selectedCategory === "found" ? "active" : ""}
            onClick={() => handleCategoryChange("found")}
          >
            습득물
          </button>
        </div>

        <div className="card-container">
          {recentPosts.map((post) => (
            <Link to={`/post/${post.id}`} className="card-link" key={post.id}>
              <div className="card">
                <div className="card-thumb">
                  <img src={post.img} alt={post.title} />
                </div>
                <div className="card-body">
                  <h4 className="card-title">{post.title}</h4>
                  <p className="card-meta">{post.category} · {post.place}</p>
                  <p className="card-date">잃어버린 날짜 {post.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 지금 많이 응원받는 글 */}
      <section className="popular-section">
        <h3 className="section-title">지금 많이 응원받는 글</h3>
        <div className="card-container">
          {recentPosts.map((post) => (
            <Link to={`/post/${post.id}`} className="card-link" key={`popular-${post.id}`}>
              <div className="card">
                <div className="card-thumb">
                  <img src={post.img} alt={post.title} />
                </div>
                <div className="card-body">
                  <p className="card-hearts">❤️ {Math.floor(Math.random() * 200)}</p>
                  <h4 className="card-title">{post.title}</h4>
                  <p className="card-meta">{post.content}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MainPage;