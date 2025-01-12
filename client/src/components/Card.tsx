import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import { PostType } from "../helper/types";
import { User } from "@nextui-org/react";
import { useRecoilValue } from "recoil";
import { user } from "../store/user";
import axios from "axios";

interface PostCardProps {
  item: PostType;
  restrict?: boolean;
}

export default function PostCard({ item, restrict }: PostCardProps) {
  const Role = useRecoilValue(user);
  const token = localStorage.getItem("token");
  if (!token) location.href = "/auth";
  const imageSrc =
    Role === "user"
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
        swal("status changed", `${item.creator.email} post changed`, "success");
      }
    } catch (error: any) {
      alert(
        `Error while changing status: ${
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
        {Role === "user" && (
          <div className="w-[100%] flex flex-row gap-5 mt-2">
            <Button color="primary" onPress={() => handleStatusChange(item)}>
              Change Status
            </Button>
            <Button color="danger">Delete</Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
