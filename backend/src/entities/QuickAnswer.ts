import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("quick_answers")
export class QuickAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  shortcut: string;

  @Column({ type: "text" })
  message: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
