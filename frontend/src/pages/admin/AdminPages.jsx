import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPages({ page }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/pages/${page}`).then(res => {
      if (res.data) setContent(res.data.content);
    });
  }, [page]);

  const save = async () => {
    await axios.put(
      `http://localhost:5000/api/pages/${page}`,
      { content },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    alert("Updated successfully");
  };

  return (
    <div className="admin-page">
      <h2>Edit {page.toUpperCase()}</h2>

      <textarea
        rows="12"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", padding: "12px" }}
      />

      <button className="btn primary" onClick={save}>
        Save Changes
      </button>
    </div>
  );
}
