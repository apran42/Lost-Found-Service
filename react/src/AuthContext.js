import { createContext, useState, useEffect } from "react";
import api from "./api/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    // 🔥 앱 시작 시 로그인여부 자동 확인
    useEffect(() => {
        api.get("/user/check")
            .then((res) => {
                if (res.data.loggedIn) {
                    setLoggedIn(true);
                    setUser({
                        id: res.data.id,
                        name: res.data.name,
                    });
                } else {
                    setLoggedIn(false);
                    setUser(null);
                }
            })
            .catch(() => {
                setLoggedIn(false);
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loggedIn, setLoggedIn, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
