import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class DeleteTypeFromPosts1613844263681
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('posts', 'type');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'posts',
      new TableColumn({
        name: 'type',
        type: 'varchar',
      }),
    );
  }
}
