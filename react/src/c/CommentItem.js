import { useState } from "react";

export default function CommentItem({ comment, loginUser, updateComment, deleteComment }) {
  const [editMode, setEditMode] = useState(false);
  const [updated, setUpdated] = useState(comment.content);

  const isOwner = loginUser && loginUser.uid === comment.user_id;

  return (
    <div style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
      <p><strong>{comment.user_name}</strong></p>

      {editMode ? (
        <textarea
          value={updated}
          onChange={(e) => setUpdated(e.target.value)}
        />
      ) : (
        <p>{comment.content}</p>
      )}

      <p style={{ fontSize: "12px", color: "#888" }}>
        {comment.created_at}
      </p>

      {isOwner && (
        <div>
          {editMode ? (
            <>
              <button onClick={() => { updateComment(comment.id, updated); setEditMode(false); }}>
                저장
              </button>
              <button onClick={() => setEditMode(false)}>취소</button>
            </>
          ) : (
            <>
              <button onClick={() => setEditMode(true)}>수정</button>
              <button onClick={() => deleteComment(comment.id)}>삭제</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
