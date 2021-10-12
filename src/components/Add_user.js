import {
  Form,
  Input,
  Button,
  Checkbox,
  DatePicker,
  Spin,
  Select,
  notification,
  Tag,
} from "antd";
import { nanoid } from "nanoid";
import "../style/style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getSchools, createUser } from "./../redux/actions/userActions";
import { useHistory } from "react-router-dom";
import { useState } from "react";

function AddUser() {
  const { TextArea } = Input;
  const { Option } = Select;
  const { Search } = Input;
  let history = useHistory();
  const [hobbyOptions, setHobbyOptions] = useState([
    { label: "Reading", value: "Reading" },
    { label: "Gaming", value: "Gaming" },
    { label: "Travelling", value: "Travelling" },
    { label: "Drawing", value: "Drawing" },
  ]);
  const [values, setValues] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [date, setDate] = useState("");
  const [foundCollege, setFoundCollege] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showOtherHobby, setShowOtherHobby] = useState(false);
  const schools = useSelector((state) => state.allSchools.schools.data);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const searchSchools = async (e) => {
    setLoader(true);
    let response = [];
    response = await axios
      .get(`http://universities.hipolabs.com/search?name=${e}`)
      .catch((err) => {
        console.log("errors", err);
      });
    if (
      response &&
      response.data &&
      response.data.length &&
      response.data.length > 0
    ) {
      dispatch(getSchools(response));
      setFoundCollege(true);
      setLoader(false);
    } else {
      notification.error({
        message: "Failed",
        description: "No schools found",
      });
      setLoader(false);
    }
  };
  const onFinish = (values) => {
    var payload = {
      address: values.address,
      birthDate: date,
      college: values.college,
      gender: values.gender,
      id: nanoid(),
      name: values.name,
      phone: values.phoneNumber,
      hobbies: values.hobbies,
      email: values.email,
    };

    dispatch(createUser(payload));
    history.push({
      pathname: "/user-listing",
    });
    notification.success({
      message: "Success",
      description: "User Added Successfully",
    });
  };

  const addHobby = () => {
    if (values) {
      if (hobbies.includes(values)) {
        notification.error({
          message: "Failed",
          description: "Hobby already exists",
        });
        return;
      } else {
        setHobbyOptions(hobbyOptions.concat({ label: values, value: values }));
        hobbies.push(values);
        setHobbies(hobbies);
      }
    } else {
      notification.warning({
        message: "Failed",
        description: "Please enter a hobby",
      });
    }
    setValues("");
  };
  const getHobbyName = (e) => {
    setValues(e.target.value);
  };

  const onChangeSelect = (checked) => {
    setHobbies(checked);
  };

  const onChangeOtherHobbieCheckbox = () => {
    setShowOtherHobby(!showOtherHobby);
  };
  const dateOnChange = (date, dateString) => {
    setDate(dateString);
  };

  return (
    <div className="container">
      <Spin spinning={loader}>
        <h1>Add User</h1>
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            label="Birth Date"
            name="birthDate"
            rules={[
              {
                required: true,
                message: "Please select date!",
              },
            ]}
          >
            <DatePicker onChange={dateOnChange} format={"DD/MM/YYYY"} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "This is not a valid email!",
                type: "email",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
                whitespace: true,
              },
            ]}
          >
            <Input type="number" placeholder="Enter phone number" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your Address!",
                whitespace: true,
              },
            ]}
          >
            <TextArea placeholder="Enter address" />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please input your Gender!",
              },
            ]}
          >
            <Select placeholder="Select gender">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <div className="mb-10">
            <Tag color="orange">
              Please input your college name and click search icon
            </Tag>
          </div>
          <Form.Item label="Search College">
            <Search
              placeholder="Search College"
              onSearch={searchSchools}
              // enterButton
            />
          </Form.Item>
          <Form.Item
            label="Select College"
            name="college"
            rules={[
              {
                required: true,
                message: "Please select your College!",
              },
            ]}
          >
            <Select
              placeholder="Select college"
              disabled={foundCollege ? false : true}
            >
              {schools
                ? schools.map((schools, i) => (
                    <Option value={schools.name} key={i}>
                      {schools.name}
                    </Option>
                  ))
                : ""}
            </Select>
          </Form.Item>
          {showOtherHobby ? (
            <Form.Item
              label="Other Hobbies"
              // name="hobbyname"
            >
              <Input
                onChange={getHobbyName}
                value={values}
                placeholder="Add a hobby"
              />
              <Button type="primary" onClick={addHobby} className="mt-20">
                Add Hobby
              </Button>
            </Form.Item>
          ) : (
            ""
          )}

          <Checkbox
            onChange={onChangeOtherHobbieCheckbox}
            className="otherHobbyCheck"
          >
            Other Hobbies
          </Checkbox>
          <Form.Item label="Hobbies" name="hobbies" className="formItem">
            <Checkbox.Group options={hobbyOptions} onChange={onChangeSelect} />
          </Form.Item>
          <Form.Item
            label="Hobbies"
            name="hobbies"
            rules={[
              {
                required: true,
                message: "Please select atleast one hobbie!",
              },
            ]}
          >
            <Select mode="multiple">
              {hobbies
                ? hobbies.map((hobby, i) => (
                    <Option key={i} disabled>
                      {hobby}
                    </Option>
                  ))
                : ""}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
}

export default AddUser;
