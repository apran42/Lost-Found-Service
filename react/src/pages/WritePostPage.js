// WritePostPage.js
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/api";
import "./WritePostPage.css";

const WritePostPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const postId = searchParams.get("postId"); // 수정 모드용
    const isEditMode = !!postId;

    const [loginUser, setLoginUser] = useState(null);
    const [postOwnerId, setPostOwnerId] = useState(null);

    const [title, setTitle] = useState("");
    const [boardType, setBoardType] = useState("");
    const [place, setPlace] = useState("");       // ID 기반
    const [category, setCategory] = useState(""); // ID 기반
    const [content, setContent] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(""); // 기존 이미지 URL

    // 로그인 정보 확인
    useEffect(() => {
        api.get("/user/check").then((res) => {
            if (res.data.loggedIn) {
                setLoginUser(res.data); // uid, id, name 포함
            }
        });
    }, []);

    // 수정 모드 시 기존 글 불러오기
    useEffect(() => {
        if (isEditMode) {
            api.get(`/posts/post/${postId}`)
                .then((res) => {
                    const post = res.data;
                    setTitle(post.title);
                    setBoardType(post.type);
                    setPlace(post.placeId?.toString() || "");
                    setCategory(post.categoryId?.toString() || "");
                    setContent(post.content);
                    setPostOwnerId(post.writerId); // 글 작성자 아이디
                    setImageUrl(post.imageUrl || "");
            console.log(post)
                })
                .catch(() => alert("게시글 불러오기 실패"))
        }
    }, [isEditMode, postId]);

    // 이미지 서버 업로드
    const handleImageUpload = async () => {
        if (!imageFile) return "";
        const formData = new FormData();
        formData.append("file", imageFile);

        try {
            const res = await api.post("/posts/uploadImage", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            return res.data.imageUrl; // 서버에서 반환된 URL
        } catch (e) {
            alert("이미지 업로드 실패");
            console.error(e);
            return "";
        }
    };

    const handleSubmit = async () => {
        if (!loginUser) return alert("로그인이 필요합니다!");
        if (!title) return alert("제목을 입력하세요!");
        if (!boardType) return alert("게시판을 선택하세요!");
        if (!place) return alert("장소를 선택하세요!");
        if (!category) return alert("카테고리를 선택하세요!");

        // 이미지 업로드
        let uploadedImageUrl = imageUrl;
        if (imageFile) {
            const url = await handleImageUpload();
            if (url) uploadedImageUrl = url;
        }

        const data = {
            title,
            type: boardType,
            placeId: Number(place),
            categoryId: Number(category),
            content,
            imageUrl: uploadedImageUrl,
        };

        if (isEditMode) {
            if (loginUser.id !== postOwnerId) return alert("본인 글만 수정 가능합니다!");
            api.put(`/posts/updatePost/${postId}`, data)
                .then(() => {
                    alert("게시글 수정 완료");
                    navigate(`/post/${postId}`);
                })
                .catch(() => alert("수정 실패"));
        } else {
            api.post(`/posts/createPost`, data, { withCredentials: true })
                .then(() => {
                    alert("글 작성 완료");
                    navigate(-1);
                })
                .catch((e) => {
                    alert("글 작성 실패");
                    console.error(e);
                });
        }
    };

    return (
        <div className="write-container">
            <div className="write-box">
                <h2>{isEditMode ? "게시글 수정" : "게시판 글쓰기"}</h2>

                <input
                    className="write-title"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <div className="write-row">
                    <select
                        className="write-select"
                        value={boardType}
                        onChange={(e) => setBoardType(e.target.value)}
                    >
                        <option value="">게시판 선택</option>
                        <option value="분실">분실</option>
                        <option value="습득">습득</option>
                    </select>

                    <select
                        className="write-select"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                    >
                        <option value="">장소 선택</option>
                        <option value="1">1호관</option>
                        <option value="2">2호관</option>
                        <option value="3">3호관</option>
                        <option value="4">4호관</option>
                        <option value="5">5호관</option>
                        <option value="6">6호관</option>
                        <option value="7">7호관</option>
                        <option value="8">8호관</option>
                    </select>

                    <select
                        className="write-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">카테고리 선택</option>
                        <option value="1">지갑</option>
                        <option value="2">핸드폰</option>
                        <option value="3">노트북</option>
                        <option value="4">에어팟</option>
                        <option value="5">열쇠</option>
                        <option value="6">기타</option>
                    </select>
                </div>

                <textarea
                    className="write-textarea"
                    placeholder="내용을 입력하세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                {/* 이미지 업로드 섹션 */}
                <div className="write-image-section">
                    <label htmlFor="imageUpload" style={{ display: "block", marginBottom: "5px" }}>
                        {isEditMode ? "이미지 수정" : "이미지 업로드"}
                    </label>

                    {imageUrl && !imageFile && (
                        <img
                            src={imageUrl}
                            alt="기존 이미지"
                            style={{ width: "200px", marginBottom: "10px", display: "block" }}
                        />
                    )}

                    {imageFile && (
                        <img
                            src={URL.createObjectURL(imageFile)}
                            alt="선택 이미지"
                            style={{ width: "200px", marginBottom: "10px", display: "block" }}
                        />
                    )}

                    <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        style={{ display: "block" }}
                    />
                </div>

                <button className="write-submit" onClick={handleSubmit}>
                    {isEditMode ? "수정하기" : "등록하기"}
                </button>
            </div>
        </div>
    );
};

export default WritePostPage;
