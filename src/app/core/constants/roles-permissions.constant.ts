/**
 * Role and permission identifiers plus role-to-permission mapping.
 * Use these values in guards and authorization checks.
 */
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
  VIEWER: 'viewer',
} as const;

export const PERMISSIONS = {
  DASHBOARD: {
    VIEW: 'dashboard:view',
  },
  USERS: {
    READ: 'users:read',
    CREATE: 'users:create',
    UPDATE: 'users:update',
    DELETE: 'users:delete',
  },
  SETTINGS: {
    READ: 'settings:read',
    UPDATE: 'settings:update',
  },
} as const;

export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: ['*'],
  [ROLES.ADMIN]: [
    PERMISSIONS.DASHBOARD.VIEW,
    PERMISSIONS.USERS.READ,
    PERMISSIONS.USERS.CREATE,
    PERMISSIONS.USERS.UPDATE,
    PERMISSIONS.USERS.DELETE,
    PERMISSIONS.SETTINGS.READ,
    PERMISSIONS.SETTINGS.UPDATE,
  ],
  [ROLES.MANAGER]: [
    PERMISSIONS.DASHBOARD.VIEW,
    PERMISSIONS.USERS.READ,
    PERMISSIONS.USERS.UPDATE,
    PERMISSIONS.SETTINGS.READ,
  ],
  [ROLES.USER]: [PERMISSIONS.DASHBOARD.VIEW],
  [ROLES.VIEWER]: [PERMISSIONS.DASHBOARD.VIEW, PERMISSIONS.USERS.READ],
} as const;
