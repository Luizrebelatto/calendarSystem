export const getEventsStartingAtSlot = (events, year, month, day, hour) => {
    return events.filter(ev =>
      ev.year === year &&
      ev.month === month &&
      ev.day === day &&
      ev.start === hour
    );
  };

export const isSlotOccupied = (events, year, month, day, hour) => {
    return events.some(ev =>
      ev.year === year &&
      ev.month === month &&
      ev.day === day &&
      ev.start < hour &&
      ev.end > hour
    );
  };