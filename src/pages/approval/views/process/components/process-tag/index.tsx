import classNames from "classnames";
import styles from "./index.module.scss";

type ProcessTagProps = {
  item: {
    title: string;
    tag: string;
    value: string;
  };
  active: boolean;
  toggle: (value: string) => void;
};

const ProcessTag: React.FC<ProcessTagProps> = ({ item, active, toggle }) => {
  const process_tag_cls = () =>
    classNames(styles.process_tag, {
      [styles.active]: active,
    });

  return (
    <div
      key={item.tag}
      className={process_tag_cls()}
      onClick={() => toggle(item.value)}
    >
      {item.tag}
    </div>
  );
};

export default ProcessTag;
