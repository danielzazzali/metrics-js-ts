import { getFiles } from './files/fileReader.js'
import { constructASTs } from './ast/astProcessor.js'
import { executeMetrics } from './ast/executeMetrics.js'
import { MESSAGES } from './constants/constants.js'
import { loadMetricFiles, loadMetricObjects } from './loader/metricsLoader.js'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function calculateMetrics ({
  codePath,
  customMetricsPath,
  useDefaultMetrics = true,
  metricsIgnoreFilePath = null
} = {}) {
  if (!useDefaultMetrics && !customMetricsPath) {
    throw new Error(MESSAGES.ERRORS.ERROR_NO_METRICS)
  }

  if (!path.isAbsolute(codePath)) {
    throw new Error(`${MESSAGES.ERRORS.ERROR_CODE_PATH_NOT_ABSOLUTE} "${codePath}"`)
  }

  const codeFiles = await getFiles(codePath, metricsIgnoreFilePath)
  const ASTs = await constructASTs(codeFiles)

  const metricFiles = await loadMetricFiles(useDefaultMetrics,
    customMetricsPath, __dirname)
  const metricObjects = await loadMetricObjects(metricFiles)

  return await executeMetrics(metricObjects, ASTs)
}

// const codePath = "/home/daniel/Workspace/metrics-js-ts/test/test-src/file-coupling"
//
// const metricsResults = await calculateMetrics({ codePath })
//
// const result = metricsResults["file-coupling"]
//
// console.log(JSON.stringify(result, null, 2))



export { calculateMetrics }
