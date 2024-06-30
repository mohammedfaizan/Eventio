import Head from "next/head"
import React, { FC } from "react"
import { BlitzLayout, Routes } from "@blitzjs/next"
import { Suspense } from "react"
import { Vertical, Horizontal } from "mantine-layout-components"
import { AppShell, Navbar, Header, Text, Footer, Anchor } from "@mantine/core"
import Link from "next/link"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  const thisYear = new Date().getFullYear()
  return (
    <>
      <Head>
        <title>{title || "Eventio"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppShell
        padding="md"
        navbar={
          <Navbar width={{ base: 300 }} height={500} p="xs">
            {/* Navbar content */}
          </Navbar>
        }
        header={
          <Header height={60} p="xs">
            <Horizontal fullH fullW>
              <Anchor
                component={Link}
                href={Routes.Home()}
                fw="bold"
                underline={false}
                color="grey"
              >
                Eventio
              </Anchor>
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
