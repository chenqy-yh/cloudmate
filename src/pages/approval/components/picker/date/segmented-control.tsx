import classNames from "classnames";
import styles from "./index.module.scss";

type SegmentedControlProps = {
  values: string[];
  current: number;
  onChange: (index: number) => void;
};

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  values,
  current,
  onChange,
}) => {
  return (
    <div className={styles.segmented_control}>
      {values.map((value, index) => (
        <div
          key={index}
          className={classNames(styles.segmented_item, {
            [styles.active]: index === current,
          })}
          onClick={() => onChange(index)}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

export default SegmentedControl;
