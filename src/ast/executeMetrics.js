import traverse from '@babel/traverse'
import { MESSAGES } from '../constants/constants.js'
import { kahnSort } from '../sorting/kahnSort.js'
import { logger } from '../logger/logger.js'

/**
 * Sort metric objects and initialize result map
 * @param {Array} metricObjects
 * @returns {{ sortedMetrics: Array, resultMap: Object }}
 */
function sortAndInit (metricObjects) {
  const sortedMetrics = kahnSort(metricObjects)
  const resultMap = {}
  return { sortedMetrics, resultMap }
}

/**
 * Resolve dependencies for a single metric
 * @param {Object} metric
 * @param {Object} resultMap
 */
function resolveDependencies (metric, resultMap) {
  const deps = Array.isArray(metric.state.dependencies)
    ? metric.state.dependencies
    : []
  metric.state.dependencies = {}

  for (const depId of deps) {
    metric.state.dependencies[depId] = structuredClone(resultMap[depId])
  }
}

/**
 * Traverse all ASTs with metric visitors
 * @param {Object} metric
 * @param {Array} ASTs
 */
function traverseASTs (metric, ASTs) {
  const visitorsArray = [metric.visitors]

  for (const visitors of visitorsArray) {
    for (const ast of ASTs) {
      try {
        traverse.default(ast, visitors, null, metric.state)
      } catch (error) {
        logger.logTraverseError(
          `${MESSAGES.ERRORS.ERROR_TRAVERSING_AST} ${metric.state.id} ${error.message}`
        )
      }
    }
  }
}

/**
 * Execute post-processing (if exists) and store the result
 * @param {Object} metric
 * @param {Object} resultMap
 */
function postProcessAndStore (metric, resultMap) {
  if (metric.postProcessing) {
    metric.postProcessing(metric.state)
  }
  resultMap[metric.state.id] = metric.state.result
}

/**
 * Build the final index object
 * @param {Array} sortedMetrics
 * @param {Object} resultMap
 * @returns {Object}
 */
function buildFinalResult (sortedMetrics, resultMap) {
  const output = {}

  for (const metric of sortedMetrics) {
    if (metric.state.ignore) continue

    const { id, ...stateWithoutId } = metric.state
    output[id] = stateWithoutId
  }

  // Append logger errors
  output.errors = {
    file: logger.getFileErrors(),
    parse: logger.getParseErrors(),
    metric: logger.getMetricErrors(),
    traverse: logger.getTraverseErrors()
  }
  return output
}

/**
 * Executes a series of metrics against provided ASTs.
 * Maintains original interface and behavior.
 *
 * @param {Array} metricObjects - List of metric definitions
 * @param {Array} ASTs          - List of parsed ASTs to traverse
 * @returns {Promise<Object>}   - Final result map including errors
 */
async function executeMetrics (metricObjects, ASTs) {
  const { sortedMetrics, resultMap } = sortAndInit(metricObjects)

  for (const metric of sortedMetrics) {
    resolveDependencies(metric, resultMap)
    traverseASTs(metric, ASTs)
    postProcessAndStore(metric, resultMap)
  }

  return buildFinalResult(sortedMetrics, resultMap)
}

export { executeMetrics }
