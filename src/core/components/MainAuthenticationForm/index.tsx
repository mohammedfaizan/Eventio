import { useToggle, upperFirst } from "@mantine/hooks"
import { useForm } from "@mantine/form"
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core"
//import { GoogleButton } from "./SocialButtons"
//import { TwitterButton } from "./SocialButtons"
import { useMutation } from "@blitzjs/rpc"
import login from "src/auth/mutations/login"
import signup from "src/auth/mutations/signup"
import { FORM_ERROR } from "../Form"
import { AuthenticationError } from "blitz"

export function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(["login", "register"])
  const [loginMutation] = useMutation(login)
  const [signupMutation] = useMutation(signup)

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) => (val.length <= 6 ? "Password should include at least 6 characters" : null),
    },
  })

  let onSignUp = async (values) => {
    try {
      await signupMutation(values)
    } catch (error: any) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        // This error comes from Prisma
        return { email: "This email is already being used" }
      } else {
        return { [FORM_ERROR]: error.toString() }
      }
    }
  }

  let onLogin = async (values) => {
    try {
      const user = await loginMutation(values)
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
      } else {
        return {
          [FORM_ERROR]:
            "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
        }
      }
    }
  }

  const onSubmit = (values) => {
    if (type === "login") {
      onLogin(values)
    } else {
      onSignUp(values)
    }
  }

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={600}>
        Welcome to Eventio, {type} with
      </Text>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack>
          {type === "register" && (
            <TextInput
              required
              label="Name"
              placeholder="Your name"
              {...form.getInputProps("name")}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            {...form.getInputProps("email")}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            {...form.getInputProps("password")}
            radius="md"
          />

          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue("terms", event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  )
}
