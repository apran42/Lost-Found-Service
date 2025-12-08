// src/pages/DeleteComplete.js
import React from "react";
import "./AccountPages.css";
import { useNavigate } from "react-router-dom";

function DeleteComplete() {
  const navigate = useNavigate();

  return (
    <div className="account-page-wrapper">
      <div className="account-form-container">
        <h2 className="account-title">회원탈퇴가 완료되었습니다</h2>

        <p className="withdraw-desc">
          그동안 DMU찾아요! 서비스를 이용해주셔서 감사합니다.
        </p>

        <button className="account-submit-btn" onClick={() => navigate("/")}>
          🏠 홈으로 이동하기
        </button>
      </div>
    </div>
  );
}

export default DeleteComplete;
