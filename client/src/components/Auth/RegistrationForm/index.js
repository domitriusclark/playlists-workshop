import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { LOGIN, saveToken } from "../LoginForm";

const REGISTER = gql`
  mutation Register($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password) {
      id
      email
      password
    }
  }
`;

const RegistrationForm = () => {
  const [userFields, setUserFields] = React.useState({
    username: "",
    email: "",
    password: ""
  });

  const [login] = useMutation(LOGIN, {
    onCompleted: data => saveToken(data.login.token)
  });

  const [register] = useMutation(REGISTER, {
    onCompleted: () => {
      return login({
        variables: {
          email: userFields.email,
          password: userFields.password
        }
      });
    }
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        return register({
          variables: {
            username: userFields.username,
            email: userFields.email,
            password: userFields.password
          }
        });
      }}
    >
      <input
        onChange={e =>
          setUserFields({ ...userFields, username: e.target.value })
        }
        placeholder="Username"
      />
      <input
        onChange={e => setUserFields({ ...userFields, email: e.target.value })}
        placeholder="email"
      />
      <input
        onChange={e =>
          setUserFields({ ...userFields, password: e.target.value })
        }
        placeholder="password"
      />
      <button>Sign Up</button>
    </form>
  );
};

export default RegistrationForm;