import { HttpException } from './http.exception'

/**
 * Function that represents a simple express middleware, responsible for dealing with uncaught errors inside the application.
 *
 * @param error defines an object that represents the current exception caught inside the application.
 * @param _request defines the incoming request.
 * @param response defines the express response.
 * @param _next defines the method that should be called to move to the next middleware.
 */
export function errorHandler(error, _request, response, _next) {
  if (!(error instanceof HttpException)) {
    console.error(error)
    error = new HttpException(500, error.message)
  }

  response.status(error.statusCode).send(error)
}
