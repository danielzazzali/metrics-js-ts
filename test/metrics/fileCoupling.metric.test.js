import path from 'path'
import { calculateMetrics } from '../../src/index.js'
import { fileURLToPath } from 'url'
import { describe, expect, it } from '@jest/globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

describe('File Coupling Metric', function () {
  const codePath = path.resolve(__dirname, '../test-src/file-coupling/')

  it('metricsResults is defined', async () => {
    const metricsResults = await calculateMetrics({ codePath })

    console.log(JSON.stringify(metricsResults, null, 2))

    expect(metricsResults).toBeDefined()
  })
})
