# Metrics-JS-TS

This library is designed to calculate various code metrics for JavaScript and TypeScript files. It processes the code
files, generates Abstract Syntax Trees (ASTs), and applies different modular metrics to analyze code structure,
maintainability, and quality.

---

## Installation

To install the library, run:

```sh
npm install metrics-js-ts
```
---

## Usage

To use the library, import the `calculateMetrics` function and call it with the appropriate parameters:

```js
import { calculateMetrics } from 'metrics-js-ts'

const results = await calculateMetrics({
  codePath: './path/to/code',               // Required: string. Directory (Repository) to analyze.
  customMetricsPath: './path/to/custom/metrics', // Optional: string. Load additional metrics from this folder.
  useDefaultMetrics: true,                  // Optional: boolean. Load bundled/default metrics. Default: true.
  metricsIgnoreFilePath: 'path/to/.metricsignore' // Optional: string. Path to a .metricsignore file to skip files/directories.
})

console.log(results)
```

### Parameters

- `codePath` *(string, required)*  
  Path to the source code to analyze.
  - Should be a directory.
  - The analyzer will scan it recursively.

- `customMetricsPath` *(string, optional)*  
  Path to a directory containing user-defined metric modules.
  - Modules in this folder are loaded in addition to (or instead of) the built-in metrics.
  - Each custom module must export the expected metric structure (`state`, `visitors`, optional `postProcessing`).
  - If `customMetricsPath` is omitted and `useDefaultMetrics` is `false`, the loader will throw an error (since no metrics are available).

- `useDefaultMetrics` *(boolean, optional, default: `true`)*  
  Determines whether the built-in metrics provided by `metrics-js-ts` should be loaded.
  - Set to `true` to include them (default).
  - Set to `false` if you want to run only custom metrics.

- `metricsIgnoreFilePath` *(string, optional)*  
  Path to a `.metricsignore` file used to exclude files and directories from analysis.
  - The file should contain one entry per line.
  - Entries are evaluated relative to `codePath`.

### Behavior Summary

- `useDefaultMetrics: true` + no `customMetricsPath` → runs only built-in metrics.
- `useDefaultMetrics: true` + `customMetricsPath` → runs both built-in and custom metrics.
- `useDefaultMetrics: false` + `customMetricsPath` → runs only custom metrics.
- `useDefaultMetrics: false` + no `customMetricsPath` → throws an error (no metrics to load).

--- 

## Metrics

The library includes several built-in metrics:

* Files on Repository: Collects and records all source files in the repository by their path
* File Coupling: Measures file-level coupling by computing each file’s fan-in (dependent files) and fan-out (dependencies)
* Classes Per File: Counts the number of classes in each file.
* Methods Per File: Counts the number of methods in each file.
* Fan In Fan Out Per Function: Counts the number of functions that a function calls (Fan Out) and the number of other
  functions that call this first function (Fan In).
* Fan In Fan Out Per Class Method: Counts the number of classes that a class method calls (Fan Out) and the number of
  classes that call a class method (Fan In).

--- 

## Creating Custom Metrics

To add custom metrics, create a new module in the custom metrics directory and export the following:

* `state`: The initial state of the metric.
* `visitors`: An array of grouped visitors to traverse the AST, from first to last in execution order.
* `postProcessing` (optional): A function to perform post-processing on the collected data.

Example:

```js
const state = {
  metricName: 'Custom Metric',
  description: 'Description of the custom metric.',
  result: {},
  id: 'custom-metric-unique-id',
  dependencies: ['result-a', 'result-b'],
  status: false
  // Define state properties here
}

const visitors =
  {
    // Define visitors here
    // Program(path) { doSomething(path.node) }
    // ClassDeclaration(path) { doSomethingElse(path.node) }
  }

function postProcessing (state) {
  // Perform post-processing here
  if (state.currentFile) delete state.currentFile
  if (state.dependencies) delete state.dependencies

  state.status = true
}

export { state, visitors, postProcessing }
```