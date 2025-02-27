import React, { useRef } from "react"
import cn from "classnames"
import { chain } from "@react-aria/utils"
import { SelectState, useSelectState } from "@react-stately/select"
import { Item, Section } from "@react-stately/collections"
import { Node } from "@react-types/shared"
import { useListBox, useListBoxSection, useOption } from "@react-aria/listbox"
import {
  DismissButton,
  OverlayContainer,
  useOverlay,
  useOverlayPosition,
} from "@react-aria/overlays"
import { useButton } from "@react-aria/button"
import { FocusScope } from "@react-aria/focus"
import { mergeProps } from "@react-aria/utils"
import { Icon } from "../../components/icon/Icon"
import { Button, ButtonProps } from "../../components/button/Button"

export type ProjectId = string
export type Project = {
  id: ProjectId
  title: string
}

type ProjectPickerProps = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  ownedProjects: Project[]
  collaboratedProjects: Project[]
  selectedKey: ProjectId
  onSelectionChange?: (key: React.Key) => void
  /** The action of the Button at the end **/
  overlayButtonAction?: { title: string; onPress: ButtonProps["onPress"] }
}

export function ProjectPicker({
  id,
  ownedProjects,
  collaboratedProjects,
  selectedKey,
  onSelectionChange,
  overlayButtonAction,
}: ProjectPickerProps) {
  const children = []
  if (ownedProjects.length > 0) {
    children.push(
      <Section
        title="Your projects"
        items={ownedProjects.sort(
          (
            a: { id: string; title: string },
            b: { id: string; title: string }
          ) => a.title.localeCompare(b.title)
        )}
      >
        {(project) => <Item key={project.id}>{project.title}</Item>}
      </Section>
    )
  }

  if (collaboratedProjects.length > 0) {
    children.push(
      <Section
        title="Collaborations"
        items={collaboratedProjects.sort(
          (
            a: { id: string; title: string },
            b: { id: string; title: string }
          ) => a.title.localeCompare(b.title)
        )}
      >
        {(project) => <Item key={project.id}>{project.title}</Item>}
      </Section>
    )
  }

  const state = useSelectState<Project>({
    children,
    selectedKey,
    onSelectionChange,
  })

  const buttonRef = useRef<HTMLButtonElement>(null)
  const { buttonProps } = useButton(
    { onPress: () => state.toggle() },
    buttonRef
  )

  return (
    <>
      <div
        id={id}
        ref={buttonRef}
        {...buttonProps}
        className={cn("flex space-x-2 appearance-none", {
          "cursor-pointer": children.length > 0,
        })}
      >
        <Icon
          name="prisma"
          size="lg"
          className={cn(
            "flex items-center justify-center p-2",
            "rounded-full",
            "bg-gray-700",
            "text-gray-400 dark:text-gray-300"
          )}
        />

        {children.length > 0 && selectedKey && (
          <button className="flex items-center space-x-2">
            <span
              lens-role="active-project"
              className="text-md font-medium text-gray-800 dark:text-gray-100"
            >
              {state.selectedItem.rendered}
            </span>
            <Icon
              name="triangle-down"
              size="xs"
              className="ml-4 text-gray-400 dark:text-gray-300"
            />
          </button>
        )}
      </div>

      {children.length > 0 && state.isOpen && (
        <ProjectPickerOverlay
          id={id}
          state={state}
          buttonRef={buttonRef}
          action={overlayButtonAction}
        />
      )}
    </>
  )
}

type ProjectPickerOverlayProps = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** The global Select state */
  state: SelectState<Project>
  /** Ref of the Select button */
  buttonRef: React.RefObject<HTMLButtonElement>
  /** The action of the Button at the end **/
  action?: { title: string; onPress: ButtonProps["onPress"] }
}

