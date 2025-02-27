import { action } from "@storybook/addon-actions"
import { AvatarProps } from "../avatar/Avatar"
import { StackedAvatar } from "./StackedAvatar"

const avatars: AvatarProps[] = [
  {
    label: "Lens user 1",
    url: "/avatar1.png",
    name: "Lens user 1",
    email: "user1@prisma.io",
  },
  {
    label: "Lens user 2",
    url: "/avatar2.png",
    name: "Lens user 2",
    email: "user2@prisma.io",
  },
  {
    label: "Lens user 3",
    url: "/avatar3.png",
    name: "Lens user 3",
    email: "user3@prisma.io",
  },
  {
    label: "Lens user 4",
    url: "/avatar4.png",
    name: "Lens user 4",
    email: "user4@prisma.io",
  },
  {
    label: "Lens user 5",
    url: "/avatar10.png",
    name: "Lens user 5",
    email: "user5@prisma.io",
  },
  {
    label: "Lens user 6",
    url: "/avatar6.png",
    name: "Lens user 6",
    email: "user6@prisma.io",
  },
]

export const Default = (props) => (
  <StackedAvatar avatars={avatars.slice(0, 5)} onPress={action("onPress")} />
)
Default.storyName = "[Controlled]"
export default {
  title: "Lens/StackedAvatar",
  component: StackedAvatar,
  argTypes: {
    size: {
      options: ["xs", "sm", "md", "lg", "xl"],
      control: {
        type: "inline-radio",
      },
      defaultValue: "lg",
    },
  },
}

export const MediumSize = () => (
  <div className="flex flex-col items-center space-y-4">
    <StackedAvatar size="md" avatars={avatars.slice(0, 5)} />
  </div>
)

export const WithTruncation = () => <StackedAvatar avatars={avatars} />
