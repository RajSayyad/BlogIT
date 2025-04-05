import React, { useState } from "react";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import LoginForm from "components/Authentication/Form/Login";
import { toast } from "react-toastify";

import { setToLocalStorage } from "../../utils/storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    localStorage.clear();
    event.preventDefault();
    setLoading(true);
    try {
      const response = await authApi.login({ email, password });
      setToLocalStorage({
        authToken: response.data.auth_token,
        email: email.toLowerCase(),
        userId: response.data.user.id,
        userName: response.data.user.name,
      });
      toast.success(response.data.message);
      setAuthHeaders();
      window.location.href = "/";
    } catch (error) {
      toast.error(error.response.data.error[0]);
      setLoading(false);
    }
  };

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      loading={loading}
      setEmail={setEmail}
      setPassword={setPassword}
    />
  );
};

export default Login;
