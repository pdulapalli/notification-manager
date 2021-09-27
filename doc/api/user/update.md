# Update User

Update the contact info and preferences for a user, then return the user details.

Depending on what the to-be-updated / end state of the `contactPreference`
is, the user must have the necessary contact details at the end of the update.
For example, the contact method cannot be changed from `"none"` to `"email"` if
the user does not have an email after the update. If the user already has an email,
however, then the update is valid.

**URL** : `/user/:id`

**Method** : `PUT`

**Request Format**

* `email`: user's email string (optional, unless `contactPreference` is `"email"`)
* `phone`: user's 10-digit US phone string (optional, unless `contactPreference` is `"sms"`)
* `contactPreference`: preferred contact medium (`"email"`, `"sms"`, `"none"`)

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

## Fail Response - Nonexistent User

**Code** : `404 Not Found`

**Content Type** : `text/plain`

**Response examples**

```
No such user
```

## Fail Response - Invalid Update

**Code** : `400 Bad Request`

**Content Type** : `text/plain`

**Starting State** :

```json
{
  "userId": "40515903-6f06-4929-8db2-735b84ae35a0",
  "email": "hi@example.com",
  "phone": "",
  "contactPreference": "email"
}
```

**Invalid Request Body example** :

Fails because the user does not have a phone number

```json
{
  "contactPreference": "sms"
}
```

**Response examples**

```
Input was not valid
```