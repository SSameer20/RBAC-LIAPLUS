import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import apiClient from "../helper/apiClient";
import { GetAllPost, PostType } from "../helper/types";

export default function Post() {
  const [data, setData] = useState<PostType[]>([]);

  const fetchData = async () => {
    try {
      const response = await apiClient.get<GetAllPost>(
        "https://api-rbac.onrender.com/api/v0/user/post/all"
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
      <section>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>DESCRIPTION</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description || "No description"}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
