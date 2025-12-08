import React, {useEffect, useState} from "react";
import "./BoardPage.css";
import { useNavigate } from "react-router-dom";
import searchIcon from "../images/search-icon-black.png";
import { Link } from "react-router-dom";
import api from "../api/api";

function LostPage() {
    const [posts, setPosts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
 const navigate = useNavigate();

    useEffect(() => {
        api
            .get("board/list", {
                params: { type: "lost" },
                withCredentials: true
            })
            .then((res) => {
                if (res.data.success) {
                    setPosts(res.data.posts);
                }
            })
            .catch((err) => console.error(err));
    }, []);

 const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="board-container">
      <div className="board-header">
        <h2>분실한 글</h2>
        <div className="filters">
          <input type="date" className="filter-input" />
          ~
          <input type="date" className="filter-input" />
          <select className="filter-select">
            <option>카테고리</option>
            <option>지갑</option>
            <option>에어팟</option>
          </select>
          <select className="filter-select">
            <option>장소</option>
            <option>1호관</option>
            <option>3호관</option>
          </select>
            <div className="board-search-box">
              <input
                type="text"
                placeholder="제목을 검색하세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button><img src={searchIcon} alt="검색"/></button>
            </div>
          <Link to="/writepage" className="write-btn">글쓰기</Link>
        </div>
      </div>

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
              {filteredPosts.map((post) => (
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

      <div className="pagination">
        <button>{"<<"}</button>
        <button>{"<"}</button>
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>{">"}</button>
        <button>{">>"}</button>
      </div>
    </div>
  );
}

export default LostPage;
