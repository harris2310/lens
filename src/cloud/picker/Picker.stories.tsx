import { Picker } from "./Picker"
import { Icon } from "../../components/icon/Icon"

const ownedProjects = [
  { id: "1", title: "My Project" },
  { id: "2", title: "Aqua Iron Pomeranian" },
  { id: "3", title: "Blue Copper Fox Terrier" },
]
const collaborations = [
  { id: "4", title: "Yellow Platinum Mimosa" },
  { id: "6", title: "White Bronze Daffodil" },
  { id: "7", title: "Black Yellow Rose" },
  { id: "8", title: "Copper Green Curtain" },
  { id: "9", title: "Red Blue Rock" },
  { id: "10", title: "Orange Sage Water" },
]

export const Default = (props) => {
  const onChange = (val) => {
    console.log(val)
  }

  return (
    <Picker.Container
      name="projectPicker"
      onSelectionChange={onChange}
      defaultSelectedKey="1"
    >
      {ownedProjects && (
        <Picker.Section title="Your projects">
          {ownedProjects.map((project) => (
            <Picker.Item key={project.id}>{project.title}</Picker.Item>
          ))}
        </Picker.Section>
      )}
      {collaborations && (
        <Picker.Section title="Collaborations">
          {collaborations.map((project) => (
            <Picker.Item key={project.id}>{project.title}</Picker.Item>
          ))}
        </Picker.Section>
      )}

      <Picker.Footer>
        <div className="text-gray-800">
          <div className="flex">
            <a
              href="https://prisma.io"
              target="_blank"
              className="text-sm flex items-center p-2 w-full"
            >
              <Icon name="folder" size="sm" className="mr-2" />
              <span>View all projects</span>
            </a>
          </div>
          <div className="flex ">
            <a
              href="https://prisma.io"
              target="_blank"
              className="text-sm flex items-center p-2 w-full"
            >
              <Icon name="plus-circle" size="sm" className="mr-2" />
              <span>Create new project</span>
            </a>
          </div>
        </div>
      </Picker.Footer>
    </Picker.Container>
  )
}

Default.storyName = "[Controlled]"
export default {
  title: "Cloud/Picker",
  component: Picker,
  parameters: {
    layout: "padded",
  },
}

export const Primary = () => (
  <Picker.Container
    name="projectPicker"
    onSelectionChange={(val) => {
      console.log(val)
    }}
    defaultSelectedKey="1"
    variant="primary"
  >
    {ownedProjects && (
      <Picker.Section title="Your projects">
        {ownedProjects.map((project) => (
          <Picker.Item key={project.id}>{project.title}</Picker.Item>
        ))}
      </Picker.Section>
    )}
    {collaborations && (
      <Picker.Section title="Collaborations">
        {collaborations.map((project) => (
          <Picker.Item key={project.id}>{project.title}</Picker.Item>
        ))}
      </Picker.Section>
    )}

    <Picker.Footer>
      <div className="text-gray-800">
        <div className="flex mb-3">
          <Icon name="folder" size="sm" className="mr-2" />
          <a href="https://prisma.io" target="_blank" className="text-sm">
            View all projects
          </a>
        </div>
        <div className="flex">
          <Icon name="plus-circle" size="sm" className="mr-2" />
          <a href="https://prisma.io" target="_blank" className="text-sm">
            Create new project
          </a>
        </div>
      </div>
    </Picker.Footer>
  </Picker.Container>
)

export const Secondary = () => (
  <Picker.Container
    name="projectPicker"
    onSelectionChange={(val) => {
      console.log(val)
    }}
    defaultSelectedKey="1"
    variant="secondary"
  >
    {ownedProjects && (
      <Picker.Section title="Your projects">
        {ownedProjects.map((project) => (
          <Picker.Item key={project.id}>{project.title}</Picker.Item>
        ))}
      </Picker.Section>
    )}
    {collaborations && (
      <Picker.Section title="Collaborations">
        {collaborations.map((project) => (
          <Picker.Item key={project.id}>{project.title}</Picker.Item>
        ))}
      </Picker.Section>
    )}

    <Picker.Footer>
      <div className="text-gray-800">
        <div className="flex mb-3">
          <Icon name="folder" size="sm" className="mr-2" />
          <a href="https://prisma.io" target="_blank" className="text-sm">
            View all projects
          </a>
        </div>
        <div className="flex">
          <Icon name="plus-circle" size="sm" className="mr-2" />
          <a href="https://prisma.io" target="_blank" className="text-sm">
            Create new project
          </a>
        </div>
      </div>
    </Picker.Footer>
  </Picker.Container>
)

export const EmptyWithPlaceholder = () => (
  <Picker.Container
    name="projectPicker"
    onSelectionChange={(val) => {
      console.log(val)
    }}
    defaultSelectedKey="0"
    placeholder="Select environment"
    variant="primary"
  >
    {ownedProjects && (
      <Picker.Section title="Your projects">
        {ownedProjects.map((project) => (
          <Picker.Item key={project.id}>{project.title}</Picker.Item>
        ))}
      </Picker.Section>
    )}
    {collaborations && (
      <Picker.Section title="Collaborations">
        {collaborations.map((project) => (
          <Picker.Item key={project.id}>{project.title}</Picker.Item>
        ))}
      </Picker.Section>
    )}

    <Picker.Footer>
      <div className="text-gray-800">
        <div className="flex mb-3">
          <Icon name="folder" size="sm" className="mr-2" />
          <a href="https://prisma.io" target="_blank" className="text-sm">
            View all projects
          </a>
        </div>
        <div className="flex">
          <Icon name="plus-circle" size="sm" className="mr-2" />
          <a href="https://prisma.io" target="_blank" className="text-sm">
            Create new project
          </a>
        </div>
      </div>
    </Picker.Footer>
  </Picker.Container>
)

export const WithChildNodes = () => (
  <Picker.Container
    name="projectPicker"
    onSelectionChange={(val) => {
      console.log(val)
    }}
    defaultSelectedKey="1"
    variant="primary"
  >
    {ownedProjects && (
      <Picker.Section title="Your projects">
        {ownedProjects.map((project) => (
          <Picker.Item
            key={project.id}
            aria-label={project.title}
            textValue={project.title}
            hasChildItems
          >
            {({ isSelected, isFocused }) => (
              <>
                <span
                  className={`overflow-ellipsis overflow-hidden whitespace-nowrap ${
                    isFocused || isSelected ? "flex-shrink" : "flex-shrink-0"
                  }`}
                >
                  {project.title}
                </span>
                <span
                  className={`uppercase font-semibold text-xs leading-none px-1.5 py-1 rounded bg-green-100 text-green-800 ${
                    isFocused || isSelected ? "visible" : "invisible"
                  }`}
                >
                  Free
                </span>
              </>
            )}
          </Picker.Item>
        ))}
      </Picker.Section>
    )}
    {collaborations && (
      <Picker.Section title="Collaborations">
        {collaborations.map((project) => (
          <Picker.Item key={project.id}>{project.title}</Picker.Item>
        ))}
      </Picker.Section>
    )}

    <Picker.Footer>
      <div className="text-gray-800">
        <div className="flex mb-3">
          <Icon name="folder" size="sm" className="mr-2" />
          <a href="https://prisma.io" target="_blank" className="text-sm">
            View all projects
          </a>
        </div>
        <div className="flex">
          <Icon name="plus-circle" size="sm" className="mr-2" />
          <a href="https://prisma.io" target="_blank" className="text-sm">
            Create new project
          </a>
        </div>
      </div>
    </Picker.Footer>
  </Picker.Container>
)
