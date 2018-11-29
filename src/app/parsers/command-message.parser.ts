import { MessageParsed, MessageParser } from '../models/parser';
import { Message } from 'discord.js';

interface CommandMessageParsed extends MessageParsed {
  command: string;
  argv: string[];
}

class CommandMessageParser implements MessageParser<CommandMessageParsed> {
  public parse(message: Message): CommandMessageParsed {
    const commandRegex = new RegExp(/\w*(?:\s+(\w*))?(?:\s+(.*))?$/);
    const [, command, args] = commandRegex.exec(message.content);
    return {
      _message: message,
      command: command || null,
      argv: args ? args.split(/\s/) : [],
    }
  }
}

export { CommandMessageParsed, CommandMessageParser };
