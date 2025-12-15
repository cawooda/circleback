import {
  Field,
  Input,
  Button,
  Heading,
  Image,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

// Define types for form fields and data
type LoginFormFields = {
  [key: string]: {
    label: string;
    type: string;
    placeholder?: string;
    required?: boolean;
  };
};

type LoginFormData = {
  first?: string;
  last?: string;
  email: string;
  password: string;
  onSubmit?: () => void;
};

// Configuration for the login form fields
const formFieldsConfig: LoginFormFields = {
  first: {
    label: "First Name",
    type: "text",
    placeholder: "Your first name",
    required: false,
  },
  last: {
    label: "Last Name",
    type: "text",
    placeholder: "Your last name",
    required: false,
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
    label: "Login",
    type: "submit",
  },
};

const loginFormData: LoginFormData = {
  first: "",
  last: "",
  email: "",
  password: "",
};

function LoginForm() {
  const [signUpStatus, setSignUpStatus] = useState(false);
  const { user, signIn, signUp, error, clearError, signOutUser } = useAuth();
  const [fields, setFields] = useState(loginFormData);
  const [signInError, setSignInError] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFields({
      ...fields,
      [name as keyof LoginFormData]: value,
    });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (fields.first && fields.last && signUpStatus) {
      const signInResult = await signUp(
        fields.first,
        fields.last,
        fields.email,
        fields.password
      );
      if (signInResult && "error" in signInResult) {
        setSignInError(signInResult.error);
      } else {
        setSignInError("");
        clearError(); // Clear any previous errors on successful sign-in
      }
      return;
    }

    const signInResult = await signIn(fields.email, fields.password);
    if (signInResult && "error" in signInResult) {
      setSignInError(signInResult.error);
    } else {
      setSignInError("");
      clearError(); // Clear any previous errors on successful sign-in
    }
  };

  if (user) {
    return (
      <Flex
        direction="column"
        align="flex-start"
        alignItems="flex-start"
        justify="center"
      >
        <Button onClick={signOutUser}>Sign Out</Button>
      </Flex>
    );
  }

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align="center"
      justify="center"
      height="100vh"
      width="100vw"
    >
      <Flex direction="column" align="center" height={"100vh"} mb={8} gap="2">
        <Image src={Logo} alt="Logo" width="10vh" pb={3} />
        <Heading mb={6}>{signUpStatus ? "Sign Up" : "Login"}</Heading>
        <Text mt={4} fontSize="sm">
          {signUpStatus
            ? "Don't have an account? "
            : "Already have an account? "}
          <Link
            to="#"
            onClick={() => setSignUpStatus((prev) => !prev)}
            style={{ color: "blue.500", textDecoration: "underline" }}
          >
            {signUpStatus ? "Login" : "Sign Up"}
          </Link>
        </Text>

        <form key="login-form" onSubmit={handleFormSubmit}>
          {Object.entries(formFieldsConfig).map(([name, config]) => {
            console.log(name, config);
            if (name === "first" || name === "last") {
              if (!signUpStatus) return null;
            }

            if (name !== "submit") {
              return (
                <>
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
                </>
              );
            } else {
              return (
                <Flex key="form-actions" direction="column" align="center">
                  <Text color="red.500" mb={2} fontSize="5sm">
                    {error?.message || signInError}
                  </Text>

                  <Button type="submit" variant="outline">
                    {config.label}
                  </Button>
                  <Button
                    mt={4}
                    type="button"
                    variant="outline"
                    backgroundColor={"red.300"}
                    onClick={() => alert("Google Sign-In not implemented yet")}
                  >
                    Sign in with Google
                  </Button>
                </Flex>
              );
            }
          })}
        </form>
      </Flex>
    </Flex>
  );
}

export default LoginForm;
