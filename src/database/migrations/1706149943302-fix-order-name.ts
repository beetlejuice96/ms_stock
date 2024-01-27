import { MigrationInterface, QueryRunner } from "typeorm";

export class FixOrderName1706149943302 implements MigrationInterface {
    name = 'FixOrderName1706149943302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`stk_items\` DROP FOREIGN KEY \`FK_8337b9824a435f841fa4ca20f52\``);
        await queryRunner.query(`CREATE TABLE \`stk_orders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`customer_name\` varchar(255) NOT NULL, \`total_price\` int NOT NULL, \`quantity\` int NOT NULL, \`order_status\` enum ('PENDING', 'SUCCESS', 'REJECTED') NOT NULL, \`product_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`stk_items\` ADD CONSTRAINT \`FK_8337b9824a435f841fa4ca20f52\` FOREIGN KEY (\`order_id\`) REFERENCES \`stk_orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`stk_orders\` ADD CONSTRAINT \`FK_e385b7bbab040c970070e37bf1f\` FOREIGN KEY (\`product_id\`) REFERENCES \`stk_products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`stk_orders\` DROP FOREIGN KEY \`FK_e385b7bbab040c970070e37bf1f\``);
        await queryRunner.query(`ALTER TABLE \`stk_items\` DROP FOREIGN KEY \`FK_8337b9824a435f841fa4ca20f52\``);
        await queryRunner.query(`DROP TABLE \`stk_orders\``);
        await queryRunner.query(`ALTER TABLE \`stk_items\` ADD CONSTRAINT \`FK_8337b9824a435f841fa4ca20f52\` FOREIGN KEY (\`order_id\`) REFERENCES \`order_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
