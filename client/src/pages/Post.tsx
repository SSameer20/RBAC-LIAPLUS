import { useEffect, useState } from "react";
import { GetAllPost, PostType } from "../helper/types";
import apiClient from "../helper/apiClient";
import PostCard from "../components/Card";
import { useRecoilValue } from "recoil";
import { user } from "../store/user";

export default function Post() {
  const [data, setData] = useState<PostType[]>([]);
  const Role = useRecoilValue(user);

  const fetchData = async () => {
    try {
      const response = await apiClient.get<GetAllPost>(
        `https://api-rbac.onrender.com/api/v0/${Role}/post/all`
      );

      if (response.status === 200) {
        const postData = response.data.posts || [];
        setData(postData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {data.map((item) => {
        return <PostCard item={item} key={item._id} />;
      })}
    </div>
  );
}
