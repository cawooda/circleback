import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";

import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Home from "./pages/Home";

import { AuthProvider, useAuth } from "@/context/AuthContext";

import { ColorModeButton } from "@/components/ui/color-mode";

function App() {
  const { user, loading, signOutUser } = useAuth();
  if (loading) return <>Loading...</>;
  return (
    <>
      <AuthProvider>
        <Container>
          <Flex direction="column">
            <Flex direction="row" justify="space-between" align="center" py={4}>
              <ColorModeButton />
              <Text fontSize="1xl" fontWeight="bold">
                React Firebase Chakra Starter
              </Text>
              <LoginForm />
            </Flex>

            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            <Outlet />
          </Flex>
        </Container>
      </AuthProvider>
    </>
  );
}

export default App;
