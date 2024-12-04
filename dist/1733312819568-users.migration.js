"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users1733312819568 = void 0;
class Users1733312819568 {
    constructor() {
        this.name = 'Users1733312819568';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" BIGSERIAL NOT NULL, "firstName" character varying(225) NOT NULL, "email" character varying(225) NOT NULL, "password" character varying(225) NOT NULL, "role" "public"."users_role_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }
}
exports.Users1733312819568 = Users1733312819568;
//# sourceMappingURL=1733312819568-users.migration.js.map