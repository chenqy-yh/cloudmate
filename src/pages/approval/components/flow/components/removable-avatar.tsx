import Avatar from "@/components/avatar";
import Icon from "@/components/icon/common";
import styles from "./index.module.scss";

const cls = (s) => styles[`removable_avatar_${s}`];

type EditAvatarProps = {
  username: string;
  avatar?: string;
  size?: number;
  onRemove?: () => void;
};

const EditAvatar: React.FC<EditAvatarProps> = ({
  username,
  avatar,
  size = 40,
  onRemove,
}) => {
  return (
    <div className={cls("wrapper")}>
      <Avatar username={username} src={avatar} size={size} />
      <Icon
        className={cls("close")}
        icon="close-2"
        size={20}
        onClick={onRemove}
      />
    </div>
  );
};

export default EditAvatar;
