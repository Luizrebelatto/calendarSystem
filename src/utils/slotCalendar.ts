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

export const getConflictingEvents = (events, year, month, day, hour) => {
  return events.filter(ev =>
    ev.year === year &&
    ev.month === month &&
    ev.day === day &&
    ev.start <= hour &&
    ev.end > hour
  );
};

export const groupConflictingEvents = (events, year, month, day, hour) => {
  const conflictingEvents = getConflictingEvents(events, year, month, day, hour);
  
  if (conflictingEvents.length <= 1) {
    return [conflictingEvents];
  }
  
  const groups = [];
  const used = new Set();
  
  conflictingEvents.forEach((event, index) => {
    if (used.has(index)) return;
    
    const group = [event];
    used.add(index);
    
    conflictingEvents.forEach((otherEvent, otherIndex) => {
      if (used.has(otherIndex)) return;
      
      const hasOverlap = (
        (event.start < otherEvent.end && event.end > otherEvent.start) ||
        (otherEvent.start < event.end && otherEvent.end > event.start)
      );
      
      if (hasOverlap) {
        group.push(otherEvent);
        used.add(otherIndex);
      }
    });
    
    groups.push(group);
  });
  
  return groups;
};

export const getEventsWithConflicts = (events, year, month, day, hour) => {
  const slotEvents = getEventsStartingAtSlot(events, year, month, day, hour);
  
  if (slotEvents.length === 0) {
    return [];
  }
  
  const allConflicts = [];
  
  slotEvents.forEach(event => {
    const conflicts = events.filter(ev =>
      ev.year === year &&
      ev.month === month &&
      ev.day === day &&
      ev.id !== event.id &&
      ((ev.start < event.end && ev.end > event.start) ||
       (event.start < ev.end && event.end > ev.start))
    );
    
    if (conflicts.length > 0) {
      allConflicts.push([event, ...conflicts]);
    } else {
      allConflicts.push([event]);
    }
  });
  
  const uniqueGroups = [];
  const usedIds = new Set();
  
  allConflicts.forEach(group => {
    const groupIds = group.map(ev => ev.id).sort().join(',');
    if (!usedIds.has(groupIds)) {
      uniqueGroups.push(group);
      group.forEach(ev => usedIds.add(ev.id));
    }
  });
  
  return uniqueGroups;
};