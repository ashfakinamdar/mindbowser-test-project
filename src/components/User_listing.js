import { Button, Table, Input, Row, Col, notification } from "antd";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "../style/style.css";
import { useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteUser } from "./../redux/actions/userActions";

function UserListing() {
  let history = useHistory();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
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

  const deleteEntry = (id) => {
    dispatch(deleteUser(id));
    notification.success({
      message: "Success",
      description: "User Deleted Successfully",
    });
  };

  const searchValue = (e) => {
    setSearch(e.target.value);
  };

  const filteredData =
    userDetails.length > 0
      ? userDetails.filter(
          (fdata) =>
            fdata.name.toLowerCase().includes(search.toLowerCase()) ||
            fdata.email.toLowerCase().includes(search.toLowerCase())
        )
      : [];

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
      width: 120,
      render: (text, record) => (
        <span>{moment(record.birthDate).format("DD/MM/YYYY")}</span>
      ),
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
      width: 80,
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
      width: 100,
      fixed: "right",
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
          <Button type="danger" onClick={() => deleteEntry(record.id)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];
  return (
    <div className="main">
      <h1>User Listing</h1>
      <Row className="mb-20">
        <Col span={15}>
          {" "}
          <Input onChange={searchValue} placeholder="Search by name or email" />
        </Col>
        <Col span={9} className="alignRight">
          {" "}
          <Button
            type="primary"
            onClick={redirectToUserDetails}
            className="addButton"
          >
            Add User
          </Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="name"
        className=""
        scroll={{ x: 1300 }}
      />
    </div>
  );
}

export default UserListing;
