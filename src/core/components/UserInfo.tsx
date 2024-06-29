import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { useMutation } from "@blitzjs/rpc"
import logout from "src/auth/mutations/logout"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { Button } from "@mantine/core"

export const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Button component={Link} href={Routes.SignupPage()}>
          <strong>Sign Up</strong>
        </Button>
        <Button component={Link} href={Routes.LoginPage()}>
          <strong>Login</strong>
        </Button>
      </>
    )
  }
}
