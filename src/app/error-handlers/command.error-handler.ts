import { CommandError } from '../models/error';
import { from, NEVER, Observable } from 'rxjs';
import { ErrorHandler } from '../models/error-handler';
import { flatMap } from 'rxjs/operators';

class CommandErrorHandler implements ErrorHandler {
  public handle({ message, source }: CommandError): Observable<never> {
    return from(source._message.reply(message)).pipe(
        flatMap(() => NEVER),
    );
  }
}

export { CommandErrorHandler };
