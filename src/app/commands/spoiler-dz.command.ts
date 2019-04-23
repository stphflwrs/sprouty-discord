import { Command } from '../models/responder';
import { Client, GuildChannel } from 'discord.js';
import { Observable } from 'rxjs';
import { CommandError } from '../models/error';

class SpoilerDzCommand implements Command {
  public readonly command: string = 'spoiler-dz';
  public readonly parser: null;
  public readonly validator: null;

  public constructor(private client: Client) {}

  public respond({}: null): Observable<any> {

  }

  public respondError(error: CommandError): Observable<never> {

  }
}

export { SpoilerDzCommand };
