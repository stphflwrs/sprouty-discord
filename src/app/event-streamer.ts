import { Client, Message } from 'discord.js';
import { fromEvent, Observable } from 'rxjs';
import { DispatcherFactory, Dispatcher, DispatcherEvent, DiscordClientEvent } from './models/dispatcher';
import { filter, map, takeWhile, tap } from 'rxjs/operators';
import { ensureCategoryChannel } from './bootstrap/category-channel';

class EventStreamer {
  private registeredDispatchers: Map<DispatcherFactory, Dispatcher> = new Map<DispatcherFactory, Dispatcher>();
  private streams: Map<DispatcherEvent, Observable<DiscordClientEvent>> = new Map<DispatcherEvent, Observable<DiscordClientEvent>>();

  public constructor(private client: Client) {
    this.streams.set(DispatcherEvent.Message, (fromEvent(this.client, DispatcherEvent.Message) as Observable<Message>).pipe(
        tap(({ guild }: Message) => ensureCategoryChannel(guild)),
    ));
  }

  public registerDispatcher(Dispatcher: DispatcherFactory): Dispatcher {
    const dispatcher: Dispatcher = new Dispatcher(this.client);
    this.registeredDispatchers.set(Dispatcher, dispatcher);
    const dispatchStream = (this.streams.get(dispatcher.event) as Observable<DiscordClientEvent>).pipe(
        takeWhile(() => this.registeredDispatchers.has(Dispatcher)),
        filter(dispatcher.validator.validate()),
        map(dispatcher.parser.parse),
    );
    dispatcher.attachStream(dispatchStream);
    return dispatcher;
  }

  public unregisterDispatcher(Dispatcher: DispatcherFactory) {
    const dispatcher = this.registeredDispatchers.get(Dispatcher);
    dispatcher.detachStream();
    this.registeredDispatchers.delete(Dispatcher);
  }
}

export { EventStreamer };
