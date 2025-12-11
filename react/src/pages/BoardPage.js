import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BoardPage.css";
import { Link } from "react-router-dom";
import searchIcon from "../images/search-icon-black.png";
import api from "../api/api";

function BoardPage() {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // 필터 state
    const [type, setType] = useState("");  // 전체 / 분실 / 습득
    const [category, setCategory] = useState("");
    const [place, setPlace] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // 페이징
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const navigate = useNavigate();
    const size = 15;

    // 페이지/필터가 바뀌면 자동으로 호출됨
    useEffect(() => {
        fetchPosts();
    }, [currentPage, type, category, place, startDate, endDate]);

    // 필터가 바뀌면 무조건 page=0으로 이동
    useEffect(() => {
        setCurrentPage(0);
    }, [type, category, place, startDate, endDate]);

    const fetchPosts = async (term = "") => {
        try {
            const params = {
                page: currentPage,
                size,
                ...(type && { type }),        // 전체=빈 값이면 필터 제외
                ...(category && { category }),
                ...(place && { place }),
                ...(startDate && { startDate }),
                ...(endDate && { endDate }),
                ...(term && { searchTerm: term }),
            };

            const res = await api.get("/posts/list", { params, withCredentials: true });

            if (res.data.success) {
                setPosts(res.data.posts);
                setCurrentPage(res.data.currentPage);
                setTotalPages(res.data.totalPages);
            }
        } catch (err) {
            console.error("게시물 불러오기 실패", err);
        }
    };

    return (
        <div className="board-container">
            <div className="board-header">
                <h2>전체 보기</h2>

                <div className="filters">
                    {/* 날짜 */}
                    <input
                        type="date"
                        className="filter-input"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    ~
                    <input
                        type="date"
                        className="filter-input"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />

                    {/* 분류 */}
                    <select
                        className="filter-select"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">전체 분류</option>
                        <option value="분실">분실</option>
                        <option value="습득">습득</option>
                    </select>

                    {/* 카테고리 */}
                    <select
                        className="filter-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">카테고리</option>
                        <option value="1">지갑</option>
                        <option value="2">핸드폰</option>
                        <option value="3">노트북</option>
                        <option value="4">에어팟</option>
                        <option value="5">열쇠</option>
                        <option value="6">기타</option>
                    </select>

                    {/* 장소 */}
                    <select
                        className="filter-select"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                    >
                        <option value="">장소</option>
                        <option value="1">1호관</option>
                        <option value="2">2호관</option>
                        <option value="3">3호관</option>
                        <option value="4">4호관</option>
                        <option value="5">5호관</option>
                        <option value="6">6호관</option>
                        <option value="7">7호관</option>
                        <option value="8">8호관</option>
                    </select>

                    {/* 검색 */}
                    <div className="board-search-box">
                        <input
                            type="text"
                            placeholder="제목을 검색하세요"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            onClick={() => {
                                setCurrentPage(0);
                                fetchPosts(searchTerm);
                            }}
                        >
                            <img src={searchIcon} alt="검색" />
                        </button>
                    </div>

                    <Link to="/writepage" className="write-btn">글쓰기</Link>
                </div>
            </div>

            {/* 목록 */}
            <table className="board-table">
                <thead>
                <tr>
                    <th>NO</th>
                    <th>작성일</th>
                    <th>분류</th>
                    <th>제목</th>
                    <th>장소</th>
                    <th>카테고리</th>
                    <th>작성자명</th>
                </tr>
                </thead>

                <tbody>
                {posts.map((post) => (
                    <tr key={post.id} onClick={() => navigate(`/post/${post.id}`)}>
                        <td>{post.id}</td>
                        <td>{post.date}</td>
                        <td>{post.type}</td>
                        <td className="title">{post.title}</td>
                        <td>{post.place}</td>
                        <td>{post.category}</td>
                        <td>{post.writer}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* 페이지네이션 */}
            <div className="pagination">
                <button onClick={() => setCurrentPage(0)} disabled={currentPage === 0}>
                    {"<<"}
                </button>
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>
                    {"<"}
                </button>

                <span>{currentPage + 1} / {totalPages}</span>

                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                >
                    {">"}
                </button>
                <button
                    onClick={() => setCurrentPage(totalPages - 1)}
                    disabled={currentPage >= totalPages - 1}
                >
                    {">>"}
                </button>
            </div>
        </div>
    );
}

export default BoardPage;
