import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PostDetail.css";
import api from "../api/api";

function PostDetail() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loginUser, setLoginUser] = useState(null);
    const [liked, setLiked] = useState(false); // 내가 이미 좋아요 눌렀는지
    const [likeCount, setLikeCount] = useState(0);

    const [newComment, setNewComment] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingContent, setEditingContent] = useState("");

    const [postMenuOpen, setPostMenuOpen] = useState(false);
    const [openCommentMenu, setOpenCommentMenu] = useState(null);
    const [error, setError] = useState(false);

    const formatDate = (isoString) => {
        if (!isoString) return "";
        const date = new Date(isoString);
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        const h = String(date.getHours()).padStart(2, "0");
        const min = String(date.getMinutes()).padStart(2, "0");
        return `${y}.${m}.${d} ${h}:${min}`;
    };

    // 로그인 정보 가져오기
    useEffect(() => {
        api.get("/user/check").then((res) => {
            if (res.data.loggedIn) {
                setLoginUser(res.data);
            }
        });
    }, []);

    // 게시글 불러오기 (loginUser 로딩 이후에 실행)
    useEffect(() => {
        if (!id) return;
        api.get(`/posts/post/${id}`)
            .then((res) => setPost(res.data))
            .catch(() => setError("게시물 로딩 실패"));
    }, [id]); // loginUser 의존성 추가

// 로그인 + post 준비되면 좋아요 상태 반영
    useEffect(() => {
        if (!post || !loginUser) return;
        setLiked(post.likedByCurrentUser || false);
        setLikeCount(post.likeCount || 0);
    }, [post, loginUser]);

    // 댓글 불러오기
    useEffect(() => {
        if (!id) return;
        api.get(`/comments/${id}/comments`).then((res) => {
            setComments(res.data);
        });
    }, [id]);

    // 좋아요 토글
    const toggleLike = () => {
        if (!loginUser) return alert("로그인이 필요합니다!");

        api.post(`/posts/${post.id}/like`).then((res) => {
            setLiked(res.data.liked);       // 서버 반환 값 사용
            setLikeCount(res.data.likeCount);
            console.log(likeCount);
        }).catch(() => alert("좋아요 처리 실패"));
    };

    // 댓글 생성
    const createComment = () => {
        if (!newComment.trim()) return;

        api.post(`/comments/${id}`, { content: newComment })
            .then((res) => {
                setComments([res.data, ...comments]);
                setNewComment("");
            })
            .catch(() => alert("댓글 등록 실패"));
    };

    // 댓글 수정 시작
    const startEdit = (comment) => {
        setEditingCommentId(comment.id);
        setEditingContent(comment.content);
    };

    // 댓글 수정 저장
    const saveEdit = (commentId) => {
        api.put(`/comments/comments/${commentId}`, { content: editingContent })
            .then((res) => {
                setComments(comments.map((c) => (c.id === commentId ? res.data : c)));
                setEditingCommentId(null);
            })
            .catch(() => alert("댓글 수정 실패"));
    };

    // 댓글 삭제
    const deleteComment = (commentId) => {
        if (!window.confirm("정말 삭제할까요?")) return;

        api.delete(`/comments/comments/${commentId}`)
            .then(() => {
                setComments(comments.filter((c) => c.id !== commentId));
            })
            .catch(() => alert("삭제 실패"));
    };


    return (
        <div className="detail-wrapper">
            <div className="detail-box">
                <h2 className="detail-top-title">{post?.type} 글 게시판</h2>
                <div className="detail-section">

                    {/* 글 상단 */}
                    <div className="detail-header">
                        <h2>{post?.title}</h2>
                        {loginUser?.id === post?.writerId && (
                            <div className="dropdown-wrapper">
                                <div className="detail-menu" onClick={() => setPostMenuOpen(!postMenuOpen)}>
                                    ⋮
                                </div>
                                {postMenuOpen && (
                                    <div className="dropdown-menu">
                                        <button onClick={() => navigate(`/writepage?postId=${post?.id}`)}>글 수정</button>
                                        <button onClick={() => {
                                            if (window.confirm("정말 삭제할까요?")) {
                                                api.delete(`/posts/deletePost/${post.id}`)
                                                    .then(() => { alert("게시글 삭제 완료"); navigate(-1); })
                                                    .catch(() => alert("삭제 실패"));
                                            }
                                        }}>글 삭제</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* 글 정보 */}
                    <div className="detail-info">
                        <span>{post?.type}</span> | <span>{post?.date}</span> | <span>조회 {post?.view}</span> | <span>{post?.writer}</span>
                    </div>

                    {/* 이미지 */}
                    <div className="detail-img-box">
                        <img src={post?.image} alt="사진" />
                    </div>

                    {/* 내용 */}
                    <div className="detail-content">{post?.content}</div>

                    {/* 좋아요 버튼 */}
                    <div className="detail-bottom-btns">
                        <button className="like-btn" onClick={toggleLike}>
                            {liked ? `💖 ${likeCount}명이 응원 중!` : `❤️ ${likeCount}명과 함께 응원하기`}
                        </button>
                        <div className="detail-bottom-right">
                            <button className="list-btn" onClick={() => navigate(-1)}>목록</button>
                            <button className="chat-btn">💬 채팅하기</button>
                        </div>
                    </div>

                    {/* 댓글 관련 HTML 그대로 */}
                    <div className="comment-input-box">
                        <input
                            type="text"
                            placeholder="댓글을 입력하세요..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button className="comment-submit" onClick={createComment}>
                            등록
                        </button>
                    </div>

                    <div className="comment-count">댓글 {comments.length}</div>

                    <div className="comment-list">
                        {comments.map((c) => (
                            <div key={c.id} className="comment-item">
                                <div className="comment-top">
                                    <div className="comment-top-left">
                                        <strong>{c.userName}</strong>
                                        <span className="comment-date" style={{ marginLeft: "10px"}}>
                                            {formatDate(c.updatedAt) ? `${formatDate(c.updatedAt)} (수정됨)` : `${formatDate(c.createdAt)}`}
                                        </span>
                                    </div>
                                    {loginUser?.id === c.userId && (
                                        <div className="dropdown-wrapper">
                                            <div className="comment-menu" onClick={() => setOpenCommentMenu(openCommentMenu === c.id ? null : c.id)}>⋮</div>
                                            {openCommentMenu === c.id && (
                                                <div className="dropdown-menu">
                                                    <button onClick={() => startEdit(c)}>댓글 수정</button>
                                                    <button onClick={() => deleteComment(c.id)}>댓글 삭제</button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {editingCommentId === c.id ? (
                                    <>
                                        <input className="comment-edit-input" value={editingContent} onChange={(e) => setEditingContent(e.target.value)} />
                                        <button className="comment-save-btn" onClick={() => saveEdit(c.id)}>저장</button>
                                    </>
                                ) : (
                                    <>
                                        <div className="comment-content">{c.content}</div>
                                        <div className="comment-date">{c.date}</div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PostDetail;
