// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';
import { useDevLogger } from './useDevLogger.js';

describe('useDevLogger', () => {
  const originalEnv = process.env['NODE_ENV'];

  beforeEach(() => {
    process.env['NODE_ENV'] = 'development';
  });

  afterEach(() => {
    process.env['NODE_ENV'] = originalEnv;
  });

  it('should maintain log history', () => {
    const { result } = renderHook(() => useDevLogger());
    
    act(() => {
      result.current.info('First message');
      result.current.warn('Second message', { data: 'test' });
    });
    
    const logs = result.current.logs;
    expect(logs).toHaveLength(2);
    expect(logs[0]?.message).toBe('First message');
    expect(logs[1]?.message).toBe('Second message');
    expect(logs[1]?.data).toEqual({ data: 'test' });
  });

  it('should not add logs in production mode', () => {
    process.env['NODE_ENV'] = 'production';
    
    const { result } = renderHook(() => useDevLogger());
    
    act(() => {
      result.current.info('Test message');
    });
    
    expect(result.current.logs).toHaveLength(0);
  });

  it('should clear logs when clear is called', () => {
    const { result } = renderHook(() => useDevLogger());
    
    act(() => {
      result.current.info('Test message');
      result.current.clear();
    });
    
    expect(result.current.logs).toHaveLength(0);
  });

  it('should add logs with different levels', () => {
    const { result } = renderHook(() => useDevLogger());
    
    act(() => {
      result.current.info('Info message');
      result.current.warn('Warn message');
      result.current.error('Error message');
      result.current.debug('Debug message');
    });
    
    const logs = result.current.logs;
    expect(logs).toHaveLength(4);
    expect(logs[0]?.level).toBe('info');
    expect(logs[1]?.level).toBe('warn');
    expect(logs[2]?.level).toBe('error');
    expect(logs[3]?.level).toBe('debug');
  });

  it('should include timestamp in log entries', () => {
    const { result } = renderHook(() => useDevLogger());
    
    act(() => {
      result.current.info('Test message');
    });
    
    const firstLog = result.current.logs[0];
    expect(firstLog?.timestamp).toBeDefined();
    expect(typeof firstLog?.timestamp).toBe('string');
    expect(firstLog?.timestamp).toMatch(/^\d{2}:\d{2}:\d{2}/);
  });
}); 