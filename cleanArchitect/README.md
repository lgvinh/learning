# Éc Éc

### Script
```

- npm run dev => Start development
- npm start => Start production

```

### __General__
The list of code conventions serves as a guideline as to which standards should be followed in programming:
- Usage of camelCase for variable naming

- Usage of readable method names

- Class names should follow TitleCase (a.k.a. upper CamelCase)

- Constants and environment variables should use All caps (uppercase)

- Avoid unnecessary whitespaces

- Add comments to variable declarations, methods and functions. JSDoc is the preferred tool.

- End files with a blank line

- Enforce usage of linter for checking for conventions

- Branch names must use the ticket number => OPT-XXXX

### Linting

Our team uses eslint tool for automatic linting check. ESLint is a pluggable linter for JavaScript highly configurable. In the team we use as a base configuration Airbnb's configuration as the style guide follows many of the BKMs in the industry. In addition this base configuration a set of extra rules were added by the team:

```
{
  "extends": "eslint-config-airbnb-base",
  "rules": {
    "no-console": ["error"],
    "import/no-extraneous-dependencies": {
      "optionalDependencies": true
    },
    "indent": [ "error", 4] ,
    "arrow-parens": ["error", "as-needed"],
    "max-len": [ "error", 120, 4, { "ignoreComments": true, "ignoreUrls": true} ],
    "no-underscore-dangle": [2, { "allowAfterThis": true }]
  },
  "env": {
    "jest": true,
    "es6": true,
    "node": true
  },
  "parserOptions": { "ecmaVersion": 9 }
}
```
More information:

- ESLint: https://eslint.org/

- Airbnb style guide: https://github.com/airbnb/javascript

### Errors
#### - _Error: listen EADDRINUSE: address already in use :::5000_
===> netstat -ano | findstr 5000

(Look for Process Indentifier in the end of each line)

===> taskkill /PID ... /F

(Insert the Process Indentifier in the etc...)


### API's endpoints naming rule (updating)
|                 | GET                     | POST                      | PUT                 | DELETE              |
| ----------------|:-----------------------:|:-------------------------:|:-------------------:|:-------------------:|
| /api/    | Get all (or pagination) | Create          | X                   | X                   |
| /api/:id| Get a specific  | X                         | Update a specific | Delete a specific |