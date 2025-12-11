import { Link } from "react-router-dom";
import "./MainPage.css";
import lostIcon from "../images/lost.png";
import foundIcon from "../images/found.png";
import ArrowIcon from '../images/arrow-black.svg';
import React, { useState, useEffect } from "react";
import searchIcon from "../images/search-icon.png";
import searchBtn from "../images/search-btn.png";
import api from "../api/api"

function MainPage() {
    const [selectedCategory, setSelectedCategory] = useState("분실");
    const [selectedTags, setSelectedTags] = useState([]);
    const [tags, setTags] = useState([]); // DB에서 가져온 카테고리
    const [recentPosts, setRecentPosts] = useState([]);

    useEffect(() => {
        fetchRecentPosts("분실"); // 최신 n개 불러오기
    }, []);



    const [popularPosts, setPopularPosts] = useState([]);

    const handleCategoryChange = (categoryType) => {
        setSelectedCategory(categoryType);
        fetchRecentPosts(categoryType);
    };

    const toggleTag = (tag) => {
        setSelectedTags(prev => {
            if (prev.includes(tag)) return prev.filter(t => t !== tag);
            return [...prev, tag];
        });
    };

    // DB에서 카테고리 목록 가져오기
    useEffect(() => {
        api.get("/categories/")
            .then(res => setTags(res.data))
            .catch(err => console.log("카테고리 불러오기 실패", err));
    }, []);

    // 최신 게시물 불러오기
    const fetchRecentPosts = async (type) => {
        try {
            const params = {
                type,   // "분실" 또는 "습득"
                page: 0,
                size: 4
            };
            const res = await api.get("/posts/list", { params, withCredentials: true });
            const posts = Array.isArray(res.data) ? res.data : res.data.posts || [];
            setRecentPosts(posts)
            console.log(recentPosts)
        } catch (err) {
            console.log("게시물 불러오기 실패", err);
            setRecentPosts([]);
        }
    };

    // 좋아요 상위 게시물 불러오기
    const fetchPopularPosts = async () => {
        try {
            const res = await api.get("/posts/popular", { withCredentials: true });
            setPopularPosts(res.data); // 상위 4개
        } catch (err) {
            console.log("인기 게시물 불러오기 실패", err);
        }
    };

    console.log("인기게시물",popularPosts)

    // 초기 데이터
    useEffect(() => {
        fetchRecentPosts("");
        fetchPopularPosts();
    }, []);

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
                        key={tag.id}
                        type="button"
                        className={`hashtag-btn ${selectedTags.includes(tag.name) ? "active" : ""}`}
                        onClick={() => toggleTag(tag.name)}
                        aria-pressed={selectedTags.includes(tag.name)}
                    >
                        #{tag.name}
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

                <div className="tab-buttons">
                    <button
                        className={selectedCategory === "분실" ? "active" : ""}
                        onClick={() => handleCategoryChange("분실")}
                    >
                        분실물
                    </button>
                    <button
                        className={selectedCategory === "습득" ? "active" : ""}
                        onClick={() => handleCategoryChange("습득")}
                    >
                        습득물
                    </button>
                </div>

                <div className="card-container">
                    {recentPosts.map((post) => (

                        <Link to={`/post/${post.id}`} className="card-link" key={post.id}>
                            <div className="card">
                                <div className="card-thumb">
                                    <img src={post.image || lostIcon} alt={post.title} />
                                </div>
                                <div className="card-body">
                                    <h4 className="card-title">{post.title}</h4>
                                    <p className="card-meta">{post.category?.name} · {post.place?.name}</p>
                                    <p className="card-date">잃어버린 날짜 {post.date}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 인기 게시물 */}
            <section className="popular-section">
                <h3 className="section-title">지금 많이 응원받는 글</h3>
                <div className="card-container">
                    {popularPosts.map((post) => (
                        <Link to={`/post/${post.id}`} className="card-link" key={`popular-${post.id}`}>
                            <div className="card">
                                <div className="card-thumb">
                                    <img src={post.imageUrl || lostIcon} alt={post.title} />
                                </div>
                                <div className="card-body">
                                    <p className="card-hearts">❤️ {post.likeCount}</p>
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
