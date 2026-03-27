type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
}

class Logger {
  private logs: LogEntry[] = [];
  private readonly maxLogs: number = 1000;
  // ✅ Utilisation de import.meta.env pour Vite
  private readonly isDevelopment: boolean = import.meta.env.DEV;

  private formatMessage(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
    };
  }

  private addLog(entry: LogEntry): void {
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    if (this.isDevelopment) {
      const { timestamp, level, message, data } = entry;
      const logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
      
      switch (level) {
        case 'debug':
          console.debug(logMessage, data);
          break;
        case 'info':
          console.info(logMessage, data);
          break;
        case 'warn':
          console.warn(logMessage, data);
          break;
        case 'error':
          console.error(logMessage, data);
          break;
      }
    }
  }

  debug(message: string, data?: any): void {
    this.addLog(this.formatMessage('debug', message, data));
  }

  info(message: string, data?: any): void {
    this.addLog(this.formatMessage('info', message, data));
  }

  warn(message: string, data?: any): void {
    this.addLog(this.formatMessage('warn', message, data));
  }

  error(message: string, data?: any): void {
    this.addLog(this.formatMessage('error', message, data));
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  getLogsByLevel(level: LogLevel): LogEntry[] {
    return this.logs.filter((log) => log.level === level);
  }

  getLogsByTimeRange(start: Date, end: Date): LogEntry[] {
    return this.logs.filter(
      (log) =>
        new Date(log.timestamp) >= start && new Date(log.timestamp) <= end
    );
  }

  getLogsByMessage(message: string): LogEntry[] {
    return this.logs.filter((log) =>
      log.message.toLowerCase().includes(message.toLowerCase())
    );
  }
}

export const logger = new Logger();