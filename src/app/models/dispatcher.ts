import { CommandFactory, ResponderFactory } from './responder';
import { Client, Message, MessageReaction } from 'discord.js';
import { MessageValidator, Validator } from './validator';
import { Observable } from 'rxjs';
import { MessageParsed, MessageParser, Parser } from './parser';

interface Dispatcher {
  event: DispatcherEvent;
  parser: Parser;
  validator: Validator;

  attachStream(stream: Observable<unknown>): void;
  detachStream(): void;
  register(ResponderFactory: ResponderFactory): void;
  unregister(ResponderFactory: ResponderFactory): void;
}

interface DispatcherFactory {
  new(client: Client): Dispatcher;
}

enum DispatcherEvent {
  Message = 'message',
}

type DiscordClientEvent = Message | MessageReaction;

interface MessageDispatcher {
  event: 'message';
  parser: MessageParser<MessageParsed>;
  validator: MessageValidator;

  attachStream(messageStream: Observable<MessageParsed>): void;
  register(Command: CommandFactory): void;
  unregister(Command: CommandFactory): void;
}

export { Dispatcher, DispatcherFactory, DispatcherEvent, DiscordClientEvent, MessageDispatcher };
