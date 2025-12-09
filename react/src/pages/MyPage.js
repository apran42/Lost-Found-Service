import React, {useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./MyPage.css";
import changeProfileIcon from "../images/changeprofile.png";
import changePasswordIcon from "../images/changepassword.png";
import deleteAccountIcon from "../images/deleteaccount.png";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import {AuthContext} from "../AuthContext";


function MyPage() {
    const { user, loading } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState(null);
    const [myPosts, setMyPosts] = useState([]);
    const [myFoundPosts, setMyFoundPosts] = useState([]);
    const [myLostPosts, setMyLostPosts] = useState([]);
    // FAQ 열림/닫힘
  const [faqOpen, setFaqOpen] = useState(false);
    useEffect(() => {
        if (loading || !user) return;

        // 1) 사용자 기본정보
        api.get("/user/profile")
            .then(res => {
                setUserInfo({
                    name: res.data.name,
                    heart: res.data.heart || 0, // API에 좋아요 합계 등 추가
                    rankPercent: res.data.rankPercent || 0
                });
                console.log(res);
            })
            .catch(err => console.log("프로필 불러오기 실패", err));

        // 2) 내가 올린 게시물
        api.get(`/posts/my?userId=${user.id}`) // 예시 API: 내가 올린 게시물
            .then(res => setMyPosts(res.data))
            .catch(err => console.log("내 게시물 불러오기 실패", err));

        // 3) 내가 습득한 게시물
        api.get(`/posts/my-found?userId=${user.id}`)
            .then(res => setMyFoundPosts(res.data))
            .catch(err => console.log("내 습득물 불러오기 실패", err));

        // 4) 내가 분실한 게시물
        api.get(`/posts/my-lost?userId=${user.id}`)
            .then(res => setMyLostPosts(res.data))
            .catch(err => console.log("내 분실물 불러오기 실패", err));
    }, [user, loading]);


    if (!userInfo) return <div>Loading...</div>;

  return (
    <div className="mypage-wrapper">
      {/* 상단 배너 */}
      <div className="mypage-banner">
        <div className="banner-text">
          <h3><b>{userInfo.name}</b>님의</h3>
          <div className="banner-heart">
            하트는 지금까지 <span className="number">{userInfo.heart}개</span> 모았어요!
          </div>
          <p className="">사용자 중 상위 <span className="number">{userInfo.rankPercent}%</span>예요!</p>
        </div>
      </div>

      {/* 메뉴 */}
      <div  className="mypage-menu">
        {/* 개인정보 변경 */}
        <Link to="/profile-edit" className="menu-card">
          <img src={changeProfileIcon} alt="개인정보 변경 아이콘" className="" />
          <h4>개인정보 변경</h4>
          <p>이름, 이메일, 아이디를 변경합니다.</p>
        </Link>

        {/* 비밀번호 변경 */}
        <Link to="/password-change" className="menu-card">
          <img src={changePasswordIcon} alt="비밀번호 변경 아이콘" className="menu-icon" />
          <h4>비밀번호 변경</h4>
          <p>비밀번호를 변경합니다.</p>
        </Link>

        {/* 회원 탈퇴 */}
        <Link to="/delete-account" className="menu-card">
          <img src={deleteAccountIcon} alt="회원탈퇴 아이콘" className="" />
          <h4>회원 탈퇴</h4>
          <p>DMU 찾아요를 탈퇴합니다.</p>
        </Link>
      </div>

      {/* 내가 응원한 글 */}
      <Section title="내가 응원한 글" posts={myPosts} showType={true} />

      {/* 내가 습득한 글 */}
      <Section title="내가 습득한 글" posts={myFoundPosts} showType={false} />

      {/* 내가 분실한 글 */}
      <Section title="내가 분실한 글" posts={myLostPosts} showType={false} />

      {/* FAQ */}
      <div className="faq-section">
        <h3>자주 묻는 질문</h3>
        <div className="faq-item">
          <div className="faq-q" onClick={() => setFaqOpen(!faqOpen)}>
            ❓ 게시글이 안 올라가요.
          </div>
          {faqOpen && (
            <div className="faq-a">
              게시글은 관리자 확인 후 등록됩니다.
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

function Section({ title, posts, showType }) {
  const navigate = useNavigate();

  // 전체 글 보기 버튼 클릭 처리
  const handleViewAll = () => {
    if (title === "내가 습득한 글") {
      navigate("/found");
    } else if (title === "내가 분실한 글") {
      navigate("/lost");
    }
  };

  // “내가 응원한 글” → 버튼 숨김
  const hideViewAll = title === "내가 응원한 글";

  return (
    <div className="mypage-section">
      <div className="section-header">
        <h3>{title}</h3>

        {!hideViewAll && (
          <button className="view-all" onClick={handleViewAll}>
            전체 글 보기
          </button>
        )}
      </div>

      <table className="mypage-table">
        <thead>
          <tr>
            <th>NO</th>
            <th>작성일</th>
            {showType && <th>분류</th>}
            <th>제목</th>
            <th>장소</th>
            <th>카테고리</th>
            <th>작성자명</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.date}</td>
              {showType && <td>{p.type}</td>}
              <td className="title">{p.title}</td>
              <td>{p.place}</td>
              <td>{p.category}</td>
              <td>{p.writer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyPage;
