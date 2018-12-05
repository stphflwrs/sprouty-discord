import { Command } from '../models/responder';
import { Client, Guild, GuildChannel, TextChannel } from 'discord.js';
import { EMPTY, from, Observable, of } from 'rxjs';
import { Config } from '../../config';
import { flatMap, tap } from 'rxjs/operators';
import { SpoilerCommandParsed, SpoilerCommandParser } from '../parsers/spoiler-command.parser';
import { SpoilerCommandValidator } from '../validators/spoiler-command.validator';

class SpoilerCommand implements Command {
  public readonly command: string = 'spoiler';
  public readonly parser: SpoilerCommandParser = new SpoilerCommandParser();
  public readonly validator: SpoilerCommandValidator = new SpoilerCommandValidator();

  private spoilerChannelPrefix: string = 'sp-';

  public constructor(private client: Client) {}

  public respond({ guild, sourceChannel, mode, topic }: SpoilerCommandParsed): Observable<GuildChannel | void> {

    switch (mode) {
      case 'create':
        const channelName: string = this.spoilerChannelPrefix + topic;
        const existingChannel: GuildChannel = this.channelExists(guild, channelName);
        if (existingChannel) {
          return of(existingChannel);
        } else {
          return from(guild.createChannel(channelName)).pipe(
              flatMap((channel: TextChannel) => {
                const categoryChannelId = guild.channels.find(({ name }: GuildChannel) => name === Config.categoryChannel).id;
                return from(channel.setParent(categoryChannelId));
              }),
              tap((channel: TextChannel) => {
                const message: string =
                    `Spoiler discussion for *${topic}* created!\n` +
                    `Join using \`.sprouty spoiler join ${topic}\``;
                return from(sourceChannel.send(message));
              }),
          );
        }
      case 'join':
        return EMPTY;
      case 'archive':
        return EMPTY;
      default:
        return EMPTY;
    }

    // return from(guild.createChannel(channelName, 'text')).pipe(
    //     flatMap((channel: TextChannel) => {
    //       const categoryChannelId = guild.channels.find(({ name }: GuildChannel) => name === Config.categoryChannel).id;
    //       return from(channel.setParent(categoryChannelId));
    //     }),
    //     tap((channel: TextChannel) => {
    //       return from(sourceChannel.send(`Channel ${channel} created!`));
    //     }),
    // );
  }

  private channelExists(guild: Guild, channelName: string): GuildChannel | null {
    return guild.channels.find(({ name }: GuildChannel) => name === channelName);
  }
}

export { SpoilerCommand };
