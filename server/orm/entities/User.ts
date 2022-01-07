import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export type UserRole = 'user' | 'admin'
export type UserLang = 'en' | 'fr' | 'ru'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number
  
  @Column({
    unique: true,
  })
  email!: string
  
  @Column()
  password!: string
  
  @Column()
  role!: UserRole
  
  @Column({
    unique: true,
  })
  key!: string
  
  @Column()
  registerIp?: string
  
  @Column()
  lastLoginIp?: string
  
  @Column()
  validated!: boolean
  
  @Column()
  validatedAt?: Date
  
  @Column({ type: 'json' })
  metadata?: Record<string, unknown>
  
  @Column()
  lastLogin?: Date
  
  @Column({
    default: 'en',
    length: 2,
  })
  language!: UserLang
  
  @Column()
  @CreateDateColumn()
  created_at?: Date
  
  @Column()
  @UpdateDateColumn()
  updated_at?: Date
  
  setLanguage(language: UserLang) {
    this.language = language;
  }
  
  hashPassword() {
    this.password = 'password'
  }
  
  checkPasswordMatch(unencryptedPassword: string) {
    return 'password'
  }
}
