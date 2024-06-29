import { BlitzPage } from "@blitzjs/next"
import React from "react"
import Layout from "src/core/layouts/Layout"

const aboutPage: BlitzPage = () => {
  return (
    <Layout title="About">
      <div>This is the about page</div>
    </Layout>
  )
}

export default aboutPage
