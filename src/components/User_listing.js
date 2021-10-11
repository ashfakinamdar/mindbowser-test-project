import { Button, Table } from "antd";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "../style/style.css";

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
      width: 100,
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
      render: (text, record) => <span>{record.hobbies.join(", ")}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button
            type="primary"
            onClick={() => editUser(record.id)}
            className="mb-10"
          >
            Edit
          </Button>
          <Button type="danger">Delete</Button>
        </span>
      ),
    },
  ];
  return (
    <div className="main">
      <h1>User Listing</h1>
      <div className="alignRight">
        <Button type="primary" onClick={redirectToUserDetails}>
          Add User
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={userDetails}
        rowKey={userDetails.id}
        className="listingTable"
      />
    </div>
  );
}

export default UserListing;
