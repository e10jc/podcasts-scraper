import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'

import {Scrape} from './scrape'

@Entity('podcasts')
export class Podcast {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', {nullable: true})
  category: string

  @Column('varchar', {nullable: true})
  title: string

  @Column('text', {nullable: true})
  url: string

  @Column('int', {nullable: true})
  reviewsCnt: number

  @Column('float', {precision: 8, scale: 2, nullable: true})
  reviewsAvg: number

  @Column('datetime', {nullable: true})
  created_at: Date

  @Column('datetime', {nullable: true})
  updated_at: Date

  @Column('int', {nullable: true})
  trending: number

  @Column('varchar', {nullable: true})
  publisher: string

  @OneToMany(type => Scrape, scrape => scrape.podcast)
  scrapes: Scrape[]
}
