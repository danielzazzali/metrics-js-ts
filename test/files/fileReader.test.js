import path from 'path'
import { calculateMetrics } from '../../src/index.js'
import { fileURLToPath } from 'url'
import { beforeAll, describe, expect, it } from '@jest/globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

describe('fileReader.js', function () {
  describe('readDirectory', function () {
    const codePath = path.resolve(__dirname, '../test-src/ignore-test')
    const ignoreDirPath = path.resolve(__dirname, '../test-src/ignore-test/ignore-dir')
    let metricsResults

    beforeAll(async function () {
      metricsResults = await calculateMetrics({ codePath })
    })

    it('codePath is defined', () => {
      expect(metricsResults.files).toBeDefined()
      expect(metricsResults.files[ignoreDirPath]).toBeUndefined()
    })
  })
})
