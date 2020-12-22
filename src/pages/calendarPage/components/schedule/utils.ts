export interface IMonthList {
  title: string;
  date: string;
}

export function getCurrentMonthList(d: Date): IMonthList[][] {
  //Current month
  const currentYear = d.getFullYear();
  const currentMonth = d.getMonth();
  const currentMonthStart = new Date(currentYear, currentMonth, 1).getDay();
  const currentMonthStartAtDay = currentMonthStart === 0 ? 6 : currentMonthStart - 1;
  const currentMonthDaysAmount = new Date(currentYear, currentMonth + 1, 0).getDate();
  const currentMonthArray: IMonthList[] = getDaysOfMonth(currentMonthDaysAmount, currentYear, currentMonth + 1);

  //Prev  month
  const prevMonthDate = new Date(currentYear, currentMonth, 0);
  const prevMonthY = prevMonthDate.getFullYear();
  const prevMonthM = prevMonthDate.getMonth();
  const prevMonthLastDate = prevMonthDate.getDate();
  const startWeekDate: number = prevMonthLastDate - currentMonthStartAtDay;
  const prevMonthArray: IMonthList[] = getDaysOfMonth(currentMonthStartAtDay, prevMonthY, prevMonthM + 1, startWeekDate);

  //Next month
  const nextMonthDate = new Date(currentYear, currentMonth + 1, 1);
  const nextMonthY = nextMonthDate.getFullYear();
  const nextMonthM = nextMonthDate.getMonth();
  const nextMonthStart = nextMonthDate.getDay();
  const endMonthStartAtDay = nextMonthStart === 0 ? 6 : nextMonthStart - 1;
  const delta = 7 - endMonthStartAtDay === 7 ? 0 : 7 - endMonthStartAtDay;
  const nextMonthArray: IMonthList[] = getDaysOfMonth(delta, nextMonthY, nextMonthM + 1);

  const list: IMonthList[] = [...prevMonthArray, ...currentMonthArray, ...nextMonthArray];

  const monthList: IMonthList[][] = [];
  let weekNumber = 0;
  list.forEach((day: IMonthList, index: number) => {
    if (index % 7 === 0) {
      monthList.push([]);
      if (index !== 0) {
        weekNumber++;
      }
    }
    monthList[weekNumber].push(day);
  });

  return monthList;
}

function getDaysOfMonth(dayAmount: number, year: number, month: number, startDay: number = 0): IMonthList[] {
  const array: IMonthList[] = [];
  for (let i = 1; i <= dayAmount; i++) {
    array.push({
      title: `${startDay + i}`,
      date: `${year}-${month}-${startDay + i}`,
    });
  }
  return array;
}
