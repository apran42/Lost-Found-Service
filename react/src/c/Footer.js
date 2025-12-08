import "./Footer.css";
import kakaoIcon from "../images/kakao.png";
import instaIcon from "../images/instagram.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <ul className="footer-list">
          <li>서비스 정보</li>
          <li>동양미래대학교 분실물 찾기 서비스</li>
          </ul>
          <ul className="footer-list">
          <li>링크</li>
          <li>{" "}
            <a 
              href="https://www.dongyang.ac.kr"
              target="_blank"
              rel="noopener noreferrer"
            >
              학교홈페이지
              </a>
            </li>
            </ul>
          <ul className="footer-list">
          <li>문의</li>
          <li>hjw57999@gmail.com</li>
          </ul>
          <hr></hr>
          <ul className="footer-list-down">
          <li>08221 서울시 구로구 경인로 445 ([구]고척동 62-160) 동양미래대학교</li>
          <li>TEL. 02-2610-1700 | FAX. 02-2688-5494</li>
          </ul>
        </div>
        <div className="footer-right">
          <a href="https://open.kakao.com" target="_blank" rel="noopener noreferrer">
            <img src={kakaoIcon} alt="카카오톡" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instaIcon} alt="인스타그램" />
          </a>
        </div>
      </div>
         <p className="footer-copy">
            COPYRIGHT(c) DONGYANG MIRAE UNIVERSITY. ALL RIGHTS RESERVED.
        </p>
    </footer>
  );
}


export default Footer;