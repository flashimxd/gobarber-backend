import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddAvatarFiltersToUsers1593117785944
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.addColumn(
      'users',
      new TableColumn({
        type: 'varchar',
        name: 'avatar',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropColumn('users', 'avatar');
  }
}
