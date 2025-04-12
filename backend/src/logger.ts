export class Logger {
  static log(action: string, entity: string, id?: string | number) {
    const log = {
      timestamp: new Date().toISOString(),
      action,
      entity,
      todo_id: id ?? null,
    };

    console.log(JSON.stringify(log));
  }
}
