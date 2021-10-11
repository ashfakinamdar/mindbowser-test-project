import {
  Form,
  Input,
  Button,
  Checkbox,
  DatePicker,
  InputNumber,
  Select,
} from "antd";
import { nanoid } from "nanoid";
import "../style/style.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  getSchools,
  createUser,
  editUser,
} from "./../redux/actions/userActions";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function AddUser() {
  const { TextArea } = Input;
  const { Option } = Select;
  const { Search } = Input;
  let history = useHistory();
  const [values, setValues] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [otherHobbies, setOtherHobbies] = useState([]);
  const [date, setDate] = useState("");
  const schools = useSelector((state) => state.allSchools.schools.data);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const searchSchools = async (e) => {
    const response = await axios
      .get(`http://universities.hipolabs.com/search?name=${e}`)
      .catch((err) => {
        console.log("errors", err);
      });
    dispatch(getSchools(response));
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
    console.log("sdv", payload);

    dispatch(createUser(payload));
    history.push({
      pathname: "/user-listing",
    });
  };

  const addHobby = () => {
    let arr = otherHobbies;
    arr.push(values);
    setOtherHobbies(arr);
    {
      console.log("dvf", otherHobbies);
    }
  };
  const getHobbyName = (e) => {
    setValues(e.target.value);
  };

  const options = [
    { label: "Reading", value: "Reading" },
    { label: "Gaming", value: "Gaming" },
    { label: "Travelling", value: "Travelling" },
    { label: "Drawing", value: "Drawing" },
  ];

  // const onChangeCheckbox = (e) => {
  //   setAddHobbies(e.target.checked);
  // };

  const onChangeSelect = (checked) => {
    console.log("cdasasca", checked);
    setHobbies(checked);
  };

  const dateOnChange = (date, dateString) => {
    setDate(dateString);
  };

  return (
    <div className="container">
      <h1>Add User</h1>
      <Form layout="vertical" onFinish={onFinish}>
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
          <Input />
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
          <DatePicker onChange={dateOnChange} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "This is not a valid email!",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your Address!",
            },
          ]}
        >
          <TextArea />
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
          <Select>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>
        <Search
          placeholder="Search College"
          onSearch={searchSchools}
          // enterButton
        />
        <Form.Item
          label="College"
          name="college"
          rules={[
            {
              required: true,
              message: "Please select your College!",
            },
          ]}
        >
          <Select>
            {schools
              ? schools.map((schools, i) => (
                  <Option value={schools.name} key={i}>
                    {schools.name}
                  </Option>
                ))
              : ""}
          </Select>
        </Form.Item>
        <Form.Item label="Collegesssss" name="hobbyname">
          <Input onChange={getHobbyName} />
        </Form.Item>
        <Button onClick={addHobby}>sxsx</Button>
        <Form.Item label="Hobbies" name="hobbies">
          <Checkbox.Group
            options={options}
            // defaultValue={["Apple"]}
            onChange={onChangeSelect}
          />
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
          {otherHobbies ? otherHobbies.map((hobby, i) => <li>{hobby}</li>) : ""}
          {/* <Input value={hobbies} disabled /> */}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddUser;
