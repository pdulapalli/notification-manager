# Retrieve User

Get the contact information and preferences of the specified user.

**URL** : `/user/:id`

**Method** : `GET`

## Success Response

**Code** : `200 OK`

**Content Type** : `application/json`

**Response Format**

* `userId`: identifier GUID for the user
* `email`: user's email string or empty
* `phone`: user's 10-digit US phone string or empty
* `contactPreference`: preferred contact medium (`"email"`, `"sms"`, `"none"`)

**Response examples**

```json
{
  "userId": "fc3eb9a3-3911-4026-ab78-2f5868440d68",
  "email": "hello@world.magic",
  "phone": "1234567890",
  "contactPreference": "sms"
}
```

## Fail Response

**Code** : `404 Not Found`

**Content Type** : `text/plain`

**Response examples**

```
No such user
```