import { useEffect, useState } from "react";
import { GetAllPost, PostType } from "../helper/types";
import PostCard from "../components/Card";
import { useRecoilValue } from "recoil";
import { user } from "../store/user";
import axios from "axios";

export default function Post() {
  const [data, setData] = useState<PostType[]>([]);
  const Role = useRecoilValue(user);
  const token = localStorage.getItem("token");
  if (!token) location.href = "/auth";

  const fetchData = async () => {
    try {
      const response = await axios.get<GetAllPost>(
        `https://api-rbac.onrender.com/api/v0/${Role}/post/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const postData = response.data.posts || [];
        setData(postData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onRefresh = () => {
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (data.length === 0)
    return (
      <div className="flex flex-col justify-center items-center">
        <span className="text-2xl">No Data</span>
      </div>
    );
  return (
    <div className="flex flex-col gap-5">
      {data.map((item) => {
        if (item.status === "active")
          return <PostCard item={item} key={item._id} onRefresh={onRefresh} />;
        else
          return (
            <PostCard
              item={item}
              key={item._id}
              restrict={true}
              onRefresh={onRefresh}
            />
          );
      })}
    </div>
  );
}
