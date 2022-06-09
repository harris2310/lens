import React, { Key, useRef, useState, forwardRef } from "react"
import cn from "classnames"
import { useComboBox } from "@react-aria/combobox"
import { useComboBoxState } from "@react-stately/combobox"
import { useFilter } from "@react-aria/i18n"
import { useButton } from "@react-aria/button"
import {
  Item as ReactAriaItem,
  Section as ReactAriaSection,
} from "@react-stately/collections"
import { CollectionChildren } from "@react-types/shared"
import { useId, mergeProps, chain } from "@react-aria/utils"
import { useFocus, useHover } from "@react-aria/interactions"
import { Tooltip } from "../tooltip/Tooltip"

import { useCollectionComponents } from "../../hooks/useCollectionComponents"
import {
  ListBoxFooter,
  ListBoxOverlay,
  ListBoxOption,
} from "../internal/ListBox"
import { Label } from "../label/Label"
import { Icon } from "../icon/Icon"
import { FocusRing } from "../focus-ring/FocusRing"
import { Hint } from "../internal/Hint"

export type ComboBoxOption<OptionKey extends Key = string> =
  ListBoxOption<OptionKey>

export type ComboBoxContainerProps<OptionKey extends Key> = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** Controls if this ComboBox should steal focus when first rendered */
  autoFocus?: boolean
  /** A list of Options to render inside this ComboBox */
  children?: CollectionChildren<ComboBoxOption<OptionKey>>
  /** Value to be pre-populated in the input when this ComboBox is first rendered */
  defaultInputValue?: string
  /** Key of the Option that is selected when this ComboBox is first rendered */
  defaultSelectedKey?: OptionKey
  /** An optional hint to show next to the ComboBox that describes what this ComboBox expects */
  hint?: string
  /** An optional error to show next to the ComboBox. If a `validator` is also supplied, the `validator` takes precendence */
  error?: string
  /** Controls if this ComboBox is disabled */
  isDisabled?: boolean
  /** A string describing what this ComboBox represents */
  label: string
  /** A (dynamic) list of options to render within this ComboBox.
   * This may be provided upfront instead of providing static children.
   */
  options?: ComboBoxOption<OptionKey>[]
  /** Controls if this ComboBox's options are not yet available, but will be in the future */
  isLoading?: boolean
  /** Name of the value held by this ComboBox when placed inside a form */
  name?: string
  /** A value to display in the TextField when it is empty */
  placeholder?: string
  /** The current selection */
  selectedKey?: OptionKey
  /** Callback invoked when the ComboBox's selection changes */
  onSelectionChange?: (key: OptionKey) => void
}

/**
 * A ComboBox is a specialized text field that only allows you its value to be one of the pre-provided options.
 * It displays a list of options below the text field. This list keeps getting shorter as you type, since fewer options match the text field's value.
 */
function ComboBoxContainer<OptionKey extends Key = string>({
  id,
  autoFocus,
  children,
  defaultInputValue,
  defaultSelectedKey,
  error,
  hint,
  isDisabled = false,
  isLoading = false,
  options,
  label,
  name,
  placeholder = "Select an option",
  selectedKey,
  onSelectionChange,
}: ComboBoxContainerProps<OptionKey>) {
  const { body, footer } = useCollectionComponents({
    children,
    footerType: ListBoxFooter,
  })

  const _hintId = useId()
  const hintId = id ? `${id}-hint` : _hintId

  const { contains } = useFilter({ sensitivity: "base" })
  const state = useComboBoxState({
    id,
    autoFocus,
    children: body,
    allowsEmptyCollection: true,
    menuTrigger: "focus",
    defaultInputValue,
    defaultSelectedKey,
    isDisabled,
    isReadOnly: isDisabled,
    defaultItems: options, // `defaultFilter` only works when `items` is undefined
    defaultFilter: contains,
    placeholder,
    selectedKey,
    onSelectionChange: onSelectionChange as (k: Key) => void,
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const listBoxRef = useRef<HTMLUListElement>(null)
  const {
    inputProps,
    buttonProps: triggerProps,
    labelProps,
    listBoxProps,
  } = useComboBox(
    {
      id,
      autoFocus,
      children: body,
      menuTrigger: "focus",
      defaultInputValue,
      defaultSelectedKey,
      isDisabled,
      isReadOnly: isDisabled,
      defaultItems: options,
      placeholder,
      selectedKey,
      label,
      onSelectionChange: onSelectionChange as (k: React.Key) => void,
      inputRef,
      buttonRef,
      popoverRef: overlayRef,
      listBoxRef,
    },
    state
  )
  const { buttonProps } = useButton({ ...triggerProps, isDisabled }, buttonRef)

  const { hoverProps, isHovered } = useHover({}) // deliberately not passing `isDisabled` because we want it to ignore that

  return (
    <div className="w-full flex flex-col space-y-3">
      <Label labelProps={labelProps}>{label}</Label>
      <section className="w-full relative mt-3">
        <FocusRing autoFocus={autoFocus} within>
          <div
            {...hoverProps}
            ref={containerRef}
            className={cn(
              "flex items-center w-full relative",
              "rounded border border-gray-300 dark:border-gray-700",
              "px-3 py-2.5",
              "text-sm",
              {
                "text-gray-400 dark:text-gray-400": isDisabled,
                "bg-gray-100 dark:bg-gray-800": isDisabled,
                "bg-white dark:bg-gray-900": !isDisabled,
                "cursor-not-allowed": isDisabled,
              }
            )}
          >
            {state.selectedItem && state.selectedItem.props.leadingImageSrc && (
              <img
                src={state.selectedItem.props.leadingImageSrc}
                className="rounded-full w-4"
              />
            )}
            {state.selectedItem && state.selectedItem.props.leadingIcon && (
              <Icon name={state.selectedItem.props.leadingIcon} size="sm" />
            )}
            <input
              ref={inputRef}
              type="text"
              lens-role="input"
              {...inputProps}
              aria-describedby={hintId}
              name={name}
              className={cn("flex-1 min-w-0", {
                "bg-white dark:bg-gray-900": !isDisabled,
                "bg-gray-100 dark:bg-gray-800": isDisabled,
                "text-gray-800 dark:text-gray-100": !isDisabled,
                "text-gray-400 dark:text-gray-400": isDisabled,
                "cursor-not-allowed": isDisabled,
              })}
            />
            <button lens-role="chevron" ref={buttonRef} {...buttonProps}>
              <Icon
                name="triangle-down"
                size="xxs"
                className="text-gray-500 dark:text-gray-500"
              />
            </button>
          </div>
        </FocusRing>

        {isDisabled && isHovered && (
          <Tooltip target={containerRef}>This ComboBox is disabled</Tooltip>
        )}

        <Hint id={hintId} text={hint} error={error} />

        {state.isOpen && (
          <ListBoxOverlay
            listBoxProps={listBoxProps}
            id={id}
            label={label}
            containerRef={containerRef}
            listBoxRef={listBoxRef}
            overlayRef={overlayRef}
            state={state}
            footer={footer}
            loading={isLoading}
          />
        )}
      </section>
    </div>
  )
}

export const ComboBox = {
  Container: ComboBoxContainer,
  Section: ReactAriaSection,
  Option: ReactAriaItem as <Key extends string>(props: {
    key: Key
    children: string
    leadingIcon?: string
    trailingIcon?: string
    leadingImageSrc?: string
    description?: string
  }) => JSX.Element,
  Footer: ListBoxFooter,
}
