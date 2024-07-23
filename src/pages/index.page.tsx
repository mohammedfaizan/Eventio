import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { AuthenticationForm } from "src/core/components/MainAuthenticationForm"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import getCurrentUser from "src/users/queries/getCurrentUser"

const Home: BlitzPage = () => {
  const currentUser = getCurrentUser()

  return <Layout title="Home">{currentUser && <AuthenticationForm />}</Layout>
}

export default Home
