# Metrics-JS-TS

**Metrics-JS-TS** is a lightweight and extensible library for calculating **code metrics** in JavaScript and TypeScript repositories.  
It parses your code, generates **Abstract Syntax Trees (ASTs)**, and applies a collection of built-in or custom metrics to analyze **code structure, maintainability, and quality**.


## ✨ Features

- 📦 **Built-in Metrics**: Includes a curated set of default metrics (files, functions, classes, coupling, etc.).
- 🧩 **Custom Metrics**: Easily add your own metrics by creating modules with visitors and post-processing hooks.
- 🔍 **AST-Powered Analysis**: Uses AST traversal to provide accurate, in-depth results.
- 🚫 **Ignore Files**: Skip specific files or directories via a `.metricsignore` file.
- ⚙️ **Flexible Configuration**: Choose to load built-in metrics, custom metrics, or both.


## 📦 Installation

```sh
npm install metrics-js-ts
```


## 🚀 Usage

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


## ⚙️ Parameters

| Parameter                | Type      | Required | Default | Description                                                                                     |
|--------------------------|-----------|----------|---------|-------------------------------------------------------------------------------------------------|
| `codePath`               | `string`  | ✅       | —       | Path to the source code directory to analyze. The analyzer will scan it recursively.           |
| `customMetricsPath`      | `string`  | ❌       | —       | Path to a folder containing custom metric modules.                                             |
| `useDefaultMetrics`      | `boolean` | ❌       | `true`  | Whether to load built-in metrics. Set to `false` to run only custom metrics.                   |
| `metricsIgnoreFilePath`  | `string`  | ❌       | —       | Path to a `.metricsignore` file (one path per line) to skip files or directories.              |

### Behavior Matrix

| `useDefaultMetrics` | `customMetricsPath`         | Metrics Loaded                 |
|---------------------|----------------------------|-------------------------------|
| `true`              | _(not provided)_          | Built-in metrics only         |
| `true`              | ✅ Provided               | Built-in + custom metrics     |
| `false`             | ✅ Provided               | Custom metrics only           |
| `false`             | _(not provided)_          | ❌ Throws error (no metrics)  |


## 🛠️ Creating Custom Metrics

To add your own metrics:

1. Create a new module in your custom metrics directory.
2. Export the following:
    - `state`: Initial state of the metric.
    - `visitors`: AST visitors to collect data.
    - `postProcessing` *(optional)*: A function to finalize results.

**Example:**

```js
const state = {
  metricName: 'Custom Metric',
  description: 'Description of the custom metric.',
  result: {},
  id: 'custom-metric-unique-id',
  dependencies: ['result-a', 'result-b'],
  status: false
}

const visitors = {
  // Example visitors:
  // Program(path) { doSomething(path.node) ... }
  // ClassDeclaration(path) { doSomethingElse(path.node) ... }
}

function postProcessing(state) {
  // Clean up or finalize the metric
  if (state.currentFile) delete state.currentFile
  if (state.dependencies) delete state.dependencies
  state.status = true
}

export { state, visitors, postProcessing }
```


## 🤝 Contributing

Contributions are welcome!  
Feel free to open issues or submit pull requests to:

- Add new metrics
- Improve documentation
- Fix bugs

> Developed on **Linux** with **Node.js 22.14.0 LTS**.


## 📜 License

MIT License © 2025 Daniel Zazzali