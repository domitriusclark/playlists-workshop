import React from "react";
import RegistrationForm from "../Auth/RegistrationForm";
import LoginForm from "../Auth/LoginForm";

const NoAuthLanding = () => {
  return (
    <div>
      <RegistrationForm />
      <LoginForm />
    </div>
  );
};

export default NoAuthLanding;