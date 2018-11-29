import { MessageValidator } from '../models/validator';
import { Config } from '../../config';
import { Message } from 'discord.js';

class CommandMessageValidator implements MessageValidator {
  public validate(): (message: Message) => boolean {
    return (message: Message) => {
      const activationRegex: RegExp = new RegExp('^\\' + Config.activationSymbol + Config.activationCommand + '(?:| .*)$');
      return activationRegex.test(message.content);
    };
  }
}

export { CommandMessageValidator };
