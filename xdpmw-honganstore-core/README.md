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
  - `Routes`
    - `_`
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
### __ENDPOINTS__


- __Variant__
  - __GET__
    - __Có "/join/full" là api đó sẽ trả về full thông tin variant như tên size, tên color, tên cate, ...__
    - /api/variant/?skip=...&limit=... => (Lấy variant theo phân trang)
    - /api/variant/single/:id => (Lấy 1 variant theo id của cloth)
    - /api/variant/all => (Lấy tất cả variant, chỉ có thể truy cập bằng admin)
    ===============================================
    - /api/variant/join/full/?skip=...&limit=... => (Lấy full thông tin variant theo phân trang)
    - /api/variant/join/full/all => (Lấy hết tất cả các variant full thông tin)
    - /api/variant/join/full/single/:id => (Lấy cụ thể 1 variant qua id của cloth)
    - /api/variant/join/full/cate/:id => (Lấy các variant thuộc category id)
    ===============================================
    - /api/variant/join/size-color/:id => (Lọc size và color có trong cloth đó qua cloth id) (nên gọi khi vào trang detail của sản phẩm)
- __Sign In__
  - __POST__: /signin
- __Sign Up__
  - __POST__: /signup
- __User__
  - __GET__:
    - /api/user/?skip=...&limit=... => (Lấy user theo phân trang)
    - /api/user/all => (Lấy hết tất cả user, cần có quyền admin)
    - /api/user/single/:id => (Lấy cụ thể 1 user qua id, cần trùng id trong token với id trên params hoặc có quyền admin)
    - /api/user/info => (Lấy thông tin user qua token gửi lên header)
  - __POST__: 
    - /api/user/add => (Thêm user, số lượng chỉ đc 1)
    - => Mẫu: {
          firstName: "...",
          lastName: "...",
          password: "...",
          email: "...",
          phone: "...",
          address: "..."
        }
  - __PUT__:
    - /api/user/update/:id => (Update thông tin user, không bao gồm password, số lượng 1 user trên 1 lần gửi, cần trùng id trong token với id trên params hoặc có quyền admin) (Có gửi password qua body thì cũng k update password)
    - => Mẫu: {
          firstName: "...",
          lastName: "...",
          email: "...",
          phone: "...",
          address: "..."
        }
    - /api/user/update-password/:id => (Update password user, số lượng 1 user trên 1 lần gửi, cần trùng id trong token với id trên params hoặc có quyền admin) 
    - => Mẫu: { oldPassword: "...", newPassword: "..." }
  - __DELETE__:
    - /api/user/delete/:id (Xóa 1 user cụ thể qua id user, cần quyền admin)
    - /api/user/delete-multiple/:id (Xóa nhiều user qua ids đc gửi body, có thể chỉ gửi 1-n, không đc gửi 0, cần quyền admin) (Lưu ý: ids có "s")
    - => Mẫu: {ids: [1,2,3,4,5]}
- __Cloth__
  - __GET__
    - /api/cloth/?skip=...?&limit=... => (Lấy cloth theo phân trang)
    - /api/cloth/single/:id => (Lấy cụ thể 1 cloth qua cloth id)
    - /api/cloth/all => (Lấy tất cả cloth, cần quyền admin)
    - /api/cloth/cate/:id => (Lấy cloth qua cate id)

---

### Errors??

#### - _Typesciprt or ts-node is not a external/internal command_
===> `npm install -g typescript ts-node`

#### - _Can't find DB_Host DB_Name ..._
===> Look the **Prepare the dotenv** section

#### - _ECONNREFUSED on 127.0.0.1:3306_
===> Check process.env by console.log it to see if it have declare or not

===> If console not work, check the mysql's port in wamp, change into port 3306
