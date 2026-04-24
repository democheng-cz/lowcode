import {
  CallHandler,
  ExecutionContext,
  HttpException,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import type { Request } from 'express';

type ResponseBody<T> = {
  code: number;
  message: string;
  data: T;
  timestamp: number;
  path: string;
};

export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  ResponseBody<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ResponseBody<T>> | Promise<Observable<ResponseBody<T>>> {
    // 请求开始时间
    const startTime = performance.now();

    const request = context.switchToHttp().getRequest<Request>();
    const { method, url } = request;

    console.log(`[Request] ${method} ${url} started`);

    return next.handle().pipe(
      tap(() => {
        const duration = performance.now() - startTime;
        console.log(`[Response] ${method} ${url} ${duration}ms`);
      }),
      map((data: T) => {
        return {
          code: 0,
          message: 'success',
          data,
          timestamp: performance.now(),
          path: url,
        };
      }),
      catchError((err) => {
        const status = err instanceof HttpException ? err.getStatus() : 500;
        const message =
          err instanceof HttpException
            ? (err.getResponse() as { message: string }).message
            : (err as Error).message;

        return throwError(() => {
          return new HttpException(
            {
              code: status,
              message,
              data: null,
              timestamp: performance.now(),
              path: url,
            },
            status,
          );
        });
      }),
    );
  }
}
