CREATE TYPE contact_media AS ENUM ('email', 'sms', 'none');
CREATE TABLE users (
    user_id CHAR(36) PRIMARY KEY,
    email VARCHAR(254),
    phone CHAR(10),
    contact_preference contact_media
);