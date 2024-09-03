declare module 'react-easy-edit' {
  import React from 'react'

  interface EasyEditProps {
    type: string
    value?: string | number | any[]
    options?: Array<{ label: string; value: any }>
    saveButtonLabel?: string | React.ReactElement
    saveButtonStyle?: string
    cancelButtonLabel?: string | React.ReactElement
    cancelButtonStyle?: string
    deleteButtonLabel?: string | React.ReactElement
    deleteButtonStyle?: string
    editButtonLabel?: string | React.ReactElement
    editButtonStyle?: string
    buttonsPosition?: 'before' | 'after'
    placeholder?: string
    onCancel?: () => void
    onSave: (value: any) => void
    onValidate?: (value: any) => boolean
    onFocus?: () => void
    onBlur?: () => void
    validationMessage?: string
    allowEdit?: boolean
    attributes?: Record<string, any>
    viewAttributes?: Record<string, any>
    instructions?: string | React.ReactElement
    disableAutoSubmit?: boolean
    disableAutoCancel?: boolean
    editComponent?: React.ReactElement
    displayComponent?: React.ReactElement
    cssClassPrefix?: string
    hideSaveButton?: boolean
    hideCancelButton?: boolean
    hideDeleteButton?: boolean
    hideEditButton?: boolean
    onHoverCssClass?: string
    saveOnBlur?: boolean
    cancelOnBlur?: boolean
    editMode?: boolean
    showEditViewButtonsOnHover?: boolean
    showViewButtonsOnHover?: boolean
  }

  const EasyEdit: React.FC<EasyEditProps>

  // Add Types export
  export const Types: {
    TEXT: string
    TEXTAREA: string
    SELECT: string
    CHECKBOX: string
    RADIO: string
    DATE: string
    DATETIME: string
    TIME: string
    // Add any other types that are part of the library
  }

  export default EasyEdit
}
