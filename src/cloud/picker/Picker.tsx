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

export { Item, Section } from "@react-stately/collections"

type PickerProps = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** Children */
  children: any
  /** name value for native html components */
  name: string
  /** A required default selected key */
  defaultSelectedKey: string
  /** Callback invoked when the Select's selection changes */
  onSelectionChange?: (key: React.Key) => void
}

export const Picker = ({
  id,
  children,
  name,
  defaultSelectedKey,
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
    onSelectionChange: onSelectionChange,
  })

  let ref = React.useRef(null)
  let { triggerProps, valueProps, menuProps } = useSelect(
    {
      children: children,
      onSelectionChange: onSelectionChange,
    },
    state,
    ref
  )

  let { buttonProps } = useButton(triggerProps, ref)
  let { focusProps, isFocusVisible } = useFocusRing()

  return (
    <div id={id} className="relative inline-flex flex-col w-48">
      <HiddenSelect state={state} triggerRef={ref} name={name} />
      {/* Picker Trigger */}
      <FocusRing>
        <button
          {...mergeProps(buttonProps, focusProps)}
          ref={ref}
          className={cn(
            "relative inline-flex py-1 p-1 pl-3 items-center justify-between rounded-md overflow-hidden cursor-default border-2 outline-none bg-transparent border-transparent"
          )}
        >
          {/* Selected Value */}
          <span
            {...valueProps}
            className={cn(
              "text-sm font-medium overflow-ellipsis whitespace-nowrap overflow-hidden",
              {
                "text-gray-800": state.selectedItem,
                "text-gray-500": !state.selectedItem,
              }
            )}
            style={{
              maxWidth: "85%",
            }}
          >
            {state.selectedItem
              ? state.selectedItem.rendered
              : "Select an option"}
          </span>
          <Icon name="chevron-down" size="sm" className="text-gray-600" />
        </button>
      </FocusRing>
      {state.isOpen && (
        <Popover isOpen={state.isOpen} onClose={state.close}>
          <ListBox {...menuProps} state={state} />
          {footer}
        </Popover>
      )}
    </div>
  )
}
