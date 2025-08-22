import path from 'path'
import { calculateMetrics } from '../../src/index.js'
import { fileURLToPath } from 'url'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

describe('File Coupling Metric', function () {
  const codePath = path.resolve(__dirname, '../test-src/file-coupling/')
  let metricResults

  beforeEach(async () => {
    jest.resetModules()
    metricResults = await calculateMetrics({ codePath })
  })

  it('metricsResults is defined', () => {
    expect(metricResults).toBeDefined()
  })

  it('File Coupling metric is defined, has correct name, description and status and contains result', () => {
    expect(metricResults).toHaveProperty("file-coupling")
    expect(metricResults['file-coupling']).toHaveProperty('name', 'File Coupling')
    expect(metricResults['file-coupling'].description).toBeDefined()
    expect(metricResults['file-coupling'].description).toContain('Measures file-level coupling by computing each file’s fan-in (dependent files) and fan-out (dependencies)')
    expect(metricResults['file-coupling'].result).toBeDefined()
    expect(metricResults['file-coupling'].status).toBeTruthy()
  })
})
