# Retrieve Notification

Get the contact information and preferences of the specified user.

**URL** : `/user/:id`

**Method** : `GET`

## Success Response

**Code** : `200 OK`

**Content Type** : `application/json`

**Response Format**

* `notificationId`: identifier GUID for the notification
* `userId`: identifier GUID for the user
* `title`: title for the notification to be sent
* `textContent`: the notification content text string
* `noteTime`: time the notification was sent

**Response examples**

```json
{
  "notificationId": "9a244819-9e1b-4c68-b162-f14c908192bc",
  "userId": "f14da1fa-9ad9-4b6a-9e8a-0107f744beb8",
  "title": "Space Magic",
  "textContent": "A short, short time ago in a galaxy super close.",
  "noteTime": "2019-09-27T14:52:32.237Z"
}
```

## Fail Response

**Code** : `404 Not Found`

**Content Type** : `text/plain`

**Response examples**

```
No such user
```