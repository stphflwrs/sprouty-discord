import { MessageParsed } from './parser';

class CommandError extends Error {
  source: MessageParsed;
}

export { CommandError };
