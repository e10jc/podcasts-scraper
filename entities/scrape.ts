import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'

import {Podcast} from './podcast'

@Entity('scrapes')
export class Scrape {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => Podcast, podcast => podcast.scrapes)
  podcast: Podcast

  @Column('int', {nullable: true})
  reviewsCnt: number

  @Column('float', {precision: 8, scale: 2, nullable: true})
  reviewsAvg: number

  @Column('timestamp')
  createdAt: Date
}
