import { Client } from 'discord.js';
import { CommandParsed, CommandParser, Parser } from './parser';
import { CommandValidator, Validator } from './validator';
import { Observable } from 'rxjs';

interface Responder {
  respond(input: unknown): unknown;
  respondError(error: Error): Observable<never>;
}

interface ResponderParams {

}

interface ResponderFactory {
  new(client: Client, responderParams: ResponderParams): Responder;
}

interface Command extends Responder {
  respond(commandParsed: CommandParsed): Observable<any>;
}

interface CommandParams extends ResponderParams {
  readonly command: string;
  readonly parser: CommandParser<CommandParsed>;
  readonly validator: CommandValidator;
}

interface CommandFactory extends ResponderFactory {
  new(client: Client, commandParams: CommandParams): Command;
}

export { Responder, ResponderParams, ResponderFactory, Command, CommandParams, CommandFactory };
