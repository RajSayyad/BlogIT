import React, { useEffect, useState } from "react";

import SignupForm from "components/Authentication/Form/Signup";
import Logger from "js-logger";
import { toast } from "react-toastify";

import authApi from "../../apis/auth";
import orgApi from "../../apis/organizations";

const Signup = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organizations, setOrganizations] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await orgApi.fetch();
        setOrganizations(response.data.organizations);
        Logger.log(response.data.organizations);
      } catch (error) {
        Logger.log(error);
      }
    };
    fetch();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await authApi.signup({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        organization_id: organizationId,
      });
      toast.success(response.message);
      history.push("/dashboard");
    } catch (error) {
      const errorMsg = error.response?.data?.errors?.[0] || "Signup failed";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignupForm
      handleSubmit={handleSubmit}
      loading={loading}
      organizations={organizations}
      setEmail={setEmail}
      setName={setName}
      setOrganizationId={setOrganizationId}
      setPassword={setPassword}
      setPasswordConfirmation={setPasswordConfirmation}
    />
  );
};

export default Signup;
