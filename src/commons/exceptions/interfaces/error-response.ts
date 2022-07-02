export interface ErrorResponse {
  code: number;
  path: string;
  timestamp: string;
  httpStatus: number;
  description: string;
  developMessage?: string;
}
