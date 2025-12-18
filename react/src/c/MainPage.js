import { Link } from "react-router-dom";
import "./MainPage.css";
import lostIcon from "../images/lost.png";
import foundIcon from "../images/found.png";
import ArrowIcon from '../images/arrow-black.svg'; 
import React, { useState } from "react";

function MainPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="mainpage-container">
      <h2 className="main-title">물건을 찾고 계신가요?</h2>

    
      <div className="main-buttons">
        <Link to="/lost" className="big-btn">
          <div class="flex">
            <h3>분실했어요!</h3>
            <p>최근 분실물 게시판으로 이동합니다.</p>
          </div>
          <div class="arrow-container">
            <img src={ArrowIcon} alt="화살표" class="arrow-icon" />
          </div>
        </Link>
        <Link to="/lost" className="big-btn">
          <div class="flex">
          <h3>습득했어요!</h3>
          <p>최근 습득물 게시판으로 이동합니다.</p>
          </div>
          <div class="arrow-container">
            <img src={ArrowIcon} alt="화살표" class="arrow-icon" />
          </div>
        </Link>
         <Link to="/lost" className="big-btn">
          <div class="flex">
          <h3>전체 글 보기</h3>
          <p>게시판 전체 글로 이동합니다.</p>
          </div>
          <div class="arrow-container">
            <img src={ArrowIcon} alt="화살표" class="arrow-icon" />
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
          {[1, 2, 3, 4].map((i) => (
            <div className="card" key={i}>
              <img src={lostIcon} alt={`분실물${i}`} />
              <h4>분실물 제목 예시 {i}</h4>
              <p className="date">등록일: 2025.11.06</p>
            </div>
          ))}
        </div>
      </section>

      {/* 지금 많이 응원받는 글 */}
      <section className="popular-section">
        <h3 className="section-title">지금 많이 응원받는 글</h3>
        <div className="card-container">
          {[1, 2, 3, 4].map((i) => (
            <div className="card" key={i}>
              <img src={lostIcon} alt={`응원글${i}`} />
              <h4>응원받은 게시글 {i}</h4>
              <p className="card-like">❤️ {Math.floor(Math.random() * 200)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MainPage;