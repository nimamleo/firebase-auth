"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog1733347749698 = void 0;
class Blog1733347749698 {
    constructor() {
        this.name = 'Blog1733347749698';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "blog" ("id" BIGSERIAL NOT NULL, "title" character varying(255) NOT NULL, "content" character varying(255) NOT NULL, "image" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "blog"`);
    }
}
exports.Blog1733347749698 = Blog1733347749698;
//# sourceMappingURL=1733347749698-blog.migration.js.map