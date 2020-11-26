# **Server**

### __Need to know before start !!!__
```

- mysql
- wamp
- nodejs
- typescript
- eslint
- jwt

```
---

### Node version
- < 13 **(ts-node can't run in node v13)**

### Prepare the dotenv
- Create .env file in root folder
- Copy the .env.sample code
- Paste into .env

### Run source:
- `npm install`
- Dev: npm run dev
- Product: npm run build

---
### __File Structure__

- `Api`
  - `Controller`
    - AuthController.ts
    - MainController.ts
  - `Routes`
    - `_`
      - `Brand`
        - Index.ts
      - `Perfume`
        - `Join`
          - index.ts
          - brand_price_admin.ts
        - Index.ts
      - `Signin`
      - `Signup`
    - Main.ts
  - `Helper`
    - jwt.helper.ts
  - `Middleware`
    - AuthMiddleware.ts
- `Config`
  - Config.ts
- index.ts
- .env
- .babelrc
- .eslintrc.json
- .gitignore
- package.json
- tsconfig.json


----
### __API's endpoints__

|                 | GET                     | POST                      | PUT                 | DELETE              |
| ----------------|:-----------------------:|:-------------------------:|:-------------------:|:-------------------:|
| /api/perfume    | Get all (or pagination) | Create a perfume          | X                   | X                   |
| /api/perfume/:id| Get a specific perfume  | X                         | Update a specific perfume | Delete a specific perfume |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

---

### Errors??

#### - _Typesciprt or ts-node is not a external/internal command_
===> `npm install -g typescript ts-node`

#### - _Can't find DB_Host DB_Name ..._
===> Look the **Prepare the dotenv** section

#### - _ECONNREFUSED on 127.0.0.1:3306_
===> Check process.env by console.log it to see if it have declare or not

===> If console not work, check the mysql's port, change into port 3306

#### - _Error: listen EADDRINUSE: address already in use :::5000_
===> netstat -ano | findstr 5000 
(Look for Process Indentifier in the end of each line)

===> taskkill /PID ... /F
(Insert the Process Indentifier)