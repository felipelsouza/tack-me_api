/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger';
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { Exception } from '@adonisjs/core/build/standalone';

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger);
  }

  public async handle(error: Exception, ctx: HttpContextContract): Promise<any> {
    if (error.status === 422) {
      return ctx.response.status(error.status).send({
        code: 'BAD_REQUEST__INVALID_DATA',
        message: error['messages']?.errors?.[0]?.message || ctx.i18n.formatMessage('common.invalidData')
      });
    }

    if (error.code === 'E_ROW_NOT_FOUND') {
      return ctx.response.status(error.status).send({
        code: 'NOT_FOUND__RESOURCE_NOT_FOUND',
        message: ctx.i18n.formatMessage('common.resourceNotFound')
      });
    }

    return super.handle(error, ctx);
  }
}
