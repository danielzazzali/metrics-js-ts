import fs from 'fs/promises'
import { parse } from '@babel/parser'
import { BABEL_PARSER_OPTIONS, FILE_ENCODING, KEYS_TO_REMOVE, MESSAGES } from '../constants/constants.js'
import { logger } from '../logger/logger.js'

function cleanAST (node, parent) {
  if (node === null) return

  if (Array.isArray(node)) {
    // If the node is an array, recursively clean each child
    for (const child of node) {
      cleanAST(child)
    }
    return
  }

  // Remove each location key if present
  for (const key of KEYS_TO_REMOVE) {
    if (key in node) {
      delete node[key]
    }
  }

  // Recurse into any child objects or arrays
  for (const value of Object.values(node)) {
    if (value && (Array.isArray(value) || typeof value === 'object')) {
      cleanAST(value)
    }
  }
}

async function getSourceCode (filePath) {
  try {
    return await fs.readFile(filePath, FILE_ENCODING)
  } catch (error) {
    logger.logFileError(`${MESSAGES.ERRORS.ERROR_READING_SOURCE_CODE} ${filePath}: ${error.message}`)
    return null
  }
}

async function getAST (filePath) {
  const code = await getSourceCode(filePath)
  if (!code) return null

  try {
    return parse(code, BABEL_PARSER_OPTIONS)
  } catch (error) {
    logger.logParseError(`${MESSAGES.ERRORS.ERROR_PARSING_FILE} ${filePath}: ${error.message}`)
    return null
  }
}

async function constructASTs (files) {
  const astPromises = files.map(async (file) => {
    const ast = await getAST(file.filePath)

    if (ast === null) return

    cleanAST(ast, ast)

    // Add metadata to AST
    ast.program.filePath = file.filePath

    return ast
  })

  const results = await Promise.all(astPromises)

  return results.filter((ast) => ast != null)
}

export { constructASTs }
