import { useEffect, useState, useCallback } from "react";
import { GetAllPost, PostType } from "../helper/types";
import PostCard from "../components/Card";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { theme } from "../store/theme";
import CreatePost from "../components/AddPost";

export default function Feed() {
  const [data, setData] = useState<PostType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const Role = localStorage.getItem("role");
  const Theme = useRecoilValue(theme);

  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        location.href = "/auth";
        return;
      }

      const url =
        Role === "admin"
          ? `https://api-rbac.onrender.com/api/v0/admin/post/all`
          : `https://api-rbac.onrender.com/api/v0/user/post/all`;

      const response = await axios.get<GetAllPost>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setData(response.data.posts || []);
      }
    } catch (error) {
      setError("Failed to fetch posts. Please try again later.");
    }
  }, [Role]);

  const refreshData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (data.length === 0) {
    return <div>No posts available.</div>;
  }

  return (
    <div className="w-2/3 flex flex-col gap-10">
      <div
        className={`flex flex-col border-1 rounded-lg ${
          Theme === "light" ? `border-blue-950` : `border-blue-50`
        } min-h-[10vh] p-5`}
      >
        <CreatePost fetchData={fetchData} />
      </div>
      <div className="flex flex-col gap-5">
        {data.map((item, index) => (
          <PostCard
            item={item}
            key={index}
            restrict={item.status !== "active"}
            onRefresh={refreshData} // Pass the callback to PostCard
          />
        ))}
      </div>
    </div>
  );
}
