import { MigrationInterface, QueryRunner } from 'typeorm';

import SeedCategories from '../seeds/categories.seed';

export default class SeedCategories1613582859276 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let data = '';

    SeedCategories.forEach(seed => {
      data = `${data} ('${seed.name}', '${seed.image}'),`;
    });

    const dataSlice = data.slice(0, -1);

    const query = `INSERT INTO categories (name, image) VALUES ${dataSlice};`;

    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const query = 'DELETE FROM categories';
    await queryRunner.query(query);
  }
}
