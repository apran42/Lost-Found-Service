import { useState } from "react";
import "./ChatPage.css";

function ChatPage() {
  // 테스트용 채팅방 데이터
  const [chatRooms] = useState([
    {
      roomId: "1",
      name: "홍길동",
      lastMessage: "제가 물건을 주운 것 같습니다.",
      messages: [
        { sender: "other", text: "안녕하세요 혹시 에어팟 찾고 계신가요??" },
        { sender: "me", text: "제가 물건을 주운 것 같습니다!" },
        { sender: "other", text: "엇 그럼 혹시 어디서 받을 수 있을까요???" },
      ],
    },
    {
      roomId: "2",
      name: "이순신",
      lastMessage: "어디서 잃어버리셨나요?",
      messages: [
        { sender: "other", text: "안녕하세요! 혹시 지갑 보셨나요?" },
      ],
    },
    {
      roomId: "3",
      name: "아무개",
      lastMessage: "감사합니다!",
      messages: [
        { sender: "other", text: "연락드려서 정말 다행이에요!" },
        { sender: "me", text: "저도 감사합니다 :)" },
      ],
    },
  ]);

  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // 채팅방 변경
  const joinRoom = (room) => {
    setCurrentRoom(room);
    setMessages(room.messages);
  };

  // 메시지 보내기
  const sendMessage = () => {
    if (!text.trim() || !currentRoom) return;

    const newMessage = { sender: "me", text };

    const updated = [...messages, newMessage];

    setMessages(updated);

    // 실제 채팅방 목록에도 반영
    currentRoom.messages = updated;

    setText("");
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-container">

        {/* 왼쪽 채팅 리스트 */}
        <div className="chat-list">
          <h3 className="chat-title">전체 대화</h3>

          {chatRooms.map((room) => (
            <div
              key={room.roomId}
              onClick={() => joinRoom(room)}
              className={`chat-item ${
                currentRoom?.roomId === room.roomId ? "active" : ""
              }`}
            >
              <div className="chat-item-left">
                <span className="chat-number">•</span>
                <div>
                  <p className="chat-name">{room.name}</p>
                  <p className="chat-preview">{room.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 오른쪽 채팅방 */}
        <div className="chat-room">
          {!currentRoom ? (
            <div className="chat-placeholder">대화를 선택해주세요.</div>
          ) : (
            <>
              <div className="chat-room-header">
                <h3>{currentRoom.name}님과의 채팅</h3>
                <p className="chat-sub">비방 · 욕설 금지</p>
              </div>

              <div className="chat-messages">
                {messages.map((m, index) => (
                  <div
                    key={index}
                    className={`message ${
                      m.sender === "me" ? "me" : "other"
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
              </div>

              <div className="chat-input-box">
                <input
                  type="text"
                  placeholder="메시지를 입력하세요..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <button className="send-btn" onClick={sendMessage}>
                  ➤
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
