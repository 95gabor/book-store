import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1680085625417 implements MigrationInterface {
  name = 'init1680085625417';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`customer_entity\` (\`id\` varchar(36) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`birthDate\` date NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rental_entity\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`bookId\` varchar(36) NULL, \`customerId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`book_entity\` (\`id\` varchar(36) NOT NULL, \`author\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`releaseDate\` date NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rental_entity\` ADD CONSTRAINT \`FK_eb26a29f2ea5cbcab618fbee06d\` FOREIGN KEY (\`bookId\`) REFERENCES \`book_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rental_entity\` ADD CONSTRAINT \`FK_cdfc53d517c1b5600eee0d56abb\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`rental_entity\` DROP FOREIGN KEY \`FK_cdfc53d517c1b5600eee0d56abb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rental_entity\` DROP FOREIGN KEY \`FK_eb26a29f2ea5cbcab618fbee06d\``,
    );
    await queryRunner.query(`DROP TABLE \`book_entity\``);
    await queryRunner.query(`DROP TABLE \`rental_entity\``);
    await queryRunner.query(`DROP TABLE \`customer_entity\``);
  }
}
