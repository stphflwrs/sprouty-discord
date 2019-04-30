import { Client } from 'discord.js';
import { from, Observable, of, Subject } from 'rxjs';
import { Command, CommandFactory, CommandParams } from '../models/responder';
import { catchError, filter, flatMap, map, switchMap, takeWhile, tap } from 'rxjs/operators';
import { DispatcherEvent, MessageDispatcher } from '../models/dispatcher';
import { CommandMessageParsed, CommandMessageParser } from '../parsers/command-message.parser';
import { CommandMessageValidator } from '../validators/command-message.validator';

class CommandDispatcher implements MessageDispatcher {
  public readonly event = DispatcherEvent.Message;
  public readonly parser: CommandMessageParser = new CommandMessageParser();
  public readonly validator: CommandMessageValidator = new CommandMessageValidator();

  private commandStream: Subject<CommandMessageParsed> = new Subject<CommandMessageParsed>();
  private registeredCommands: Map<CommandFactory, Command> = new Map<CommandFactory, Command>();

  public constructor(private client: Client) {}

  public attachStream(commandStream: Observable<CommandMessageParsed>): void {
    commandStream.pipe(
        tap(({ _message }: CommandMessageParsed) => from(_message.delete())),
    ).subscribe(this.commandStream);
  }

  public detachStream(): void {
    this.commandStream.complete();
  }

  public register(Command: CommandFactory, commandParams: CommandParams): Command {
    const command = new Command(this.client, commandParams);
    this.registeredCommands.set(Command, command);
    this.commandStream.pipe(
        takeWhile(() => this.registeredCommands.has(Command)),
        filter(({ command: commandName }: CommandMessageParsed) => commandParams.command === commandName ),
        switchMap((commandMessageParsed: CommandMessageParsed) => {
          return of(commandMessageParsed).pipe(
              filter(commandParams.validator.validate()),
              catchError(command.respondError),
          );
        }),
        map(commandParams.parser.parse),
        flatMap(command.respond.bind(command)),
    ).subscribe();
    return command;
  }

  public unregister(Command: CommandFactory): void {
    this.registeredCommands.delete(Command);
  }

  public unregisterAll(): void {
    this.registeredCommands.clear();
  }
}

export { CommandDispatcher };
