import { CommandParsed, CommandParser } from '../models/parser';
import { CommandMessageParsed } from './command-message.parser';
import { TextChannel } from 'discord.js';

interface ChannelCommandParsed extends CommandParsed {
  channelName: string;
}

class ChannelCommandParser implements CommandParser<ChannelCommandParsed> {
  public parse({ _message, argv }: CommandMessageParsed): ChannelCommandParsed {
    return {
      _argv: argv,
      guild: _message.guild,
      sourceChannel: _message.channel as TextChannel,
      channelName: argv[0],
    };
  }
}

export { ChannelCommandParsed, ChannelCommandParser };
