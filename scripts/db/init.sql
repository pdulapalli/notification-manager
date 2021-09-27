CREATE TYPE contact_media AS ENUM ('email', 'sms', 'none');
CREATE TABLE users (
  user_id CHAR(36) PRIMARY KEY,
  email VARCHAR(254),
  phone CHAR(10),
  contact_preference contact_media
);

CREATE TABLE notifications (
  notification_id CHAR(36) PRIMARY KEY,
  title VARCHAR(70),
  text_content VARCHAR(1000),
  note_time TIMESTAMP WITH TIME ZONE,
  user_id CHAR(36),
  CONSTRAINT fkey_user
    FOREIGN KEY(user_id)
    REFERENCES users(user_id)
);