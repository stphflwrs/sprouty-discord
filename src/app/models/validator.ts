import { Message } from 'discord.js';
import { CommandMessageParsed } from '../parsers/command-message.parser';

interface Validator {
  validate(...input: unknown[]): (input: unknown) => boolean;
}

interface MessageValidator {
  validate(): (message: Message) => boolean;
}

interface CommandValidator {
  validate(): (commandMessageParsed: CommandMessageParsed) => boolean;
}

export { Validator, MessageValidator, CommandValidator };
