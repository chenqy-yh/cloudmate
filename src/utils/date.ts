export type DayInfo = {
  year: number;
  month: number;
  day: number;
  week?: number;
}

export type MonthInfo = {
  days: DayInfo[];
  month: number;
  year: number;
};

export const getAmPm = (date: Date | string, format = { am: 'AM', pm: 'PM' }): string => {
  const hours = new Date(date).getHours();
  return hours < 12 ? format.am : format.pm;
}

/**
 * @description 格式化时间
 * format YYYY MM DD HH mm ss
 */
export const getFormattedDate = (date: Date | string, format = 'YYYY-MM-DD HH:mm:ss'): string => {
  const d = typeof date === 'string' ? new Date(date) : date

  const pad = (n: number) => String(n).padStart(2, '0')

  const map: Record<string, string> = {
    YYYY: String(d.getFullYear()),
    MM: pad(d.getMonth() + 1),
    DD: pad(d.getDate()),
    HH: pad(d.getHours()),
    mm: pad(d.getMinutes()),
    ss: pad(d.getSeconds()),
  }

  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (token) => map[token])
}


export const createDay = (date: Date): DayInfo => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate(),
  week: date.getDay(),
});


export const getMonthInfo = ({ month, year, pre = true, after = true }): MonthInfo => {
  const days: DayInfo[] = [];
  const first_day = new Date(year, month - 1, 1);
  const last_day = new Date(year, month, 0);

  // 计算前置填充天数（上个月的末尾几天）
  if (pre) {
    for (let i = first_day.getDay(); i > 0; i--) {
      const date = new Date(year, month - 1, 1 - i);
      days.push(createDay(date));
    }
  }


  // 当前月的所有天数
  for (let i = 1; i <= last_day.getDate(); i++) {
    const date = new Date(year, month - 1, i);
    days.push(createDay(date));
  }


  if (after) {
    // 计算后置填充天数（下个月的前几天）
    for (let i = days.length; i < 42; i++) {
      const date = new Date(year, month - 1, last_day.getDate() + i);
      days.push(createDay(date));
    }
  }


  return {
    days,
    month,
    year,
  };
};
