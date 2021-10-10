import { Button, Table } from "antd";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function UserListing() {
  let history = useHistory();
  const userDetails = useSelector((state) => state.createUser.userDetails);
  const redirectToUserDetails = () => {
    history.push({
      pathname: "/add-user",
    });
  };
  const editUser = (id) => {
    history.push({
      pathname: `/edit-user/${id}`,
    });
  };
  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Birth date",
      key: "birthDate",
      dataIndex: "birthDate",
    },

    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
    },
    {
      title: "Gender",
      key: "gender",
      dataIndex: "gender",
    },
    {
      title: "College",
      key: "college",
      dataIndex: "college",
    },
    {
      title: "Hobbies",
      key: "hobbies",
      dataIndex: "gender",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => editUser(record.id)}>
            Edit
          </Button>
          <Button type="primary">Delete</Button>
          {/* <Button type="primary"></Button> */}
        </span>
      ),
    },
  ];
  return (
    <div>
      {console.log("vd", userDetails)}
      <Button type="primary" onClick={redirectToUserDetails}>
        Add User
      </Button>
      <Table
        columns={columns}
        dataSource={userDetails}
        rowKey={userDetails.id}
      />
    </div>
  );
}

export default UserListing;
