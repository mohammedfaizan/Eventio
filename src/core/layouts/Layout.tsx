import Head from "next/head"
import React, { FC } from "react"
import { BlitzLayout, Routes } from "@blitzjs/next"
import { Suspense } from "react"
import { Vertical, Horizontal } from "mantine-layout-components"
import { AppShell, Navbar, Header, Text, Footer, Anchor, Button } from "@mantine/core"
import Link from "next/link"
import { useMutation } from "@blitzjs/rpc"
import logout from "src/auth/mutations/logout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import getCurrentUser from "src/users/queries/getCurrentUser"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  const thisYear = new Date().getFullYear()
  const [logoutMutation] = useMutation(logout)
  const currentUser = getCurrentUser()

  return (
    <>
      <Head>
        <title>{title || "Eventio"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppShell
        padding="md"
        header={
          <Header height={60} p="xs">
            <Horizontal fullH fullW spaceBetween>
              <Anchor
                component={Link}
                href={Routes.Home()}
                fw="bold"
                underline={false}
                color="grey.3"
              >
                Eventio
              </Anchor>

              {currentUser && (
                <Horizontal>
                  <Text>{currentUser.name}</Text>
                  <Button
                    size="xs"
                    variant="light"
                    onClick={async () => {
                      await logoutMutation()
                    }}
                  >
                    Logout
                  </Button>
                </Horizontal>
              )}
            </Horizontal>
          </Header>
        }
        footer={
          <Footer height={60} p="xs">
            <Horizontal fullH fullW center>
              <Text fz="xs" color="dimmed">
                Copyright {thisYear}
              </Text>
            </Horizontal>
          </Footer>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        })}
      >
        {/* Your application here */}
        <Suspense fallback="Loading...">
          <Vertical>{children}</Vertical>
        </Suspense>
      </AppShell>
    </>
  )
}

export default Layout
