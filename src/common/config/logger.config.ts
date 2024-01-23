import { transports, format } from 'winston';
import { WinstonModuleOptions } from 'nest-winston';
import { registerAs } from '@nestjs/config';

const LOG_FILE_PATH = 'logs';

export default registerAs('loggerOptions', () => {
  const options: WinstonModuleOptions = {
    transports: [
      new transports.File({
        level: 'info',
        filename: `${LOG_FILE_PATH}/info.log`,
        handleExceptions: true,
      }),
      new transports.File({
        level: 'debug',
        filename: `${LOG_FILE_PATH}/debug.log`,
        handleExceptions: true,
      }),
      new transports.File({
        level: 'error',
        filename: `${LOG_FILE_PATH}/error.log`,
        handleExceptions: true,
      }),
      new transports.File({
        level: 'fatal',
        filename: `${LOG_FILE_PATH}/fatal.log`,
        handleExceptions: true,
      }),
      new transports.Console({
        level: 'info',
        handleExceptions: true,
      }),
    ],
    exitOnError: false,
    format: format.combine(
      format.uncolorize(),
      format.timestamp(),
      format.printf(({ level, message, context, timestamp }) => {
        return `${timestamp} [${context}] ${level}: ${message}`;
      }),
    ),
  };
  return options;
});
