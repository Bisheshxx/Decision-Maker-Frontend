export class ApiErrorHandler extends Error {
  response: {
    success: false;
    errors: string | string[];
    message: string;
    errorType: string;
    data?: undefined;
  };

  constructor(response: {
    success: false;
    errors: string | string[];
    message: string;
    errorType: string;
    data?: undefined;
  }) {
    super(
      typeof response.errors === "string"
        ? response.errors
        : response.errors.join(", "),
    );
    this.name = "ApiError";
    this.response = response;
  }
}
