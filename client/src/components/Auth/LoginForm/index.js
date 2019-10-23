import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        id
      }
    }
  }
`;


export const saveToken = token => {
  localStorage.setItem("Authorization", token);
  return window.location.reload();
};

const LoginForm = () => {
  const [loginValues, setLoginValues] = React.useState({
    email: "",
    password: ""
  });


  const [login] = useMutation(LOGIN, {
    onCompleted: data => {
      return saveToken(data.login.token);
    }
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        login({
          variables: {
            email: loginValues.email,
            password: loginValues.password
          }
        });
      }}
    >
      <input
        onChange={e =>
          setLoginValues({ ...loginValues, email: e.target.value })
        }
      />
      <input
        onChange={e =>
          setLoginValues({ ...loginValues, password: e.target.value })
        }
      />
      <button>Login</button>
    </form>
  );
};


export default LoginForm;