import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1706149853712 implements MigrationInterface {
    name = 'FirstMigration1706149853712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`stk_categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`name\` varchar(150) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`stk_items\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`name\` varchar(255) NOT NULL, \`purchase_price\` int NOT NULL, \`is_available\` tinyint NOT NULL, \`order_id\` int NULL, \`product_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`customer_name\` varchar(255) NOT NULL, \`total_price\` int NOT NULL, \`quantity\` int NOT NULL, \`order_status\` enum ('PENDING', 'SUCCESS', 'REJECTED') NOT NULL, \`product_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`stk_products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`name\` varchar(150) NOT NULL, \`category_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`stk_items\` ADD CONSTRAINT \`FK_8337b9824a435f841fa4ca20f52\` FOREIGN KEY (\`order_id\`) REFERENCES \`order_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`stk_items\` ADD CONSTRAINT \`FK_a7e58acbbfe145bebc87e1dede7\` FOREIGN KEY (\`product_id\`) REFERENCES \`stk_products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_entity\` ADD CONSTRAINT \`FK_61e192239f58c1535ea51706594\` FOREIGN KEY (\`product_id\`) REFERENCES \`stk_products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`stk_products\` ADD CONSTRAINT \`FK_49f86b59595145c5dedeaba93ca\` FOREIGN KEY (\`category_id\`) REFERENCES \`stk_categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`stk_products\` DROP FOREIGN KEY \`FK_49f86b59595145c5dedeaba93ca\``);
        await queryRunner.query(`ALTER TABLE \`order_entity\` DROP FOREIGN KEY \`FK_61e192239f58c1535ea51706594\``);
        await queryRunner.query(`ALTER TABLE \`stk_items\` DROP FOREIGN KEY \`FK_a7e58acbbfe145bebc87e1dede7\``);
        await queryRunner.query(`ALTER TABLE \`stk_items\` DROP FOREIGN KEY \`FK_8337b9824a435f841fa4ca20f52\``);
        await queryRunner.query(`DROP TABLE \`stk_products\``);
        await queryRunner.query(`DROP TABLE \`order_entity\``);
        await queryRunner.query(`DROP TABLE \`stk_items\``);
        await queryRunner.query(`DROP TABLE \`stk_categories\``);
    }

}
