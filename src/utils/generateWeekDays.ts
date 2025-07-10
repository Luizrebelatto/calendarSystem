export function generateWeekDays(firstSunday: Date, weekIndex: number){
    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const day = new Date(firstSunday);
        day.setDate(firstSunday.getDate() + weekIndex * 7 + i);
        return day;
      });
    return weekDays;
}