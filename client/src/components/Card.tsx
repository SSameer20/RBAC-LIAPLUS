import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { PostType } from "../helper/types";
import { User } from "@nextui-org/react";
import { useRecoilValue } from "recoil";
import { user } from "../store/user";

interface PostCardProps {
  item: PostType;
  key: string;
}

export default function PostCard({ item, key }: PostCardProps) {
  const Role = useRecoilValue(user);
  const imageSrc =
    Role === "user"
      ? "https://cdn-icons-png.flaticon.com/512/219/219988.png"
      : "https://images.freeimages.com/fic/images/icons/2526/bloggers/256/admin.png";
  return (
    <Card className="py-4" key={key}>
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
        <span>{new String(item.createdAt).split("T")[0]}</span>{" "}
        {/* Date formatted to human-readable string */}
      </CardBody>
    </Card>
  );
}
