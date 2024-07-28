/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'ical.js' {
  export interface IcalEvent {
    startDate: {
      toJSDate: () => Date;
    };
    endDate: {
      toJSDate: () => Date;
    };
    summary: string;
  }

  export interface IcalComponent {
    getAllSubcomponents: (type: string) => any[];
  }

  export interface Ical {
    parse: (content: string) => any;
    Component: new (jcal: any) => IcalComponent;
    Event: new (component: any) => IcalEvent;
  }

  const ICAL: Ical;
  export default ICAL;
}
