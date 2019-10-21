import React from "react";
import gql from "graphql-tag";

import { useMutation } from "@apollo/react-hooks";

const LOGOUT = gql`
  mutation {
    logout {
      message
    }
  }
`;

const clearSession = () => {
  localStorage.removeItem("Authorization");
  return window.location.reload();
};

const LogoutButton = () => {
  const [logout] = useMutation(LOGOUT, {
    onCompleted: () => {
      return clearSession();
    }
  });
  return <button onClick={logout}>Logout</button>;
};

export default LogoutButton;