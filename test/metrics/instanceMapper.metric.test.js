import { jest, describe, it, beforeEach, expect } from '@jest/globals'
import path from 'path'
import { calculateMetrics } from '../../src/index.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

describe('Instance Mapper Metric', () => {
  const codePath = path.resolve(__dirname, '../test-src/instance-mapper')
  let metricsResults

  beforeEach(async () => {
    jest.resetModules()
    metricsResults = await calculateMetrics({ codePath })
  })

  it('metricsResults is defined', () => {
    expect(metricsResults).toBeDefined()

    const result = metricsResults['instance-mapper']
  })
})
