import { Routes, Route } from "react-router-dom";
import Layout from "./c/Layout";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LostPage from "./pages/LostPage";
import FoundPage from "./pages/FoundPage";
import BoardPage from "./pages/BoardPage";
import MyPage from "./pages/MyPage";
import ProfileEdit from "./pages/ProfileEdit";
import PasswordChange from "./pages/PasswordChange";
import DeleteAccount from "./pages/DeleteAccount";
import DeleteComplete from "./pages/DeleteComplete";
import WritePostPage from "./pages/WritePostPage";
import ChatPage from "./pages/ChatPage";
import PostDetail from "./pages/PostDetail";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>

        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/lost" element={<LostPage />} />
            <Route path="/found" element={<FoundPage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/profileedit" element={<ProfileEdit/>}/>
            <Route path="/profile-edit" element={<ProfileEdit />} />
            <Route path="/password-change" element={<PasswordChange />} />
            <Route path="/delete-account" element={<DeleteAccount />} />
            <Route path="/delete-complete" element={<DeleteComplete />} />
            <Route path="/writepage" element={<WritePostPage/>}/>
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </Layout>
    </AuthProvider>
  );
}

export default App;