function ProjectPickerOverlay({
  id,
  state,
  buttonRef,
  action,
}: ProjectPickerOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const { overlayProps } = useOverlay(
    {
      isDismissable: true,
      shouldCloseOnBlur: true,
      onClose: state.close,
    },
    overlayRef
  )
  const { overlayProps: positionProps, placement } = useOverlayPosition({
    overlayRef,
    targetRef: buttonRef,
    offset: 8,
    containerPadding: 0,
    onClose: state.close,
  })
  // Figure out button dimensions so we can size the overlay
  const buttonDimensions = buttonRef.current?.getBoundingClientRect()

  const listBoxRef = useRef<HTMLUListElement>(null)
  const { listBoxProps } = useListBox(
    {
      id,
      disallowEmptySelection: true,
      autoFocus: state.focusStrategy || true,
    },
    state,
    listBoxRef
  )

  return (
    <OverlayContainer>
      <FocusScope autoFocus restoreFocus contain>
        <div
          lens-role="project-picker-body"
          ref={overlayRef}
          {...mergeProps(overlayProps, positionProps)}
          style={{
            ...positionProps.style,
            left: buttonDimensions?.left,
            width: buttonDimensions?.width,
          }}
        >
          <DismissButton onDismiss={state.close} />
          <ul
            ref={listBoxRef}
            {...listBoxProps}
            className={cn("menu w-full", {
              "animate-slide-bottom": placement === "top",
              "animate-slide-top": placement === "bottom",
            })}
          >
            {[...state.collection].map((section) => (
              <ProjectPickerSection
                key={section.key}
                title={section.rendered as string}
                state={state}
                section={section}
              />
            ))}
            {action && (
              <li className="flex mt" lens-role="project-picker-action">
                <Button
                  variant="primary"
                  autoFocus={false}
                  onPress={chain(state.close, action.onPress)}
                  fillParent
                >
                  {action.title}
                </Button>
              </li>
            )}
          </ul>
          <DismissButton onDismiss={state.close} />
        </div>
      </FocusScope>
    </OverlayContainer>
  )
}

type ProjectPickerSectionProps = {
  /** Title for this Section */
  title: string
  /** A group of similar options, only visual */
  section: Node<Project>
  /** The global Select state */
  state: SelectState<Project>
}

function ProjectPickerSection({
  title,
  section,
  state,
}: ProjectPickerSectionProps) {
  const {
    groupProps,
    headingProps,
    itemProps: optionProps,
  } = useListBoxSection({
    heading: title,
  })

  return (
    <section
      lens-role="project-picker-section"
      {...groupProps}
      className={cn("p-2")}
    >
      <div
        {...headingProps}
        className={cn(
          "mb-2",
          "text-xs uppercase text-gray-500 dark:text-gray-400",
          "select-none"
        )}
      >
        {title}
      </div>
      <li {...optionProps}>
        <ul>
          {[...section.childNodes].map((option) => (
            <ProjectPickerOption
              key={option.key}
              option={option}
              state={state}
            />
          ))}
        </ul>
      </li>
    </section>
  )
}

type ProjectPickerOptionProps = {
  /** The option to render */
  option: Node<Project>
  /** The global Select state */
  state: SelectState<Project>
}

/** A single Select Option */
function ProjectPickerOption({ option, state }: ProjectPickerOptionProps) {
  const ref = useRef<HTMLLIElement>(null)

  const isFocused = state.selectionManager.focusedKey === option.key
  const isSelected = state.selectedKey === option.key
  const { optionProps } = useOption(
    {
      key: option.key,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: true,
    },
    state,
    ref
  )

  return (
    <li
      ref={ref}
      lens-role="project-picker-option"
      {...optionProps}
      className={cn(
        "rounded-md px-2 py-1",
        "cursor-default whitespace-nowrap",
        {
          "bg-gray-100 dark:bg-gray-800": isFocused,
          "font-medium": isSelected,
        },
        "hover:bg-gray-100"
      )}
    >
      {option.rendered}
    </li>
  )
}
