import { Guild, Message, TextChannel } from 'discord.js';

interface Parser {
  parse(data: unknown): unknown;
}

interface CommandParsed {
  readonly _argv: string[];
  readonly guild: Guild;
  readonly sourceChannel: TextChannel;
}

interface CommandParser<T extends CommandParsed> extends Parser {
  parse(messageParsed: MessageParsed): T;
}

interface MessageParsed {
  readonly _message: Message;
}

interface MessageParser<T extends MessageParsed> extends Parser {
  parse(message: Message): T;
}

export { Parser, CommandParsed, CommandParser, MessageParsed, MessageParser };
