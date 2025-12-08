import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import "./Header.css";

import logo from "../images/logo.png";
import searchIcon from "../images/search-icon.png";
import searchBtn from "../images/search-btn.png";

function Header() {
    const navigate = useNavigate();
    const { loggedIn, setLoggedIn, setUser } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setUser(null);
        setOpen(false);
        alert("로그아웃되었습니다");
        navigate("/");
    };

    return (
        <header className="header">

            {/* 왼쪽 로고 */}
            <div className="header-left">
                <Link to="/">
                    <img src={logo} alt="로고" className="logo" />
                </Link>
            </div>

            {/* 가운데 검색창 */}
            <div className="header-center">
                <div className="search-box">
                    <img src={searchIcon} className="search-icon" alt="검색" />
                    <input
                        type="text"
                        placeholder="모든 분실물을 빠르게 찾아보세요!"
                    />
                    <button className="search-btn">
                        <img src={searchBtn} alt="검색 버튼" />
                    </button>
                </div>
            </div>

            {/* 오른쪽 로그인/메뉴 */}
            <div className="header-right">
                {!loggedIn ? (
                    <Link to="/login" className="auth-btn">
                        로그인
                    </Link>
                ) : (
                    <div className="menu-wrapper">
                        <button className="mypage-btn" onClick={toggleMenu}>
                            마이페이지
                        </button>

                        {open && (
                            <div className="dropdown">
                                <Link
                                    to="/mypage"
                                    onClick={() => setOpen(false)}
                                >
                                    마이페이지
                                </Link>

                                <Link
                                    to="/chat"
                                    onClick={() => setOpen(false)}
                                >
                                    모든 채팅
                                </Link>

                                <div onClick={handleLogout}>로그아웃</div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
