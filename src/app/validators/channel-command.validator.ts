import { CommandValidator } from '../models/validator';
import { CommandMessageParsed } from '../parsers/command-message.parser';
import { InvalidCommandArgumentsError } from '../errors/invalid-command-arguments.error';

class ChannelCommandValidator implements CommandValidator {
  public validate(): (commandMessageParsed: CommandMessageParsed) => boolean {
    return (commandMessageParsed: CommandMessageParsed) => {
      if (commandMessageParsed.argv.length !== 1) {
        throw new InvalidCommandArgumentsError('Invalid number of arguments', commandMessageParsed);
      }

      return true;
    };
  }
}

export { ChannelCommandValidator };
