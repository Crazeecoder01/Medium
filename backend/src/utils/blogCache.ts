import { Redis } from '@upstash/redis/cloudflare';

type Env = {
    UPSTASH_REDIS_REST_URL: string;
    UPSTASH_REDIS_REST_TOKEN: string;
};

export const getCachedBlogs = async (env: Env) => {
    const redis = new Redis({
        url: env.UPSTASH_REDIS_REST_URL,
        token: env.UPSTASH_REDIS_REST_TOKEN,
    });

  const cacheKey = 'landing:blogs';
  return await redis.get(cacheKey);
};

export const setCachedBlogs = async (env: Env, blogs: unknown) => {
  const redis = new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  });

  const cacheKey = 'landing:blogs';
  await redis.set(cacheKey, blogs, { ex: 60 * 10 });
};
