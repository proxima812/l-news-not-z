type DateOrString = Date | string;

// ISO 8601 format for Structured Data (https://en.wikipedia.org/wiki/ISO_8601)
export function machineDate(dateIso: DateOrString): string {
 return new Date(dateIso).toISOString();
}

// e.g. Formats date to Oct 20, 2021 15:00
export function readableDate(dateIso: DateOrString): string {
 const options = {
  dateStyle: "medium",
  timeStyle: "short",
 };

 return new Intl.DateTimeFormat("ru-RU", options).format(new Date(dateIso));
}
