type FeatureItem = {
  icon: IconName<"svg">;
  title: string;
  desc: string;
  path?: string;
};

type UserInfo = {
  avatar: string | null;
  email: string | null;
  name: string;
  phone: string;
  uuid: string;
}
