import React, { useState } from "react";
import { Form, Input, Typography } from "antd";
import Plane from "../assets/planeflat.jpg";
import StandardButton from "../components/custom/StandardButton";
import { useNavigate } from "react-router-dom";
import Popup from "../components/custom/ToastPopup";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const onFinish = (values: { username: string; password: string }) => {
    if (values.username === "admin" && values.password === "admin") {
      setError(false);
      sessionStorage.setItem("isAuthenticated", "true");
      navigate("/orders");
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen ">
      <Form
        name="login"
        initialValues={{ remember: true }}
        size="large"
        style={{ padding: "1.5rem" }}
        className="w-1/4 bg-white p-16  border border-gray-200 rounded-lg "
        onFinish={onFinish}
      >
        <Form.Item>
          <img src={Plane} alt="Plane" className="w-48  mx-auto mb-8" />
        </Form.Item>

        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input //prefix={<UserOutlined />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input //prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <StandardButton
            name="Log in"
            type="submit"
            customStyles="mt-4 w-full text-center bg-green-500 hover:bg-green-700 text-white"
          />
        </Form.Item>
        <Form.Item>
          <Typography className="text-center font-semibold">
            Continue with Google
          </Typography>
        </Form.Item>
      </Form>
      <Popup
        isOpen={error}
        onClose={() => {
          setError(false);
        }}
      >
        <Typography.Title level={5} type="danger">
          Login Failed
        </Typography.Title>
        <Typography.Text type="danger">
          Credentials Invalid. Please try again
        </Typography.Text>
      </Popup>
    </div>
  );
};

export default LoginPage;
