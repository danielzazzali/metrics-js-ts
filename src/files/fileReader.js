import path from 'path'
import fs from 'fs/promises'
import { getIgnored, isSupported } from './ignoreAndSupport.js'

async function readDirectory (directory, ignoreFiles) {
  const files = await fs.readdir(directory, { withFileTypes: true })
  const arrayOfFiles = []

  await Promise.all(files.map(async (file) => {
    const absolutePath = path.resolve(directory, file.name)
    if (ignoreFiles.includes(absolutePath)) {
      return
    }

    if (file.isDirectory()) {
      const subFiles = await readDirectory(absolutePath, ignoreFiles)
      arrayOfFiles.push(...subFiles)
    } else if (isSupported(absolutePath)) {
      arrayOfFiles.push({
        filePath: absolutePath,
        fileName: file.name
      })
    }
  }))

  return arrayOfFiles
}

async function getFiles (path, ignoreMetricsFilePath) {
  const ignoreFiles = await getIgnored(ignoreMetricsFilePath)
  return await readDirectory(path, ignoreFiles)
}

export { getFiles }
