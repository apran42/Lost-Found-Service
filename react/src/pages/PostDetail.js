import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PostDetail.css";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [postMenuOpen, setPostMenuOpen] = useState(false);
  const [openCommentMenu, setOpenCommentMenu] = useState(null);

  const post = {
    id,
    title: "에어팟을 잃어버린 물품을 찾습니다.",
    type: "분실물",
    writer: "황지원",
    date: "2025.10.01",
    views: 38,
    place: "3호관",
    category: "에어팟",
    content:
      "10월 2일에 에어팟을 학교에서 분실했습니다.\n3호관에서 주웠다는 분을 찾고 있습니다.\n혹시 보시면 연락 부탁드립니다!",
    image:
      "https://cdn.pixabay.com/photo/2019/11/21/03/46/airpods-4648460_1280.jpg",
  };

  const comments = [
    {
      id: 1,
      writer: "사용자123",
      content: "어디에서 주우셨나요?",
      date: "2025.10.01 13:02",
    },
    {
      id: 2,
      writer: "김태민",
      content: "혹시 사진 가능하신가요?",
      date: "2025.10.01 13:09",
    },
  ];

  return (
    <div className="detail-wrapper">
      <div className="detail-box">
        <h2 className="detail-top-title">{post.type} 글 게시판</h2>

        <div className="detail-section">
          {/* 글 상단 */}
          <div className="detail-header">
            <h2>{post.title}</h2>

            {/* 드롭다운 버튼 */}
            <div className="dropdown-wrapper">
              <div
                className="detail-menu"
                onClick={() => setPostMenuOpen(!postMenuOpen)}
              >
                ⋮
              </div>

              {postMenuOpen && (
                <div className="dropdown-menu">
                  <button onClick={() => alert("글 수정")}>글 수정</button>
                  <button onClick={() => alert("글 삭제")}>글 삭제</button>
                </div>
              )}
            </div>
          </div>

          {/* 글 정보 */}
          <div className="detail-info">
            <span>{post.type}</span> | <span>{post.date}</span> |{" "}
            <span>조회 {post.views}</span> | <span>{post.writer}</span>
          </div>

          {/* 이미지 */}
          <div className="detail-img-box">
            <img src={post.image} alt="사진" />
          </div>

          {/* 내용 */}
          <div className="detail-content">{post.content}</div>

          {/* 응원하기 + 목록 + 채팅 */}
          <div className="detail-bottom-btns">
            <button className="like-btn">❤️ 응원하기</button>

            <div className="detail-bottom-right">
              <button className="list-btn" onClick={() => navigate(-1)}>
                목록
              </button>
              <button className="chat-btn">💬 채팅하기</button>
            </div>
          </div>

          {/* 댓글 입력 */}
          <div className="comment-input-box">
            <input type="text" placeholder="댓글을 입력하세요..." />
            <button className="comment-submit">등록</button>
          </div>

          {/* 댓글 */}
          <div className="comment-count">댓글 {comments.length}</div>

          <div className="comment-list">
            {comments.map((c) => (
              <div key={c.id} className="comment-item">
                <div className="comment-top">
                  <strong>{c.writer}</strong>

                  <div className="dropdown-wrapper">
                    <div
                      className="comment-menu"
                      onClick={() =>
                        setOpenCommentMenu(
                          openCommentMenu === c.id ? null : c.id
                        )
                      }
                    >
                      ⋮
                    </div>

                    {openCommentMenu === c.id && (
                      <div className="dropdown-menu">
                        <button onClick={() => alert("댓글 수정")}>
                          댓글 수정
                        </button>
                        <button onClick={() => alert("댓글 삭제")}>
                          댓글 삭제
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="comment-content">{c.content}</div>
                <div className="comment-date">{c.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
