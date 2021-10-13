import {
  Form,
  Input,
  Button,
  Checkbox,
  DatePicker,
  Select,
  notification,
  Spin,
  Tag,
  Row,
  Col,
} from "antd";
import "../style/style.css";
import moment from "moment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { CloseCircleOutlined } from "@ant-design/icons";
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
  const dispatch = useDispatch();
  let { id } = useParams();
  const [hobbies, setHobbies] = useState([]);
  const [hobbyOptions, setHobbyOptions] = useState([
    { label: "Reading", value: "Reading" },
    { label: "Gaming", value: "Gaming" },
    { label: "Travelling", value: "Travelling" },
    { label: "Drawing", value: "Drawing" },
  ]);
  const [values, setValues] = useState("");
  const schools = useSelector((state) => state.allSchools.schools.data);
  const userDetails = useSelector((state) => state.createUser.userDetails);
  const user = useSelector((state) => state.createUser.user);
  const [showOtherHobby, setShowOtherHobby] = useState(false);
  const [loader, setLoader] = useState(false);
  const [date, setDate] = useState("");
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
      setLoader(false);
    } else {
      notification.error({
        message: "Failed",
        description: "No schools found",
      });
      setLoader(false);
    }
  };
  const onChangeSelect = (checked) => {
    setHobbies(checked);
  };

  const removeHobby = (i) => {
    let newHobbies = [];
    newHobbies = hobbies.filter((hobby) => hobby !== hobbies[i]);
    setHobbies(newHobbies);
  };

  const onFinish = (values) => {
    if (hobbies.length <= 0) {
      notification.warning({
        message: "Notice",
        description: "Please enter atleast one hobby",
      });
      return;
    }
    if (user != null) {
      Object.assign(values, {
        name: values.name,
        email: values.email,
        phone: values.phoneNumber,
        address: values.address,
        gender: values.gender,
        college: values.college,
        id: user.id,
        hobbies: hobbies,
        birthDate: date ? moment(date).format("DD/MM/YYYY") : user.birthDate,
      });
    }

    dispatch(updateUser(values));
    notification.success({
      message: "Success",
      description: "User Updated Successfully",
    });
    history.push({
      pathname: "/user-listing",
    });
  };
  const goHome = () => {
    history.push({
      pathname: "/user-listing",
    });
  };
  const getHobbyName = (e) => {
    let enteredHobby = "";
    enteredHobby = e.target.value;

    setValues(enteredHobby);
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

  const dateOnChange = (date, dateString) => {
    setDate(dateString);
  };
  const onChangeOtherHobbieCheckbox = () => {
    setShowOtherHobby(!showOtherHobby);
  };

  useEffect(() => {
    dispatch(editUser(id));
    setHobbies(user.hobbies);
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      phoneNumber: user.phone,
      address: user.address,
      gender: user.gender,
      college: user.college,
      birthDate: moment(user.birthDate),
      hobbies: hobbies,
    });
  }, [user, form, id, dispatch]);

  return (
    <div className="container">
      <Spin spinning={loader}>
        <h1>Edit User</h1>
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
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input your 10 digit phone number!",
                pattern: new RegExp("^[2-9]{2}[0-9]{8}$"),
              },
            ]}
          >
            <Input type="number" disabled />
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
          {showOtherHobby ? (
            <Form.Item label="Other Hobbies">
              <Input
                onChange={getHobbyName}
                value={values}
                placeholder="Add a hobby"
                className="toLowerCase"
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
            className="otherHobbyCheckEdit"
          >
            Add more hobbies
          </Checkbox>
          <Form.Item label="Hobbies">
            {" "}
            <div className="mb-10">
              <Tag color="orange">
                Select "Add more hobbies" checkbox to add more hobbies
              </Tag>
            </div>
            <Row gutter={16}>
              {hobbies && hobbies.length && hobbies.length > 0 ? (
                hobbies.map((hobby, i) => (
                  <Col span={6} key={i} className="hobbyRemoveButton">
                    <div>{hobby}</div>
                    <CloseCircleOutlined
                      onClick={() => removeHobby(i)}
                      className="hobbyRemoveIcon"
                    />
                  </Col>
                ))
              ) : (
                <Tag color="red">Please add atleast one hobby</Tag>
              )}
            </Row>
          </Form.Item>

          <Form.Item className="mt-50">
            <Button type="primary" htmlType="submit" className="mr-15">
              Update
            </Button>
            <Button type="danger" onClick={goHome}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
}

export default EditUserDetails;
