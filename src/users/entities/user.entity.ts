import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    name: 'full_name',
    length: 60,
  })
  fullName: string;

  @Column('varchar', {
    unique: true,
    nullable: false,
  })
  email: string;

  @Column('varchar', {
    nullable: true,
    select: false,
  })
  password: string;

  @Column('text', {
    nullable: true,
  })
  photo: string;
}

export type UserEntityLike = Partial<UserEntity>;
