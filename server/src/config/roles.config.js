module.exports = {
  Admin: {
    "users:read": true,
    "users:update": true,
    "users:delete": true,
    "posts:create": true,
    "posts:delete": true,
    "posts:update": true,
    "posts:read": true,
  },

  Editor: {
    "posts:create": true,
    "posts:read": true,
    "posts:update": true,
    "posts:delete": true,
  },

  Viewer: {
    "posts:read": true,
  }
};
