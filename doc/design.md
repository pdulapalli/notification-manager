# Design Approach

## API

### Framework

Decided to use [Koa](https://koajs.com/) to keep the service scaffolding
itself lightweight while allowing customization.

### Validation

Aimed to offload as much interface validation logic onto [Joi](https://joi.dev/),
as this provides a good separation of concerns between route controller and
service logic.

### Endpoints

See the [example requests](./api.md) for further info.

#### User

Expose create/read/update operations on a `User`. Can set/update user contact preferences as
well as contact methods here.

#### Notification

Expose delivery and read operations for a `Notification`. Each notification
is attempted to be delivered immediately after creation, with the timestamp
reflecting this. By design, a notification is only persisted if it has been
delivered (per contact preference) successfully.

## Data

Decided to persist all delivered `Notification` data and `User` data to
ensure the service itself is stateless.

### DBMS

Opted to go with PostgreSQL, as the data naturally seemed to be a relational
model and Postgres offers a predictable relational engine.

### Model

There are two entities: the `Notification` and the `User`

Naturally, a `User` can have many notifications associated with them, and all
`Notification` must have an associated user, so the model emerged from this
reasoning.

Please refer to the model diagram [shown here](./dbModel.png)

## Future Considerations

- Would like to add an authentication mechanism, which would remove the need to pass in user IDs, can infer instead
- Role-based authorization would help narrow down endpoint access
- At the very least set up a Database migration tool, or even an ORM, for easier maintenance
- Convert service setup to be able to use Kubernetes (can use Minikube locally)

