import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import logo from "../images/logo.png";

function MainHeader({ isLogin = true }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">

      {/* 왼쪽 로고 */}
      <div className="header-left">
        <Link to="/">
          <img src={logo} alt="로고" className="logo" />
        </Link>
      </div>

      {/* 가운데는 비워둠 */}
      <div className="header-center"></div>

      {/* 오른쪽 로그인/드롭다운 */}
      <div className="header-right">
        {!isLogin ? (
          <Link to="/login" className="auth-btn">
            로그인
          </Link>
        ) : (
          <div className="menu-wrapper">
            <button className="mypage-btn" onClick={() => setOpen(!open)}>
              마이페이지
            </button>

            {open && (
              <div className="dropdown">
                <Link to="/mypage">마이페이지</Link>
                <Link to="/chat">모든 채팅</Link>
                <Link to="/logout">로그아웃</Link>
              </div>
            )}
          </div>
        )}
      </div>

    </header>
  );
}

export default MainHeader;
