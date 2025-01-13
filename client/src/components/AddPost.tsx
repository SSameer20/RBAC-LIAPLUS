import { Form, Input, Button } from "@nextui-org/react";
import axios from "axios";
import swal from "sweetalert";

export default function CreatePost({ fetchData }: { fetchData: () => void }) {
  const token = localStorage.getItem("token");
  if (!token) location.href = "/auth";
  const onSubmit = async (e: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const response = await axios.post(
        "https://api-rbac.onrender.com/api/v0/user/post/create",
        {
          title: data.title,
          description: data.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        swal("created", "new post is created", "success");
        fetchData();
      }
    } catch (error) {
      swal("Error", `while creating post ${error}`, "warning");
      console.log(error);
    }
  };

  return (
    <Form
      className="w-full max-w-xs"
      validationBehavior="native"
      onSubmit={onSubmit}
    >
      <Input
        isRequired
        errorMessage="Title"
        label="Post Title"
        labelPlacement="outside"
        name="title"
        placeholder="Title"
        type="text"
      />
      <Input
        isRequired={false}
        errorMessage="Please enter a Description"
        label="Post Description"
        labelPlacement="outside"
        name="description"
        placeholder="Description"
        type="text"
      />
      <Button type="submit" variant="bordered">
        Submit
      </Button>
    </Form>
  );
}
