import {format as formatDate} from 'date-fns'
import * as React from 'react'

const PER_PAGE = 100

interface Props {
  podcast: any,
  scrapes: any[],
}

export default class extends React.Component<Props> {
  static async getInitialProps ({query}) {
    const {id} = query
    const podcast = [] // await knex('podcasts').where({id}).first()
    const scrapes = [] // await knex('scrapes').where({podcastId: id}).orderBy('createdAt', 'DESC')
    return {podcast, scrapes}
  }

  render () {
    return (
      <div>
        <div className="grid-x padding-1 align-justify align-middle">
          <div>
            <h1 className="margin-0 h4">
              <a href={this.props.podcast.url}>{this.props.podcast.title}</a>
            </h1>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th className="text-center">Num</th>
              <th className="text-center">Avg</th>
            </tr>
          </thead>
          <tbody>
            {this.props.scrapes.map(scrape => (
              <tr key={scrape.id}>
                <td>{formatDate(scrape.createdAt, 'MMMM D')}</td>
                <td className="text-center">{scrape.reviewsCnt}</td>
                <td className="text-center">{scrape.reviewsAvg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
