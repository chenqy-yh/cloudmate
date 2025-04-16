type IconStore = {
  svg:
  | "add-black"
  | "add-gray"
  | "back"
  | 'company-active'
  | 'dir-icon'
  | 'file-icon'
  | 'folder-2'
  | 'folder'
  | 'arrow-right'
  | 'list-1'
  | 'gird'
  | 'more'
  | 'search'
  | 'search-2'
  | 'more-2'
  | 'forward'
  | 'input-field'
  | 'delete'
  | 'empty'
  | 'icon-folder'
  | 'icon-image'
  | 'icon-rar'
  | 'icon-video'
  | 'icon-word'
  | 'icon-zip'
  | 'image'
  | 'media'
  | 'doc'
  | 'file'
  | 'online'
  | 'offline'
  | 'feat-approval'
  | 'feat-atd'
  | 'feat-ops'
  | 'feat-schedule'
  | 'ap-pending'
  | 'ap-received'
  | 'ap-processed'
  | 'ap-initiated'
  | 'ap-leave'
  | 'ap-reimbursement'
  | 'ap-overtime'
  | 'ap-business-trip'
  | 'close'
  | 'close-2'
  | 'close-3'
  | 'arrow-right-2'
  | 'check'
  | 'check-2'
  | 'circle'
  png:
  | 'user-1'
  | 'user-2'
}


type IconType = 'svg' | 'png'

type IconName<T extends IconType> = IconStore[T];

