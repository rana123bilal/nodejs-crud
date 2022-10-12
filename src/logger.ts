import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console({ level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

logger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  })
);

export function executionLogger(callback: any) {
  return function () {
    console.time(`Controller ${callback.name} executed in`);
    const res = callback.apply(this, arguments);
    console.timeEnd(`Controller ${callback.name} executed in`);
    return res;
  };
}
