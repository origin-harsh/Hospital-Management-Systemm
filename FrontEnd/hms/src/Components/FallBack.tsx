import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { HomeOutlined, ArrowLeftOutlined, FrownOutlined } from "@ant-design/icons";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <FrownOutlined style={{ fontSize: "64px", color: "#1890ff" }} />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-gray-800">404</h1>
        <h2 className="text-xl font-semibold text-gray-600 mt-2">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-500 mt-4">
          Oops! The page you are looking for doesn’t exist or has been moved.
          <br />
          Please check the URL or return to dashboard.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="filled"
            color="blue"
            leftSection={<HomeOutlined />}
            onClick={() => navigate("/")}
          >
            Go Dashboard
          </Button>

          <Button
            variant="light"
            leftSection={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
