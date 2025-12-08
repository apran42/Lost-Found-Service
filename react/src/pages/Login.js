import React, {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./AccountPages.css";

import api from "../api/api";
import {AuthContext} from "../AuthContext"; // api 호출

function Login() {

    const navigate = useNavigate();
    const {setLoggedIn, setUser} = useContext(AuthContext);

    const [form, setForm] = useState({ id: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onLogin = async () => {
      if (!form.id || !form.password) {
          setError("아이디 또는 비밀번호가 비어있습니다.");
      }
      try {
          setError("");

          const res = await api.post("http://localhost:8080/api/user/login", {
              uid: form.id,
              password: form.password,
          }, {
              withCredentials: true,
          });

          if (res.data.success) {
              setLoggedIn(true);
              setUser({
                  id: res.data.uid,
                  name: res.data.name,
              });

              alert("로그인 성공");
              navigate('/');
          } else {
              alert(res.data.message);
          }


      } catch (error) {
          setError("아이디 또는 비밀번호가 잘못되었습니다. 정확하게 입력해주세요.");
      }
  };

  return (
    <div className="account-page-wrapper">
      <div className="account-form-container">
        <h2 className="account-title">로그인</h2>

        <div className="account-field">
          <label>아이디</label>
          <input
            name="id"
            value={form.id}
            onChange={onChange}
            placeholder="아이디를 입력해주세요."
          />
        </div>

        <div className="account-field">
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="비밀번호를 입력해주세요."
          />
        </div>

        {error && <p className="account-error">{error}</p>}

        <button className="account-submit-btn" onClick={onLogin}>
          로그인
        </button>

        <div
          style={{
            marginTop: "16px",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          아직 회원가입을 하지 않으셨나요?{" "}
          <Link to="/signup" style={{ marginLeft: 4 }}>
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
