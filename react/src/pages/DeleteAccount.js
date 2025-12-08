// src/pages/DeleteAccount.js
import React, {useContext, useState} from "react";
import "./AccountPages.css";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import {AuthContext} from "../AuthContext";


function DeleteAccount() {
    const {setLoggedIn, setUser} = useContext(AuthContext);
    const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit =  async (e) => {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

      try {
          const response = await api.delete("/user/deleteAccount", {
              data: { password }, // DELETE는 body를 보낼 때 data 속성 사용
          });

          if (response.data.success) {
              setLoggedIn(false);
              setUser(null);
              // 저장된 로그인 정보 제거
              localStorage.removeItem("user");

              // 홈 또는 로그인 페이지로 이동
              navigate("/delete-complete");
          } else {
              setError(response.data.message || "계정 삭제에 실패했습니다.");
          }
      } catch (err) {
          console.error(err);
          setError("서버 오류가 발생했습니다.");
      }

  };

  return (
    <div className="account-page-wrapper">
      <div className="account-form-container">
        <h2 className="account-title">회원탈퇴</h2>

        <p className="withdraw-desc">
          회원탈퇴를 하시면 계정은 삭제되며, 복구되지 않습니다.
        </p>

        <form onSubmit={submit}>
          <div className="account-field">
            <label>비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="account-error">{error}</p>}
          </div>

          <button type="submit" className="account-submit-btn danger">
            회원 탈퇴
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeleteAccount;
