import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateChat1613949506596 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'chat',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id_has_created_chat',
            type: 'uuid',
          },
          {
            name: 'user_id_has_received_chat',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'ChatUserHasCreatedChat',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id_has_created_chat'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'ChatUserHasReceivedChat',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id_has_received_chat'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('chat');
  }
}
