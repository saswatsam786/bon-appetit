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
import { useEffect, useState } from "react";
import { login } from "../api/auth";

export default function AuthenticationTitle() {
  const router = useRouter();
  const [user] = useAuthState(auth);

  useEffect(() => {
    console.log(user);
    if (user) router.push("/");
  }, [user]);

  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(userData, auth, router);
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
          Do not have an account yet?{" "}
          <Anchor
            size="sm"
            component="button"
            onClick={() => router.push("register")}
          >
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            name="email"
            value={email}
            onChange={handleChangeInput}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            name="password"
            value={password}
            onChange={handleChangeInput}
            mt="md"
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
