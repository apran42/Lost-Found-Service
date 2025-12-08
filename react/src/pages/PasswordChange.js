// src/pages/PasswordChange.js
import React, { useState } from "react";
import "./AccountPages.css";
import api from "../api/api";

function PasswordChange() {
  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState("");

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    // 8~20자, 영문/숫자/특수문자 포함
    const pwRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,20}$/;

    if (!form.newPassword) {
      newErrors.newPassword = "비밀번호를 입력해주세요.";
    } else if (!pwRegex.test(form.newPassword)) {
      newErrors.newPassword =
        "영문, 숫자, 특수문자가 모두 들어간 8~20자를 입력해주세요.";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "비밀번호를 한 번 더 입력해주세요.";
    } else if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage("");

    if (!validate()) return;

      try {
          const response = await api.put("/user/password", {
              newPassword: form.newPassword
          });

          if (response.data.success) {
              setSubmitMessage("비밀번호가 성공적으로 변경되었습니다.");
              setForm({ newPassword: "", confirmPassword: "" }); // 입력 초기화
          } else {
              setSubmitMessage(response.data.message || "변경 중 오류 발생");
          }
      } catch (err) {
          console.log(err);
          setSubmitMessage("서버 오류 발생");
      }
  };

  return (
    <div className="account-page-wrapper">
      <div className="account-form-container">
        <h2 className="account-title">비밀번호 변경</h2>

        <form onSubmit={onSubmit}>
          {/* 새 비밀번호 */}
          <div className="account-field">
            <label>새 비밀번호</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={onChange}
              placeholder="영문, 숫자, 특수문자가 모두 들어간 8~20자 입력"
            />
            {errors.newPassword && (
              <p className="account-error">{errors.newPassword}</p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div className="account-field">
            <label>비밀번호 확인</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={onChange}
              placeholder="비밀번호를 한 번 더 입력해주세요."
            />
            {errors.confirmPassword && (
              <p className="account-error">{errors.confirmPassword}</p>
            )}
          </div>

          {submitMessage && (
            <p className="account-success">{submitMessage}</p>
          )}

          <button type="submit" className="account-submit-btn">
            비밀번호 변경
          </button>
        </form>
      </div>
    </div>
  );
}

export default PasswordChange;
