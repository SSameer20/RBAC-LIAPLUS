import { useEffect, useState } from "react";
import { GetAllUser, UserType } from "../helper/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import swal from "sweetalert";
import axios from "axios";

export default function Post() {
  const [data, setData] = useState<UserType[]>([]);
  // const Role = useRecoilValue(user);
  const token = localStorage.getItem("token");
  if (!token) location.href = "/auth";
  const fetchData = async () => {
    try {
      const response = await axios.get<GetAllUser>(
        `https://api-rbac.onrender.com/api/v0/admin/user/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const postData = response.data.users || [];
        console.log(postData);
        setData(postData);
      }
    } catch (error) {
      swal("Error", `${error}`, "warning");
    }
  };

  const handleStatusChange = async (item: UserType) => {
    try {
      const response = await axios.put(
        "https://api-rbac.onrender.com/api/v0/admin/user/restrict",
        {
          userId: item._id,
          status: `${item.status === "active" ? "restrict" : "active"}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        swal("Status Changed", `${item.email} status changed`, "success");
        fetchData(); // Refetch data
      }
    } catch (error: any) {
      alert(
        `Error while changing status: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleUserDelete = async (item: UserType) => {
    try {
      if (item.role === "admin") {
        return swal("unsuccessful", "cannot delete admin", "warning");
      }
      const response = await axios.delete(
        "https://api-rbac.onrender.com/api/v0/admin/user/delete",
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
        swal("User Deleted", `Deleted User`, "success");
        fetchData(); // Refetch data
      }
    } catch (error: any) {
      alert(
        `Error while deleting post: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (data.length === 0)
    <div className="flex flex-col gap-5 justify-center items-center">
      <span>No Data to Show</span>
    </div>;
  return (
    <div className="flex flex-col gap-5">
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell
                  className={
                    item.status === "restrict"
                      ? `text-red-500`
                      : `text-blue-500`
                  }
                >
                  {item.status}
                </TableCell>
                <TableCell className="flex flex-row items-stretch gap-1">
                  <Button
                    color="primary"
                    onPress={() => handleStatusChange(item)}
                  >
                    Change Status
                  </Button>
                  <Button color="danger" onPress={() => handleUserDelete(item)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
