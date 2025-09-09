import path from 'path'
import { calculateMetrics } from '../../src/index.js'
import { fileURLToPath } from 'url'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

describe('Class Coupling Metric', function () {
  const codePath = path.resolve(__dirname, '../test-src/class-coupling')
  const jsFile = path.resolve(__dirname, '../test-src/class-coupling/JS/')

  beforeEach(() => {
    jest.resetModules()
  })

  // it('metricsResults is defined', async () => {
  //   const metricsResults = await calculateMetrics({ codePath })
  //   expect(metricsResults).toBeDefined()
  // })
  //
  // it('Metric is defined, has correct name, description and status and contains result', async () => {
  //   const metricsResults = await calculateMetrics({ codePath })
  //
  //   expect(metricsResults).toHaveProperty('class-coupling')
  //   expect(metricsResults['class-coupling'])
  //     .toHaveProperty('name', 'Class Coupling')
  //   expect(metricsResults['class-coupling'].description).toBeDefined()
  //   expect(metricsResults['class-coupling'].description)
  //     .toContain('Analyzes each class to identify Fan-Out and Fan-In')
  //   expect(metricsResults['class-coupling'].result).toBeDefined()
  //   expect(metricsResults['class-coupling'].status).toBeTruthy()
  // })

  it('Metric result contains JS src testing file', async () => {
    const metricsResults = await calculateMetrics({ codePath: jsFile })
    expect(metricsResults['class-coupling'].status).toBeTruthy()

    const results = metricsResults['class-coupling'].result

    // console.log(JSON.stringify(results, null, 2))
  })
  //
  // it('Metric result contains TS src testing file', () => {
  //   expect(metricsResults['class-coupling'].result[tsFile]).toBeDefined()
  // })
  //
  // it('Should compute the correct metric structure for JS file', function () {
  //
  // })
  //
  // it('should compute the correct metric structure for TS file', function () {
  //   expect(metricsResults['class-coupling'].result[tsFile]).toBeDefined()
  // })
})
