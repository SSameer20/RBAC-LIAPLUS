import { useEffect, useState, useCallback } from "react";
import { GetAllPost, PostType } from "../helper/types";
import PostCard from "../components/Card";
import { useRecoilValue } from "recoil";
import { user } from "../store/user";
import axios from "axios";

export default function Feed() {
  const [data, setData] = useState<PostType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const Role = useRecoilValue(user);

  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        location.href = "/auth";
        return;
      }

      const url =
        Role === "admin"
          ? `http://localhost:8080/api/v0/admin/post/all`
          : `http://localhost:8080/api/v0/user/post/all`;

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
  }, [Role]); // fetchData depends on Role

  useEffect(() => {
    fetchData();
  }, [fetchData]); // fetchData is a stable dependency

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (data.length === 0) {
    return <div>No posts available.</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      {data.map((item, index) => (
        <PostCard
          item={item}
          key={index}
          restrict={Role === "user" && item.status !== "active"}
        />
      ))}
    </div>
  );
}
