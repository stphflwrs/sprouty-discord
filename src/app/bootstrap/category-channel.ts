import { CategoryChannel, Guild, GuildChannel } from 'discord.js';
import { Config } from '../../config';
import { from, NEVER, Observable } from 'rxjs';

function ensureCategoryChannel(guild: Guild): Observable<CategoryChannel | void> {
  const categoryChannel: GuildChannel = guild.channels.find(({ name }: GuildChannel) => name === Config.categoryChannel);
  if (!categoryChannel) {
    return from(guild.createChannel(Config.categoryChannel, 'category')) as Observable<CategoryChannel>;
  } else {
    return NEVER;
  }
}

export { ensureCategoryChannel };
