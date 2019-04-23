import { CommandParsed, CommandParser, MessageParsed } from '../models/parser';

interface SpoilerDzCommandParsed extends CommandParsed {
  channelName: string;
}

class SpoilerDzCommandParser implements CommandParser<SpoilerDzCommandParsed> {
  parse(messageParsed: MessageParsed): SpoilerDzCommandParsed {
    return undefined;
  }

}

export { SpoilerDzCommandParser };
