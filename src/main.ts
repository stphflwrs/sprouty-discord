import { Client } from 'discord.js';
import { Config } from './config';
import { EventStreamer } from './app/event-streamer';
import { CommandDispatcher } from './app/dispatchers/command.dispatcher';
import { ChannelCommand } from './app/commands/channel.command';
import { ChannelCommandParser } from './app/parsers/channel-command.parser';
import { ChannelCommandValidator } from './app/validators/channel-command.validator';


const sproutyClient = new Client();
const eventStreamer = new EventStreamer(sproutyClient);
const dispatcher: CommandDispatcher = eventStreamer.registerDispatcher(CommandDispatcher) as CommandDispatcher;
dispatcher.register(ChannelCommand, { command: 'channel', parser: new ChannelCommandParser(), validator: new ChannelCommandValidator() });


sproutyClient.login(Config.botToken);
