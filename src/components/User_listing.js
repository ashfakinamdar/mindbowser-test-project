import { Button, Table } from "antd";
import { useHistory } from "react-router-dom";

function UserListing() {
  let history = useHistory();

  const redirectToUserDetails = () => {
    history.push({
      pathname: "/add-user",
    });
  };
  const columns = [
    {
      title: "Name",
      key: "name",
    },
    {
      title: "Birth date",
      key: "birthDate",
    },

    {
      title: "Email",
      key: "email",
    },
    {
      title: "Phone",
      key: "phone",
    },
    {
      title: "Address",
      key: "address",
    },
    {
      title: "Gender",
      key: "gender",
    },
    {
      title: "College",
      key: "college",
    },
    {
      title: "Hobbies",
      key: "hobbies",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button type="primary">Edit</Button>
          <Button type="primary">Delete</Button>
          {/* <Button type="primary"></Button> */}
        </span>
      ),
    },
  ];
  return (
    <div>
      <Button type="primary" onClick={redirectToUserDetails}>
        Add User
      </Button>
      <Table columns={columns} />
    </div>
  );
}

export default UserListing;
