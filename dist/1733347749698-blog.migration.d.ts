import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Blog1733347749698 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
