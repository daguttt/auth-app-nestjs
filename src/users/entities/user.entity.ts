import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 20,
  })
  name: string;

  @Column('varchar', {
    length: 60,
  })
  lastName: string;

  @Column()
  email: string;

  @Column('varchar', {
    length: 20,
  })
  password: string;

  @Column('smallint')
  age: number;
}