import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    // Dacă nu găsește APP_KEYS în .env, va folosi array-ul de rezervă de mai jos
    keys: env.array('APP_KEYS') || ['cheieSecreta1', 'cheieSecreta2', 'cheieSecreta3', 'cheieSecreta4'],
  },
});

export default config;