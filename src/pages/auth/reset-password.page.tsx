import Layout from "src/core/layouts/Layout"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import resetPassword from "src/auth/mutations/resetPassword"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Link from "next/link"
import { assert } from "blitz"
import { useForm } from "@mantine/form"
import { Button, PasswordInput } from "@mantine/core"

const ResetPasswordPage: BlitzPage = () => {
  const router = useRouter()
  const token = router.query.token?.toString()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  const form = useForm({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },

    validate: {},
  })

  let onSubmit = async (values) => {
    try {
      assert(token, "token is required.")
      await resetPasswordMutation({ ...values, token })
    } catch (error: any) {
      if (error.name === "ResetPasswordError") {
        return {
          [FORM_ERROR]: error.message,
        }
      } else {
        return {
          [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
        }
      }
    }
  }

  return (
    <div>
      <h1>Set a New Password</h1>

      {isSuccess ? (
        <div>
          <h2>Password Reset Successfully</h2>
          <p>
            Go to the <Link href={Routes.Home()}>homepage</Link>
          </p>
        </div>
      ) : (
        <form onSubmit={form.onSubmit(onSubmit)}>
          <PasswordInput
            withAsterisk
            label="Password"
            placeholder=""
            {...form.getInputProps("password")}
          />

          <PasswordInput
            withAsterisk
            label="Password Confirmation"
            placeholder=""
            {...form.getInputProps("PasswordConfirmation")}
          />

          <Button type="submit">Submit</Button>
        </form>
      )}
    </div>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/"
ResetPasswordPage.getLayout = (page) => <Layout title="Reset Your Password">{page}</Layout>

export default ResetPasswordPage
