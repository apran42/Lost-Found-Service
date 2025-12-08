// WritePostPage.js
import React, { useState } from "react";
import "./WritePostPage.css";

const WritePostPage = () => {
  const [title, setTitle] = useState("");
  const [boardType, setBoardType] = useState("");
  const [place, setPlace] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!title) return alert("제목을 입력하세요!");
    if (!boardType) return alert("게시판을 선택하세요!");
    if (!place) return alert("장소를 선택하세요!");
    if (!category) return alert("카테고리를 선택하세요!");

    const data = { title, boardType, place, category, content };
    console.log(data);

    alert("글이 등록되었습니다! (콘솔 확인)");
  };

  return (
    <div className="write-container">
      <div className="write-box">
        <h2>게시판 글쓰기</h2>

        {/* 제목 */}
        <input
          className="write-title"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* 선택 영역 */}
        <div className="write-row">
          <select
            className="write-select"
            onChange={(e) => setBoardType(e.target.value)}
          >
            <option value="">게시판 선택</option>
            <option value="분실">분실</option>
            <option value="습득">습득</option>
          </select>

          <select
            className="write-select"
            onChange={(e) => setPlace(e.target.value)}
          >
            <option value="">장소 선택</option>
            <option>1호관</option>
            <option>2호관</option>
            <option>3호관</option>
          </select>

          <select
            className="write-select"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">카테고리 선택</option>
            <option>지갑</option>
            <option>전자기기</option>
            <option>필기구</option>
          </select>
        </div>

        {/* 내용 */}
        <textarea
          className="write-textarea"
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* 버튼 */}
        <button className="write-submit" onClick={handleSubmit}>
          등록하기
        </button>
      </div>
    </div>
  );
};

export default WritePostPage;
