import { useEffect, useState } from "react";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { createAccount } from "../api/auth";

export default function AuthenticationTitle() {
  const router = useRouter();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  const initialState = {
    name: "",
    email: "",
    password: "",
  };

  const [userData, setUserData] = useState(initialState);
  const { name, email, password } = userData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    createAccount(userData, auth, router);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Have an account yet?{" "}
          <Anchor
            size="sm"
            component="button"
            onClick={() => router.push("login")}
          >
            Log In
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Name"
            placeholder="Your name"
            required
            name="name"
            value={name}
            onChange={handleChangeInput}
          />

          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            mt="md"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
          </Group>
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </Container>
    </form>
  );
}
