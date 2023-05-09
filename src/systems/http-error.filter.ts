import { HTTP_STATUS_MESSAGE } from '@/constants/http_status_message';
import { HttpStatus } from '@nestjs/common';
//TODO : tạo bản ghi đè HttpException
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const requests = ctx.getRequest();
    // lấy status từ ersponse
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR; // response sẽ trả về 404

    // tạo status khi có response lỗi
    const errResponse = {
      code: status, // status (404)
      timeRes: new Date(), // time error
      method: requests.method, // method POST / PUT / GET / DELETE
      message: exception.message || null, // message
      data: null,
      status: HTTP_STATUS_MESSAGE[status],
    };

    Logger.error(
      `${requests.method} ${requests.url}`,
      JSON.stringify(errResponse),
    );
    response.status(status).json(errResponse);
  }
}
