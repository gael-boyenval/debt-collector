import { useState } from 'react';
import { LogLevel, LogMessage } from '../DevLogger/LogViewer.js';

const formatTimestamp = (date: Date): string => {
  return date?.toISOString()?.split('T')[1]?.slice(0, -1) ?? '';
};

const generateId = () => Math.random().toString(36).substring(2, 9);

export type DevLogger = {
  logs: LogMessage[]
  info: (message: string, data?: unknown) => void
  warn: (message: string, data?: unknown) => void
  error: (message: string, data?: unknown) => void
  debug: (message: string, data?: unknown) => void
  clear: () => void
}

export const useDevLogger = (): DevLogger => {
  const [logs, setLogs] = useState<LogMessage[]>([]);

  const addLog = (level: LogLevel, message: string, data?: unknown) => {
    if (process.env['NODE_ENV'] !== 'development') {
      return;
    }

    const timestamp = formatTimestamp(new Date());
    const newLog: LogMessage = {
      id: generateId(),
      level,
      message,
      timestamp,
      data: data as string | number | boolean | object | undefined,
    };

    setLogs((prevLogs) => [...prevLogs, newLog]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return {
    logs,
    info: (message: string, data?: unknown) => addLog('info', message, data),
    warn: (message: string, data?: unknown) => addLog('warn', message, data),
    error: (message: string, data?: unknown) => addLog('error', message, data),
    debug: (message: string, data?: unknown) => addLog('debug', message, data),
    clear: clearLogs
  };
}; 