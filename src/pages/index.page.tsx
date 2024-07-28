import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { AuthenticationForm } from "src/core/components/MainAuthenticationForm"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import getCurrentUser from "src/users/queries/getCurrentUser"
import { Vertical } from "mantine-layout-components"
import { Button } from "@mantine/core"
import { useMutation } from "@blitzjs/rpc"
import adminOnlyMutation from "src/auth/mutations/adminOnlyMutation"

const Home: BlitzPage = () => {
  const currentUser = useCurrentUser()

  const [$adminOnlyMutation] = useMutation(adminOnlyMutation)

  return (
    <Layout title="Home">
      {currentUser && (
        <Vertical>
          {currentUser.isAdmin && (
            <Button
              onClick={() => {
                $adminOnlyMutation({})
              }}
            >
              Admin only
            </Button>
          )}
        </Vertical>
      )}
      {currentUser && (
        <Vertical center fullH fullW>
          <AuthenticationForm />
        </Vertical>
      )}
    </Layout>
  )
}

export default Home
