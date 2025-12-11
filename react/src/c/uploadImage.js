// uploadImage.js
export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:8080/api/posts/uploadImage", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) throw new Error("업로드 실패");

    const data = await res.json();
    return data.imageUrl; // DB 저장용 경로
};
