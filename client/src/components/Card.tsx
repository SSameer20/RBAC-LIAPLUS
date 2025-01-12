import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { PostType } from "../helper/types";

export default function PostCard({ item }: { item: PostType }) {
  return (
    <Card className="py-4" key={item._id}>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h2 className="font-bold text-large">{item.title}</h2>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <h4 className="font-bold text-large">{item.description}</h4>
        {/* <h6 className="font-bold text-large">{item.email}</h6> */}
      </CardBody>
    </Card>
  );
}
