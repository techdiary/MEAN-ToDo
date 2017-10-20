export class MongoResult {
  success: boolean;
  data: Array<object>;
  error: string;

  constructor(success: boolean, data?: Array<object>, error?: string) {
    this.success = success;
    this.data = data;
    this.error = error;
  }
}
