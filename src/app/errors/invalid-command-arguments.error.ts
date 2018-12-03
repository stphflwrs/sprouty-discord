import { MessageParsed } from '../models/parser';
import { CommandError } from '../models/error';

class InvalidCommandArgumentsError extends CommandError {
  public constructor(message: string, public source: MessageParsed) {
    super(message);
  }
}

export { InvalidCommandArgumentsError };
