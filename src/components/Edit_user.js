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
import moment from "moment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  getSchools,
  editUser,
  updateUser,
} from "./../redux/actions/userActions";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";

function EditUserDetails() {
  const { TextArea } = Input;
  const { Option } = Select;
  const { Search } = Input;
  let history = useHistory();
  let { id } = useParams();
  const [name, setName] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const schools = useSelector((state) => state.allSchools.schools.data);
  const user = useSelector((state) => state.createUser.user);
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [form] = Form.useForm();

  const searchSchools = async (e) => {
    const response = await axios
      .get(`http://universities.hipolabs.com/search?name=${e}`)
      .catch((err) => {
        console.log("errors", err);
      });
    dispatch(getSchools(response));
  };
  const onChangeSelect = (checked) => {
    setHobbies(checked);
  };

  const onFinish = (values) => {
    if (user != null) {
      Object.assign(values, {
        name: values.name,
        email: values.email,
        phone: values.phoneNumber,
        address: values.address,
        gender: values.gender,
        college: values.college,
        id: user.id,
        hobbies: values.hobbies,
        birthDate: moment(user.birthDate).format("YYYY-MM-DD"),
      });
    }

    dispatch(updateUser(values));
    history.push({
      pathname: "/user-listing",
    });
  };

  const options = [
    { label: "Reading", value: "Reading" },
    { label: "Gaming", value: "Gaming" },
    { label: "Travelling", value: "Travelling" },
    { label: "Drawing", value: "Drawing" },
  ];

  const dateOnChange = (date, dateString) => {
    setDate(dateString);
  };

  useEffect(() => {
    dispatch(editUser(id));
    console.log("dvfs", moment(user.birthDate));
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      phoneNumber: user.phone,
      address: user.address,
      gender: user.gender,
      college: user.college,
      birthDate: moment(user.birthDate),
      hobbies: user.hobbies,
    });
  }, [user]);

  // useEffect(() => {

  // }, [user]);

  return (
    <div className="container">
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
          <Select
          // defaultValue="lucy"
          // style={{ width: 120 }}
          // onChange={handleChange}
          >
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
          <Select
          // defaultValue="lucy"
          // style={{ width: 120 }}
          // onChange={handleChange}
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
        <Form.Item label="Hobbies" name="hobbies">
          {/* <Checkbox.Group>
            {" "}
            <Checkbox value="reading" style={{ lineHeight: "32px" }}>
              Reading
            </Checkbox>
            <Checkbox value="gaming" style={{ lineHeight: "32px" }}>
              Gaming
            </Checkbox>
            <Checkbox value="travelling" style={{ lineHeight: "32px" }}>
              Travelling
            </Checkbox>
            <Checkbox value="drawing" style={{ lineHeight: "32px" }}>
              Drawing
            </Checkbox>
          </Checkbox.Group> */}
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

export default EditUserDetails;
