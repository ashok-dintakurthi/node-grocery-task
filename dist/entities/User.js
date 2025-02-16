"use strict";
// import {
//     Entity,
//     PrimaryGeneratedColumn,
//     Column,
//     CreateDateColumn,
//     UpdateDateColumn,
//   } from "typeorm";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["USER"] = "USER";
})(UserRole || (exports.UserRole = UserRole = {}));
//   @Entity({ name: "users" })
//   export class User {
//     @PrimaryGeneratedColumn()
//     id!: number;
//     @Column({ unique: true })
//     username!: string;
//     @Column()
//     password!: string;
//     @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
//     role!: UserRole;
//     @CreateDateColumn()
//     createdAt!: Date;
//     @UpdateDateColumn()
//     updatedAt!: Date;
//   }
