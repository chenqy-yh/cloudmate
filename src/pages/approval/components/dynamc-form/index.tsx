import CommonLayout from "@/layout/common"
import React, { useRef, useState } from "react"
import { ComponentMap } from "./component-map"
import { FormConfig } from "./index.d"
import styles from "./index.module.scss"

export type FormState = Record<string, Record<string, any>>

export type DynamicFormProps = {
  config: FormConfig
  onSubmit: (form: FormState) => void
}

const DynamicForm: React.FC<DynamicFormProps> = ({ config, onSubmit }) => {

  const [form, setForm] = useState(() => {
    return (
      config?.fields?.reduce((acc, cur) => {
        const { key, prop_map, init_value } = cur
        acc[key] = prop_map.reduce((acc, cur) => {
          const { value } = cur
          acc[value] = init_value[value]
          return acc
        }, {} as Record<string, any>)
        return acc
      }, {} as FormState) ?? {}
    )
  })

  const handleChange = useRef((key: string, value_key: string, new_val: any) => {
    setForm((prev) => {
      return {
        ...prev,
        [key]: {
          ...prev[key],
          [value_key]: new_val,
        },
      }
    })
  }).current

  return (
    <CommonLayout title={`审批-${config.title}`} back>
      <div className={styles.form}>
        {config?.fields?.map((field) => {
          const { key, field_type, init_value, pipe, prop_map, ...rest } = field
          const FormComponent = ComponentMap[field_type]
          const values_and_updators = prop_map.reduce((acc, cur) => {
            const { value, onChange } = cur
            acc[value] = form[key][value]
            acc[onChange] = (new_val: any) => {
              const pipe_fn = pipe[value]
              const final_val = pipe_fn ? pipe_fn(new_val) : new_val
              handleChange(key, value, final_val)
            }
            return acc
          }, {})
          const final_props = {
            ...rest,
            ...values_and_updators,
          }
          return (
            <div key={key} className={styles.row}>
              <FormComponent {...(final_props as any)} />
            </div>
          )
        })}

        <div className={styles.space} />
      </div>
      <div className={styles.footer}>
        <div className={styles.btn} onClick={() => onSubmit(form)}>
          提交
        </div>
      </div>
    </CommonLayout>
  )
}

export default DynamicForm
export * from "./index.d"
