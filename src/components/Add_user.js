import {
  Form,
  Input,
  Button,
  Checkbox,
  DatePicker,
  InputNumber,
  Select,
} from "antd";
import { useState } from "react";
import "../style/style.css";

function AddUser() {
  const [user, setUsers] = useState([]);
  const { TextArea } = Input;
  const { Option } = Select;
  const { Search } = Input;

  const otherSelected = () => {};

  const searchSchools = (e) => {
    fetch(`http://universities.hipolabs.com/search?name=${e}`)
      .then((response) => response.json())
      .then((json) => setUsers(json));
  };

  return (
    <div className="container">
      <Form layout="vertical">
        <Form.Item
          label="Name"
          name="Name"
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
          name="Birth Date"
          rules={[
            {
              required: true,
              message: "Please select date!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Email"
          name="Email"
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
          name="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Address"
          name="Address"
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
          name="Gender"
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
        <Form.Item
          label="College"
          name="College"
          rules={[
            {
              required: true,
              message: "Please select your College!",
            },
          ]}
        >
          <Form.Item>
            <Search
              placeholder="Search College"
              onSearch={searchSchools}
              // enterButton
            />
          </Form.Item>
          <Form.Item>
            <Select
            // defaultValue="lucy"
            // style={{ width: 120 }}
            // onChange={handleChange}
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </Form.Item>

        <Form.Item label="Hobbies" name="Hobbies">
          <Checkbox>Reading</Checkbox>
          <Checkbox>Gaming</Checkbox>
          <Checkbox>Traveling</Checkbox>
          <Checkbox>Drawing</Checkbox>
          <Checkbox onChange={otherSelected}>other</Checkbox>
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
