import { parseISO } from "date-fns";
import { createDateFromString } from "../DateFromString";

export const DateFromISOString = createDateFromString({
  parse(s) {
    return parseISO(s);
  },
  serialize(d) {
    return d.toISOString();
  },
});
