// src/pages/ProfileEdit.js
import React, {useContext, useEffect, useState} from "react";
import "./AccountPages.css";
import api from "../api/api";
import {AuthContext} from "../AuthContext";

function ProfileEdit() {
  // 실제로는 API에서 불러온 값으로 초기화하면 됨
    const {user, loggedIn} = useContext(AuthContext);
    const [form, setForm] = useState({
    name: "",
    userId: "hjw570", // 아이디는 수정 불가라고 가정
    phone: "",
    department: "",
    studentNo: "",
  });

  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState("");
    const [validDepartments, setValidDepartments] = useState([]);


    useEffect(() => {
        if (loggedIn && user) {
            api.get("/user/profile")
                .then((res) => {
                    setForm({
                        name: res.data.name,
                        userId: res.data.uid,
                        phone: res.data.phone || "",
                        department: res.data.department || "",
                        studentNo: res.data.studentNo || "",
                    });
                })
                .catch((err) => {
                    console.log("프로필 불러오기 실패", err);
                });
        }

        api.get("/user/departments")
            .then((res) => {
                if (res.data.success && Array.isArray(res.data.departments))
                    setValidDepartments(res.data.departments)
            })
            .catch((err) => console.log("학과 목록 불러오기 실패",err));
    }, [loggedIn, user]);
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    const validate = () => {
        const newErrors = {};

        if (form.name && !form.name.trim()) {
            newErrors.name = "이름을 입력해주세요.";
        }

        if (form.phone) {
            const phoneRegex = /^010-?\d{4}-?\d{4}$/;
            if (!phoneRegex.test(form.phone)) {
                newErrors.phone = "‘-’를 포함한 번호를 입력해주세요.";
            }
        }

        if (form.department) {
            if (!validDepartments.includes(form.department)) {
                newErrors.department = "존재하지 않는 학과입니다.";
            }
        }

        if (form.studentNo) {
            const studentRegex = /^20\d{6}$/;
            if (!studentRegex.test(form.studentNo)) {
                newErrors.studentNo = "올바른 형식이 아닙니다.";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitMessage("");

        if (!validate()) return;

        try {
            const response = await api.put("/user/profile", form);
            if(response.data.success) {
                setSubmitMessage("개인정보가 성공적으로 수정되었습니다.");
            } else {
                setSubmitMessage("수정 중 오류가 발생하였습니다");
            }
        } catch (error) {
            setSubmitMessage("서버 오류 발생");
        }

    };

  return (
    <div className="account-page-wrapper">
      <div className="account-form-container">
        <h2 className="account-title">개인정보 변경</h2>

        <form onSubmit={onSubmit}>
          {/* 이름 */}
          <div className="account-field">
            <label>이름</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="이름을 입력하세요"
            />
            {errors.name && <p className="account-error">{errors.name}</p>}
          </div>

          {/* 아이디 (읽기 전용) */}
          <div className="account-field">
            <label>아이디</label>
            <input name="userId" value={form.userId} readOnly />
          </div>

          {/* 전화번호 */}
          <div className="account-field">
            <label>전화번호</label>
            <input
              name="phone"
              value={form.phone}
              onChange={onChange}
              placeholder="'-'를 포함한 숫자만 입력"
            />
            {errors.phone && <p className="account-error">{errors.phone}</p>}
          </div>

          {/* 학과 */}
          <div className="account-field">
            <label>학과</label>
            <input
              name="department"
              value={form.department}
              onChange={onChange}
              placeholder="예) 데이터융합지능공학과"
            />
            {errors.department && (
              <p className="account-error">{errors.department}</p>
            )}
          </div>

          {/* 학번 */}
          <div className="account-field">
            <label>학번</label>
            <input
              name="studentNo"
              value={form.studentNo}
              onChange={onChange}
              placeholder="학번을 입력하세요"
            />
            {errors.studentNo && (
              <p className="account-error">{errors.studentNo}</p>
            )}
          </div>

          {submitMessage && (
            <p className="account-success">{submitMessage}</p>
          )}

          <button type="submit" className="account-submit-btn">
            수정 완료
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileEdit;
