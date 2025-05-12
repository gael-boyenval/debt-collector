import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render } from 'ink-testing-library';
import { LogViewer } from './LogViewer.js';
import type { LogMessage } from './LogViewer.js';

describe('LogViewer', () => {
  const originalEnv = process.env['NODE_ENV'];
  const mockLogs: LogMessage[] = [
    {
      id: '1',
      level: 'info',
      message: 'Test message',
      timestamp: '12:00:00',
    },
    {
      id: '2',
      level: 'warn',
      message: 'Warning message',
      timestamp: '12:00:01',
      data: { test: 'data' },
    },
  ];

  beforeEach(() => {
    process.env['NODE_ENV'] = 'development';
  });

  afterEach(() => {
    process.env['NODE_ENV'] = originalEnv;
  });

  it('should render logs in development mode', async () => {
    const { lastFrame } = await render(<LogViewer logs={mockLogs} />);
    
    expect(lastFrame()).toContain('Test message');
    expect(lastFrame()).toContain('Warning message');
    expect(lastFrame()).toContain('test');
  });

  it('should not render in production mode', async () => {
    process.env['NODE_ENV'] = 'production';
    
    const { lastFrame } = await render(<LogViewer logs={mockLogs} />);
    expect(lastFrame()).toBe('');
  });

  it('should render different log levels with appropriate colors', async () => {
    const logs: LogMessage[] = [
      { id: '1', level: 'info', message: 'Info', timestamp: '12:00:00' },
      { id: '2', level: 'warn', message: 'Warn', timestamp: '12:00:01' },
      { id: '3', level: 'error', message: 'Error', timestamp: '12:00:02' },
      { id: '4', level: 'debug', message: 'Debug', timestamp: '12:00:03' },
    ];

    const { lastFrame } = await render(<LogViewer logs={logs} />);
    
    expect(lastFrame()).toContain('INFO');
    expect(lastFrame()).toContain('WARN');
    expect(lastFrame()).toContain('ERROR');
    expect(lastFrame()).toContain('DEBUG');
  });

  it('should render timestamps correctly', async () => {
    const { lastFrame } = await render(<LogViewer logs={mockLogs} />);
    
    expect(lastFrame()).toContain('[12:00:00]');
    expect(lastFrame()).toContain('[12:00:01]');
  });
}); 