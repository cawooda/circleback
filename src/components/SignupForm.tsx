import {
  Field,
  Input,
  Button,
  Heading,
  Image,
  Flex,
  Text,
} from "@chakra-ui/react";
import Logo from "../assets/logo.png";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

import { Link } from "react-router-dom";

// Define types for form fields and data

type SignupFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  onSubmit?: () => void;
};

// Configuration for the login form fields
const formFieldsConfig: SignupFormFields = {
  firstName: {
    label: "First Name",
    type: "text",
    placeholder: "Your first name",
    required: true,
  },
  lastName: {
    label: "Last Name",
    type: "text",
    placeholder: "Your last name",
    required: true,
  },
  email: {
    label: "Email",
    type: "email",
    placeholder: "your@email.address",
    required: true,
  },
  password: {
    label: "Password",
    type: "password",
    placeholder: "Your secure password",
    required: true,
  },
  submit: {
    label: "Sign Up",
    type: "submit",
  },
};

const signupFormData: SignupFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

// LoginForm component

function SignupForm() {
  const { signUp } = useAuth();
  const [fields, setFields] = useState(signupFormData);
  const [signUpError, setSignUpError] = useState("");
  function googleSignUp() {
    alert("Google Sign Up not implemented yet");
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFields({
      ...fields,
      [name as keyof SignupFormData]: value,
    });
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    const signUpResult = await signUp(fields.email, fields.password);
    if (signUpResult && "error" in signUpResult && signUpResult.error) {
      console.log("Sorry:", signUpResult.error);
      setSignUpError(signUpResult.error);
    } else {
      setSignUpError("");
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="100vh"
      width="100vw"
    >
      <Image src={Logo} alt="Logo" width="10vw" pb={3} />
      <Heading mb={6}>Sign Up</Heading>
      <form key="signup-form" onSubmit={handleFormSubmit}>
        {Object.entries(formFieldsConfig).map(([name, config]) => {
          console.log(name, config);
          if (name !== "submit") {
            return (
              <Field.Root key={name} mb={4}>
                <Field.Label mb={2} htmlFor={name}>
                  {config.label}
                </Field.Label>
                <Input
                  name={name}
                  onChange={handleInputChange}
                  type={config.type}
                  placeholder={config.placeholder}
                  required={config.required}
                />
              </Field.Root>
            );
          } else {
            return (
              <Flex key="form-actions" direction="column" align="center">
                <Text color="red.500" mb={2} fontSize="5sm">
                  {signUpError}
                </Text>
                <Button type="submit" variant="outline">
                  {config.label}
                </Button>
                <Text mt={4} fontSize="sm">
                  Have an account?
                  <Link
                    to="/login"
                    style={{ color: "blue.500", textDecoration: "underline" }}
                  >
                    Login
                  </Link>
                </Text>

                <Button
                  onClick={googleSignUp}
                  style={{ textDecoration: "none" }}
                  type="button"
                  variant="outline"
                >
                  Sign in with Google
                </Button>
              </Flex>
            );
          }
        })}
      </form>
    </Flex>
  );
}

export default SignupForm;
