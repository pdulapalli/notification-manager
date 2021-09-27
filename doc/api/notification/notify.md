# Notify User

Given some notification content, and the user to notify, create and deliver a
notification to that user per their contact info and preferences. Return the
created notification.

**URL** : `/notification`

**Method** : `POST`

**Request Format**

* `userId`: the GUID of the user to notify
* `title`: title for the notification to be sent
* `textContent`: the notification content text string

**Request example**

```json
{
  "userId": "f14da1fa-9ad9-4b6a-9e8a-0107f744beb8",
  "title": "Space Magic",
  "textContent": "A short, short time ago in a galaxy super close."
}
```

## Success Response

**Code** : `200 OK`

**Content Type** : `application/json`

**Response Format**

* `notificationId`: identifier GUID for the notification
* `userId`: identifier GUID for the user
* `title`: title for the notification to be sent
* `textContent`: the notification content text string
* `noteTime`: time the notification was sent

**Response example**

```json
{
  "notificationId": "9a244819-9e1b-4c68-b162-f14c908192bc",
  "userId": "f14da1fa-9ad9-4b6a-9e8a-0107f744beb8",
  "title": "Space Magic",
  "textContent": "A short, short time ago in a galaxy super close.",
  "noteTime": "2019-09-27T14:52:32.237Z"
}
```