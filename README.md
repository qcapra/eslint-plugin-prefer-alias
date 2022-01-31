# eslint-plugin-prefer-alias

Restricts the usage of relative paths

## Installation

Install `eslint-plugin-ncl`:

```
$ TODO: command line
```

## Usage

Add it to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["prefer-alias"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "prefer-alias/prefer-alias-import": [
      "warn",
      {
        "folders": ["folder1", "folder2", "folder3"]
      }
    ]
  }
}
```
