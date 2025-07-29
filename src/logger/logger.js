class ErrorLogger {
  constructor () {
    this.fileErrors = []
    this.parseErrors = []
    this.metricErrors = []
    this.traverseErrors = []
  }

  static getInstance () {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger()
    }
    return ErrorLogger.instance
  }

  logFileError (msg) {
    this.fileErrors.push(msg)
  }

  logParseError (msg) {
    this.parseErrors.push(msg)
  }

  logMetricError (msg) {
    this.metricErrors.push(msg)
  }

  logTraverseError (msg) {
    this.traverseErrors.push(msg)
  }

  getFileErrors () {
    return [...this.fileErrors]
  }

  getParseErrors () {
    return [...this.parseErrors]
  }

  getMetricErrors () {
    return [...this.metricErrors]
  }

  getTraverseErrors () {
    return [...this.traverseErrors]
  }
}

/** @type {ErrorLogger} */
export const logger = ErrorLogger.getInstance()
