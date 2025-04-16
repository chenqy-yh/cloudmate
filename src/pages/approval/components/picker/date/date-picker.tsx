import { useCallback, useMemo, useState } from "react";
import Icon from "../../../../../components/icon/common";
import { DatePickerContext } from "./context";
import { Day } from "./index.d";
import styles from "./index.module.scss";
import PickerSelector from "./picker-selector";
import { formatDateDisplay, getCurDay } from "./utils";

export type DatePickerProps = {
  value?: Day;
  title: string;
  important?: boolean;
  placeholder?: string;
  onChange?: (value: Day | null) => void;
};

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    value,
    title,
    important = false,
    placeholder = "请选择",
    onChange,
  } = props;

  const [inner_value, setInnerValue] = useState(value ?? getCurDay());
  const [isSelectorVisible, setSelectorVisible] = useState(false);

  const display_value = useMemo(
    () => (value ? formatDateDisplay(value) : placeholder),
    [placeholder, value]
  );

  const handleShowSelector = useCallback(() => setSelectorVisible(true), []);

  const handleDateSelect = (value: Day) => {
    onChange?.(value);
  };

  const handleClear = useCallback(
    (e) => {
      e.stopPropagation();
      onChange?.(null);
    },
    [onChange]
  );

  return (
    <>
      <div className={styles.date_picker} onClick={handleShowSelector}>
        {important && <div className={styles.star}>*</div>}
        <div className={styles.date_picker_bar}>
          <div className={styles.title}>{title}</div>
          <div className={value ? styles.choose_day : styles.placeholder}>
            {display_value}
          </div>
          {value && (
            <Icon
              icon="close"
              size={20}
              className={styles.clear}
              onClick={handleClear}
            />
          )}
          <Icon icon="arrow-right-2" size={20} className={styles.arrow} />
        </div>
      </div>
      <DatePickerContext.Provider
        value={{
          onSelect: handleDateSelect,
          isSelectorVisible,
          setSelectorVisible,
          inner_value,
          setInnerValue,
        }}
      >
        <PickerSelector show={isSelectorVisible} />
      </DatePickerContext.Provider>
    </>
  );
};

export default DatePicker;
