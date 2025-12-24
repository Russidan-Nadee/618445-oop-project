# Logs API

Base URL

```
http://localhost:3000
```

---

## Get All Logs

GET `/logs`

(no body)

---

## Get Logs By User ID

GET `/logs/user/:userId`

Example

```
/logs/user/1
```

> ใช้ดูประวัติการทำรายการทั้งหมดของผู้ใช้

---

## Get Logs By Target ID

GET `/logs/target/:targetId`

Example

```
/logs/target/5
```

> ใช้ดูประวัติการใช้งานของทรัพย์สินหรือเป้าหมาย

---
