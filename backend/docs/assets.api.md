# Assets API

Base URL

```
http://localhost:3000
```

---

## Create Asset

POST `/assets`

Request Body

```json
{
  "name": "Notebook Dell",
  "serialNumber": "SN-001",
  "purchaseDate": "2024-01-01T00:00:00.000Z",
  "typeId": 1
}
```

---

## Get All Assets

GET `/assets`

(no body)

---

## Get Asset By ID

GET `/assets/:id`

Example

```
/assets/1
```

---

## Get Assets By Type

GET `/assets/type/:typeId`

Example

```
/assets/type/2
```

---

## Update Asset

PATCH `/assets/:id`

Request Body (example)

```json
{
  "name": "Notebook Dell Edit",
  "serialNumber": "DL-2024-001-Edit",
  "typeId": 1
}
```

---

## Delete Asset

DELETE `/assets/:id`

(no body)
