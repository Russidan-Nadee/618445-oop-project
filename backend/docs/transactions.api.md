# Transactions API

Base URL

```
http://localhost:3000
```

---

## Borrow Asset

POST `/transactions/borrow`


Request Body

```json
{
  "userId": 1,
  "assetId": 1,
  "note": "ยืมไปใช้งานประชุม"
}
```

> ใช้สำหรับบันทึกการยืมทรัพย์สิน

---

## Return Asset

POST `/transactions/return`


Request Body

```json
{
  "userId": 1,
  "assetId": 1,
  "note": "คืนเรียบร้อย"
}
```

> ใช้สำหรับบันทึกการคืนทรัพย์สิน

---

## Get All Transactions

GET `/transactions`

(no body)

---

## Get Transactions By User ID

GET `/transactions/user/:id`

Example

```
/transactions/user/1
```

---

## Get Transactions By Asset ID

GET `/transactions/asset/:id`

Example

```
/transactions/asset/3
```
