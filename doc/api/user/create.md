# Create User

Create a user with contact info and preferences, then return the user details.

**URL** : `/user`

**Method** : `POST`

**Request Format**

* `email`: user's email string (optional, unless `contactPreference` is `"email"`)
* `phone`: user's 10-digit US phone string (optional, unless `contactPreference` is `"sms"`)
* `contactPreference`: preferred contact medium (`"email"`, `"sms"`, `"none"`) (required)

**Request example**

```json
{
  "email": "hello@world.magic",
  "contactPreference": "sms"
}
```

## Success Response

**Code** : `200 OK`

**Content Type** : `application/json`

**Response example**

```json
{
  "userId": "fc3eb9a3-3911-4026-ab78-2f5868440d68",
  "email": "hello@world.magic",
  "phone": "",
  "contactPreference": "sms"
}
```