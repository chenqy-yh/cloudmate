
export type Part = {
  uuid: string
  email: string
  phone: string
  name: string
  avatar: string
}

export type PartPickerProps = {
  title: string
  placeholder: string
  parts: Part[]
  selected_parts: Part[]

  edit_page_config: {
    title: string
    desc: string
  }

  onChange: (selected_list: Part[]) => void
} & React.HTMLAttributes<HTMLDivElement>
