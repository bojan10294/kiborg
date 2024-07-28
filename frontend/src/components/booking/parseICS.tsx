/* eslint-disable @typescript-eslint/no-explicit-any */
import ICAL, { IcalEvent } from 'ical.js';

interface ParsedEvent {
  start: Date;
  end: Date;
  summary: string;
}

const parseICS = (icsContent: string): ParsedEvent[] => {
  const jcalData = ICAL.parse(icsContent);
  const comp = new ICAL.Component(jcalData);
  const events = comp.getAllSubcomponents('vevent');

  return events.map((event: any) => {
    const vevent: IcalEvent = new ICAL.Event(event);
    return {
      start: vevent.startDate.toJSDate(),
      end: vevent.endDate.toJSDate(),
      summary: vevent.summary,
    };
  });
};

export default parseICS;
