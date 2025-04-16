import Header from "@/components/header";
import Icon from "@/components/icon/common";
import { ReactNode } from "react";
import { Part } from ".";
import EditAvatar from "./removable-avatar";
import styles from "./index.module.scss";

type EditPageProps = {
  title: string;
  selected_parts: Part[];
  desc: string;
  separator: ReactNode;
  onBack: () => void;
  onChange: (parts: Part[]) => void;
};

const cls = (s) => styles[`edit_page_${s}`];

const EditPage: React.FC<EditPageProps> = ({
  title,
  desc,
  selected_parts,
  separator,
  onBack,
  onChange,
}) => {
  const handleRemovePart = (part) => {
    onChange(selected_parts.filter((p) => p !== part));
  };

  return (
    <div className={cls("body")}>
      <Header>
        <div className={cls("header")}>
          <Icon
            icon="back"
            className={cls("header_back")}
            size={30}
            onClick={onBack}
          />
          <div className={cls("header_title")}>{title}</div>
        </div>
      </Header>
      <div className={cls("content")}>
        <div className={cls("desc")}>{desc}</div>
        <div className={cls("detail")}>
          {selected_parts.map((part, index) => (
            <>
              <EditAvatar
                key={index}
                username={part.name}
                avatar={part.avatar}
                onRemove={() => handleRemovePart(part)}
              />
              {index !== selected_parts.length - 1 && separator}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditPage;
