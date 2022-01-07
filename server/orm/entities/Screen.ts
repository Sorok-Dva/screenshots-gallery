import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'Screens' })
export class Screen {
  @PrimaryGeneratedColumn()
  id!: number
  
  @Column()
  public title!: string
  
  @Column()
  public savedAsImg!: boolean
  
  @Column({ type: 'text' })
  public base64?: string
  
  @Column()
  public shareKey!: string
  
  @Column()
  public path?: string
  
  @Column()
  public uploadBy!: number
  
  @Column()
  public size!: number
  
  @Column()
  public private!: boolean
  
  @Column()
  public views!: number
  
  @Column()
  public deletedAt?: Date
  
  @Column()
  public readonly createdAt!: Date;
  
  @Column()
  public readonly updatedAt!: Date;
}
