# Asset Types API

Base URL

```
http://localhost:3000
```

---

## Create Asset Type

POST `/asset-types`

Headers

```json
{
  "Content-Type": "application/json"
}
```

Request Body

```json
{
  "name": "Notebook"
}
```

---

## Get All Asset Types

GET `/asset-types`

(no body)

---

## Get Asset Type By ID

GET `/asset-types/:id`

Example

```
/asset-types/1
```

---

## Update Asset Type

PATCH `/asset-types/:id`

Headers

```json
{
  "Content-Type": "application/json"
}
```

Request Body

```json
{
  "name": "Computer"
}
```

Example

```
/asset-types/1
```

---

## Delete Asset Type

DELETE `/asset-types/:id`

(no body)

Example

```
/asset-types/1
```
