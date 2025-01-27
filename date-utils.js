import { format, add, formatISO, sub } from "date-fns";
import { ru } from "date-fns/locale";

const dateFlags = {
  year: "year",
  month: "month",
  date: "date",
  y: "y",
  m: "m",
  d: "d",
};

const dateArgs = {
  add: "add",
  sub: "sub",
  current: "current",
  month: "months",
  m: "months",
  d: "days",
  days: "days",
};

/**
 * Получение флага, с которым была вызвана
 * консольная утилита, для того, чтобы по флагу
 * и по его параметру - вернуть правильную дату
 */
export const getCurrentFlag = (args) => {
  for (const flag in dateFlags) {
    if (args[flag]) {
      return {
        name: flag,
        value: typeof args[flag] === "number" ? args[flag] : undefined,
      };
    }
  }
};

export const getCurrentYear = () => format(new Date(), "yyyy");

export const getCurrentMonth = () => format(new Date(), "LLLL", { locale: ru });

export const getCurrentDate = () => formatISO(new Date(), "dd");

export const renderForwardDate = (objWithParams) => {
  return add(getCurrentDate(), objWithParams);
};

export const renderPastDate = (objWithParams) => {
  return sub(getCurrentDate(), objWithParams);
};

/**
 * В зависимости от флага/параметров
 * возвращает нужную дату
 */
export const renderDate = (flags, argument) => {
  // по умолчанию при отсутствии флагов - возвращаем текущую дату
  if (argument === dateArgs.current && !flags) {
    return format(new Date(), "dd/MM/yyyy");
  }

  const { name, value } = flags;

  if (argument === dateArgs.add) {
    const dateObjectWithParams = {};
    dateObjectWithParams[dateArgs[name]] = value;
    return renderForwardDate(dateObjectWithParams);
  }

  if (argument === dateArgs.sub) {
    const dateObjectWithParams = {};
    dateObjectWithParams[dateArgs[name]] = value;
    return renderPastDate(dateObjectWithParams);
  }

  if (name === dateFlags.year || name === dateFlags.y) {
    return getCurrentYear();
  }

  if (name === dateFlags.month || name === dateFlags.m) {
    return getCurrentMonth();
  }

  if (name === dateFlags.date || name === dateFlags.d) {
    return getCurrentDate();
  }
};
