import { Client } from 'discord.js';
import { Config } from './config';
import { EventStreamer } from './app/event-streamer';
import { CommandDispatcher } from './app/dispatchers/command.dispatcher';
import { ChannelCommand } from './app/commands/channel.command';


const sproutyClient = new Client();
const eventStreamer = new EventStreamer(sproutyClient);
const dispatcher = eventStreamer.registerDispatcher(CommandDispatcher);
dispatcher.register(ChannelCommand);


sproutyClient.login(Config.botToken);
