import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import { PostType } from "../helper/types";
import { User } from "@nextui-org/react";
import axios from "axios";
import swal from "sweetalert";

interface PostCardProps {
  item: PostType;
  restrict?: boolean;
  onRefresh: () => void; // New prop to trigger a refresh
}

export default function PostCard({ item, restrict, onRefresh }: PostCardProps) {
  const Role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  if (!token) location.href = "/auth";

  const imageSrc =
    item.creator.role === "admin"
      ? "https://cdn-icons-png.flaticon.com/512/219/219988.png"
      : "https://images.freeimages.com/fic/images/icons/2526/bloggers/256/admin.png";

  const handleStatusChange = async (item: PostType) => {
    try {
      const response = await axios.put(
        "https://api-rbac.onrender.com/api/v0/admin/post/restrict",
        {
          postId: item._id,
          status: `${item.status === "active" ? "restrict" : "active"}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        swal("Status Changed", `${item.creator.email} post changed`, "success");
        onRefresh();
      }
    } catch (error: any) {
      alert(
        `Error while changing status: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handlePostDelete = async (item: PostType) => {
    try {
      const response = await axios.delete(
        "https://api-rbac.onrender.com/api/v0/admin/post/delete",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            postId: item._id,
          },
        }
      );

      if (response.status === 200) {
        swal(
          "Post Deleted",
          `Deleted ${item.creator.email.split("@")[0]} posts`,
          "success"
        );
        onRefresh(); // Trigger refresh after deletion
      }
    } catch (error: any) {
      alert(
        `Error while deleting post: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <User
          avatarProps={{
            src: imageSrc,
          }}
          description={item.creator.role}
          name={item.creator.email}
        />
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <h2 className="font-bold text-large">{item.title}</h2>
        <h4 className="text-lg">{item.description}</h4>
        <span>{new Date(item.createdAt).toLocaleDateString()}</span>{" "}
        {restrict && <span className="text-red-500 ml-2">Restricted</span>}
        {Role === "admin" && (
          <div className="w-[100%] flex flex-row gap-5 mt-2">
            <Button color="primary" onPress={() => handleStatusChange(item)}>
              Change Status
            </Button>
            <Button color="danger" onPress={() => handlePostDelete(item)}>
              Delete
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
