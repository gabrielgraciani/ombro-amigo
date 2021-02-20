import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class DeleteActionsFromPost1613846168388
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('posts', 'likes');
    await queryRunner.dropColumn('posts', 'deslikes');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'posts',
      new TableColumn({
        name: 'deslikes',
        type: 'integer',
        isNullable: true,
        default: 0,
      }),
    );
    await queryRunner.addColumn(
      'posts',
      new TableColumn({
        name: 'likes',
        type: 'integer',
        isNullable: true,
        default: 0,
      }),
    );
  }
}
