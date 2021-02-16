import Redis, { Redis as RedisClient } from 'ioredis';

import cacheConfig from '@config/cache';

interface Cache {
  // this line need eslint-disabled because value can accept any value
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  save(key: string, value: any): Promise<void>;
  recover<T>(key: string): Promise<T | null>;
  invalidate(key: string): Promise<void>;
  invalidatePrefix(prefix: string): Promise<void>;
}

export default class RedisCache implements Cache {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  // this line need eslint-disabled because value can accept any value
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedDate = JSON.parse(data) as T;

    return parsedDate;
  }

  public async invalidate(key: string): Promise<void> {
    const keys = await this.client.keys(key);

    const pipeline = this.client.pipeline();

    keys.forEach(keyInsideKeys => {
      pipeline.del(keyInsideKeys);
    });

    await pipeline.exec();
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`);

    const pipeline = this.client.pipeline();

    keys.forEach(key => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}
