# Users API

Base URL

```
http://localhost:3000
```

---

## Create User

POST `/users`

Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

> หมายเหตุ: field ขึ้นกับ `CreateUserDto` ของคุณ

---

## Get All Users

GET `/users`

(no body)

---

## Get User By ID

GET `/users/:id`

Example

```
/users/1
```

---

## Update User

PATCH `/users/:id`

Request Body

```json
{
  "name": "John Edit",
  "email": "john_edit@example.com"
}
```

Example

```
/users/1
```

> หมายเหตุ: field ขึ้นกับ `UpdateUserDto`

---

## Delete User

DELETE `/users/:id`
