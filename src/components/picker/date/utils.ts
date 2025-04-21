import { Day } from ".";

export const getCurDay = () => {
  const cur_date = new Date();
  return {
    day: cur_date.getDate(),
    week: cur_date.getDay(),
    year: cur_date.getFullYear(),
    month: cur_date.getMonth() + 1,
    hour: cur_date.getHours(),
    minute: cur_date.getMinutes(),
  }
}

export const padZero = (str, n = 2) => {
  return str.toString().padStart(n, '0');
}

export const formatDateDisplay = (day: Day): string => {
  return `${day.year}-${padZero(day.month)}-${padZero(day.day)} ${padZero(day.hour)}:${padZero(day.minute)}`;
};

export const formatSegmentDate = (day: Day): string => {
  return `${day.year}年${day.month}月${day.day}日`;
};

export const formatSegmentTime = (day: Day): string => {
  return `${padZero(day.hour)}:${padZero(day.minute)}`;
};


export const adjustMonthYear = ({ year, month, offset }) => {
  const new_month = month + offset;
  return {
    year: year + Math.floor((new_month - 1) / 12),
    month: formatMonth(new_month),
  };
};

export const getNextIndex = (cur: number) => (cur + 1) % 3;

export const getPreIndex = (cur) => (cur + 2) % 3;

export const formatMonth = (month: number) => {
  return ((month + 11) % 12) + 1;
};


export const normalizeDay = (y: number, m: number, d: number) => {
  const last_day = new Date(y, m, 0).getDate();
  return d > last_day ? last_day : d;
};


export const dayTransfer = (day: Day) => {
  if (!day) return void (0)
  return new Date(day.year, day.month - 1, day.day, day.hour, day.minute);
}
