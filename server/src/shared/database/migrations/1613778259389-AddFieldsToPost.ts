import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddFieldsToPost1613778259389
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'posts',
      new TableColumn({
        name: 'likes',
        type: 'integer',
        isNullable: true,
        default: 0,
      }),
    );

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
        name: 'category_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'posts',
      new TableForeignKey({
        name: 'PostCategory',
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('posts', 'PostCategory');

    await queryRunner.dropColumn('posts', 'category_id');
    await queryRunner.dropColumn('posts', 'deslikes');
    await queryRunner.dropColumn('posts', 'likes');
  }
}
