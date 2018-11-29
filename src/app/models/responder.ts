import { Client } from 'discord.js';
import { CommandParsed, CommandParser, Parser } from './parser';
import { CommandValidator, Validator } from './validator';
import { Observable } from 'rxjs';

interface Responder {
  readonly parser: Parser;
  readonly validator: Validator;

  respond(input: unknown): unknown;
}

interface ResponderFactory {
  new(client: Client): Responder;
}

interface Command extends Responder {
  readonly command: string;
  readonly parser: CommandParser<CommandParsed>;
  readonly validator: CommandValidator;

  respond(commandParsed: CommandParsed): Observable<any>;
}

interface CommandFactory extends ResponderFactory {
  new(client: Client): Command;
}

export { Responder, ResponderFactory, Command, CommandFactory };
