import MyCalendar from '../../components/booking/AvailabilityCalendar';

const Booking = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-7">Dasboard</h1>
      <div className="">
        <MyCalendar icsUrl="https://ical.booking.com/v1/export?t=01b1941c-b346-4994-9fba-d0ca875152ea" />
      </div>
    </div>
  );
};

export default Booking;
