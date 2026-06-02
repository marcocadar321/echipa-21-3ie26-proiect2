import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET') || 'unSecretAdminFoarteLungSiRandom123456',
  },
  apiToken: {
    salt: env('API_TOKEN_SALT') || 'unSaltPentruAPITokenRandom123456',
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT') || 'unSaltPentruTransferRandom123456',
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY') || 'oCheieDeCriptareRandomDeMin32Caractere',
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    docLinks: env.bool('FLAG_DOC_LINKS', true),
  },
});

export default config;