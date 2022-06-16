import React from "react"
import cn from "classnames"
import { useSelectState } from "@react-stately/select"
import { useSelect, HiddenSelect } from "@react-aria/select"
import { Icon } from "../../components/icon/Icon"
import { FocusRing } from "../../components/focus-ring/FocusRing"

import { useFocusRing } from "@react-aria/focus"
import { mergeProps } from "@react-aria/utils"
import { useButton } from "@react-aria/button"

import { ListBox } from "./ListBox"
import { Popover } from "./Popover"

import { PickerFooter } from "./PickerFooter"
import { Item, Section } from "@react-stately/collections"

type PickerProps = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** Children */
  children: any
  /** name value for native html components */
  name: string
  /** Controls what kind of picker this is */
  variant?: "primary" | "secondary"
  /** The current selection */
  selectedKey?: React.Key
  /** A required default selected key */
  defaultSelectedKey: string
  /** A value to display in the Field when it is empty */
  placeholder?: string
  /** Callback invoked when the Select's selection changes */
  onSelectionChange?: (key: React.Key) => void
}

const PickerContainer = ({
  id,
  children,
  name,
  variant,
  defaultSelectedKey,
  selectedKey,
  placeholder,
  onSelectionChange,
}: PickerProps) => {
  let body = children
  let footer = null

  const lastChild = children[children.length - 1]
  if (lastChild?.type === PickerFooter) {
    body = children.slice(0, children.length - 1)
    footer = lastChild
  }

  let state = useSelectState({
    children: body,
    defaultSelectedKey: defaultSelectedKey,
    selectedKey: selectedKey,
    onSelectionChange: onSelectionChange,
  })

  let ref = React.useRef(null)
  let { triggerProps, valueProps, menuProps } = useSelect(
    {
      children: children,
      selectedKey: selectedKey,
      defaultSelectedKey: defaultSelectedKey,
      onSelectionChange: onSelectionChange,
    },
    state,
    ref
  )

  let { buttonProps } = useButton(triggerProps, ref)
  let { focusProps } = useFocusRing()

  return (
    /*
      removed fixed width of w-48
      has max width for lengthy content restriction
    */
    <div
      id={id}
      className="relative inline-flex flex-col"
      style={{ maxWidth: "175px" }}
    >
      <HiddenSelect state={state} triggerRef={ref} name={name} />
      {/* Picker Trigger */}
      <FocusRing>
        <button
          {...mergeProps(buttonProps, focusProps)}
          ref={ref}
          className={cn(
            "relative inline-flex py-1 p-1 pl-3 items-center justify-between rounded-md overflow-hidden border-2 outline-none bg-transparent border-transparent"
          )}
        >
          {/* Selected Value */}
          <span
            {...valueProps}
            className={cn(
              "text-sm font-medium overflow-ellipsis whitespace-nowrap overflow-hidden mr-2",
              {
                "text-gray-800": state.selectedItem,
                "text-gray-500": !state.selectedItem,
                "opacity-70": variant === "secondary",
              }
            )}
            style={{
              maxWidth: "90%",
            }}
          >
            {state.selectedItem
              ? state.selectedItem.hasChildNodes
                ? state.selectedItem.textValue
                : state.selectedItem.rendered
              : placeholder
              ? placeholder
              : "Select an option"}
          </span>
          <Icon name="picker" size="xs" className="text-gray-600" />
        </button>
      </FocusRing>
      {state.isOpen && (
        <Popover isOpen={state.isOpen} onClose={state.close}>
          <ListBox
            {...menuProps}
            state={state}
            footer={footer}
            onClose={state.close}
          />
        </Popover>
      )}
    </div>
  )
}

export const Picker = {
  Container: PickerContainer,
  Section: Section,
  Item: Item,
  Footer: PickerFooter,
}
