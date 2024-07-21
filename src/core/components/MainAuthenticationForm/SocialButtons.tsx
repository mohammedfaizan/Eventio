import { Button, ButtonProps, Group } from "@mantine/core"
import { GithubIcon, DiscordIcon, TwitterIcon } from "@mantinex/dev-icons"
import { GoogleIcon } from "./icons/GoogleIcon"
import { FacebookIcon } from "./icons/FacebookIcon"
import classes from "./SocialButtons.module.css"

export function GoogleButton(props: ButtonProps & React.ComponentPropsWithoutRef<"button">) {
  return <Button leftIcon={<GoogleIcon />} variant="default" {...props} />
}

export function FacebookButton(props: ButtonProps & React.ComponentPropsWithoutRef<"button">) {
  return <Button leftIcon={<FacebookIcon />} className={classes.facebookButton} {...props} />
}

export function DiscordButton(props: ButtonProps & React.ComponentPropsWithoutRef<"button">) {
  return (
    <Button
      className={classes.discordButton}
      leftIcon={<DiscordIcon width="1rem" height="1rem" />}
      {...props}
    />
  )
}

// Twitter button as anchor
export function TwitterButton(props: ButtonProps & React.ComponentPropsWithoutRef<"a">) {
  return (
    <Button
      component="a"
      leftIcon={<TwitterIcon width="1rem" height="1rem" color="#00ACEE" />}
      variant="default"
      {...props}
    />
  )
}

export function GithubButton(props: ButtonProps & React.ComponentPropsWithoutRef<"button">) {
  return (
    <Button
      {...props}
      leftIcon={<GithubIcon width="1rem" height="1rem" />}
      className={classes.githubButton}
    />
  )
}

export function SocialButtons() {
  return (
    <Group position="center" p="md">
      <GoogleButton>Continue with Google</GoogleButton>
      <TwitterButton href="https://twitter.com/mantinedev" target="_blank">
        Follow on Twitter
      </TwitterButton>
      <FacebookButton>Sign in with Facebook</FacebookButton>
      <GithubButton>Login with GitHub</GithubButton>
      <DiscordButton>Join Discord community</DiscordButton>
    </Group>
  )
}
