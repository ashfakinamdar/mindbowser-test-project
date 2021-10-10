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

function AddUser() {
  const { TextArea } = Input;
  const { Option } = Select;
  const { Search } = Input;
  let history = useHistory();
  const schools = useSelector((state) => state.allSchools.schools.data);
  const dispatch = useDispatch();

  const searchSchools = async (e) => {
    const response = await axios
      .get(`http://universities.hipolabs.com/search?name=${e}`)
      .catch((err) => {
        console.log("errors", err);
      });
    dispatch(getSchools(response));
  };
  const onFinish = (values) => {
    values.id = nanoid();
    // let userDetails = [values];
    dispatch(createUser(values));
    history.push({
      pathname: "/user-listing",
    });
  };

  useEffect((props) => {
    console.log("dsv", props);
    // dispatch(editUser(props.id));
  }, []);

  return (
    <div className="container">
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
          <DatePicker />
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
          <InputNumber />
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

        <Form.Item label="Hobbies">
          <Checkbox>Reading</Checkbox>
          <Checkbox>Gaming</Checkbox>
          <Checkbox>Traveling</Checkbox>
          <Checkbox>Drawing</Checkbox>
          <Checkbox>other</Checkbox>
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
