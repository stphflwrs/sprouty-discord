import { Observable } from 'rxjs';

interface ErrorHandler {
  handle(error: Error): Observable<never>;
}

export { ErrorHandler };
