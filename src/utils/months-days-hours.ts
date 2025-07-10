interface MonthOption {
    label: string;
    value: string;
};

interface elementCalendar {
    label: string;
    value: string;
  };

export const months: MonthOption[] = [
    { label: 'Janeiro', value: '0' },
    { label: 'Fevereiro', value: '1' },
    { label: 'Março', value: '2' },
    { label: 'Abril', value: '3' },
    { label: 'Maio', value: '4' },
    { label: 'Junho', value: '5' },
    { label: 'Julho', value: '6' },
    { label: 'Agosto', value: '7' },
    { label: 'Setembro', value: '8' },
    { label: 'Outubro', value: '9' },
    { label: 'Novembro', value: '10' },
    { label: 'Dezembro', value: '11' },
];


export const days: elementCalendar[] = Array.from({ length: 31 }, (_, i) => i + 1).map(d => ({ label: `${d}`, value: d.toString() }));

export const years: elementCalendar[] = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(y => ({ label: `${y}`, value: y.toString() }));

export const hours: elementCalendar[] = Array.from({ length: 24 }, (_, i) => i).map(h => {
  if (h === 0) return { label: '12:00 AM', value: h.toString() };
  if (h === 12) return { label: '12:00 PM', value: h.toString() };
  if (h > 12) return { label: `${h - 12}:00 PM`, value: h.toString() };
  return { label: `${h}:00 AM`, value: h.toString() };
});

export const daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];