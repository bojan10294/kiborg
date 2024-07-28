/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './AvailabilityCalendar.scss';
import parseICS from './parseICS';

const localizer = momentLocalizer(moment);

interface Props {
  icsUrl: string;
}

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
}

const MyCalendar: FC<Props> = ({ icsUrl }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(icsUrl);
        if (!response.ok) {
          throw new Error(`Error fetching .ics file: ${response.statusText}`);
        }
        const icsContent = await response.text();
        const parsedEvents = parseICS(icsContent).map((event: any) => ({
          title: event.summary,
          start: event.start,
          end: event.end,
        }));
        setEvents(parsedEvents);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [icsUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Availability Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={['month', 'week']}
        step={30}
        timeslots={2}
        scrollToTime={new Date(1970, 1, 1, 6)}
      />
    </div>
  );
};

export default MyCalendar;
