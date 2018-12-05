import { CommandParsed, CommandParser } from '../models/parser';
import { CommandMessageParsed } from './command-message.parser';
import { TextChannel } from 'discord.js';

type SpoilerCommandMode = 'create' | 'join' | 'archive';

interface SpoilerCommandParsed extends CommandParsed {
  mode: SpoilerCommandMode;
  topic: string;
}

class SpoilerCommandParser implements CommandParser<SpoilerCommandParsed> {
  public parse({ _message, argv }: CommandMessageParsed): SpoilerCommandParsed {
    return {
      _argv: argv,
      guild: _message.guild,
      sourceChannel: _message.channel as TextChannel,
      mode: argv[0] as SpoilerCommandMode,
      topic: argv[1],
    };
  }
}

export { SpoilerCommandParsed, SpoilerCommandParser };
