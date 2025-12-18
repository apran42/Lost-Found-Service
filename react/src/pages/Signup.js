import React, { useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import "./AccountPages.css";
import api from "../api/api";

function Signup() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
    name: "",
    id: "",
    password: "",
    confirm: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = async () => {
    let newErrors = {};

    if (!form.name) newErrors.name = "이름을 입력해주세요.";
    if (!form.id) newErrors.id = "아이디를 입력해주세요.";

    if (!form.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (form.password.length < 8) {
      newErrors.password =
        "영문, 숫자, 특수문자가 모두 들어간 8~20자를 입력해주세요.";
    }

    if (form.password !== form.confirm) {
      newErrors.confirm = "비밀번호가 일치하지 않습니다.";
    }

    if (!form.phone) newErrors.phone = "연락처를 입력해주세요.";

    setErrors(newErrors);

      // 오류 존재
      if (Object.keys(newErrors).length > 0) return;

      // 오류 없음
      try {
          const res = await api.post("/user/signup", {
              name: form.name,
              uid: form.id,
              password: form.password,
              phone: form.phone,
          });
          console.log(res.data);
          if (res.data.success) {
              alert("회원가입 성공! 로그인 해주세요.");
              navigate("/login");
          } else {
              alert(res.data.message);
          }
      } catch (err) {
          alert(err.res.data.message);
          alert("서버 오류가 발생했습니다.");
      }
  };

  return (
    <div className="account-page-wrapper">
      <div className="account-form-container">
        <h2 className="account-title">회원가입</h2>

        {/* 이름 */}
        <div className="account-field">
          <label>이름</label>
          <input
            name="name"
            onChange={onChange}
            placeholder="이름을 입력하세요."
          />
          {errors.name && <p className="account-error">{errors.name}</p>}
        </div>

        {/* 아이디 */}
        <div className="account-field">
          <label>아이디</label>
          <input
            name="id"
            onChange={onChange}
            placeholder="아이디를 입력하세요."
          />
          {errors.id && <p className="account-error">{errors.id}</p>}
        </div>

        {/* 비밀번호 */}
        <div className="account-field">
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            onChange={onChange}
            placeholder="비밀번호를 입력하세요."
          />
          {errors.password && (
            <p className="account-error">{errors.password}</p>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className="account-field">
          <label>비밀번호 확인</label>
          <input
            type="password"
            name="confirm"
            onChange={onChange}
            placeholder="비밀번호를 다시 입력하세요."
          />
          {errors.confirm && (
            <p className="account-error">{errors.confirm}</p>
          )}
        </div>

        {/* 전화번호 */}
        <div className="account-field">
          <label>전화번호</label>
          <input
            name="phone"
            placeholder="010-0000-0000"
            onChange={onChange}
          />
          {errors.phone && <p className="account-error">{errors.phone}</p>}
        </div>

        <button className="account-submit-btn" onClick={validate}>
          회원가입
        </button>

        <div
          style={{
            marginTop: "16px",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          이미 계정이 있으신가요?{" "}
          <Link to="/login" style={{ marginLeft: 4 }}>
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
