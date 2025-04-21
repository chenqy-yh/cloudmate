type MeetingEntity = {
  id: string
  location: string | null;
  url: string | null;
  start_time: Date;
  end_time: Date;
  level: number;
  title: string;
  desc: string;
  creator_uuid: string;

  creator?: {
    uuid: string;
    name: string;
    avatar: string;
  }

  participants?: {
    uuid: string;
    name: string;
    avatar: string;
  }[]
}
