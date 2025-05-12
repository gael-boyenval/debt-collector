import { Box, Text } from 'ink';

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export interface LogMessage {
  id: string;
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: string | number | boolean | object;
}

const getLogColor = (level: LogLevel): string => {
  switch (level) {
    case 'info':
      return 'blue';
    case 'warn':
      return 'yellow';
    case 'error':
      return 'red';
    case 'debug':
      return 'gray';
    default:
      return 'white';
  }
};

export const LogViewer = ({ logs }: { logs: LogMessage[] }) => {
  if (process.env['NODE_ENV'] === 'production') {
    return null;
  }

  return (
    <Box flexDirection="column" marginY={1}>
      {logs.map((log) => (
        <Box key={log.id} flexDirection="column" marginY={0.5}>
          <Box>
            <Text color="gray">[{log.timestamp}]</Text>
            <Text color={getLogColor(log.level)}> [{log.level.toUpperCase()}]</Text>
          </Box>
          <Box marginLeft={2}>
            <Text>{log.message}</Text>
          </Box>
          {log.data && (
            <Box marginLeft={2}>
              <Text color="gray">{String(JSON.stringify(log.data, null, 2))}</Text>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}; 