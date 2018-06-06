import React from 'react'

import knex from '../knex'

export default class extends React.Component {
  static async getInitialProps () {
    const podcasts = await knex('podcasts').orderBy('reviewsCnt', 'desc').limit(1000)
    const podcastsCnt = (await knex('podcasts').count('* as cnt'))[0].cnt
    return {podcasts, podcastsCnt}
  }

  render () {
    return (
      <div>
        <div className='text-center'>
          <h1 className="margin-0">Podcasts</h1>
          <h2 className="h5">
            <small>{this.props.podcastsCnt.toLocaleString()} in database</small>
          </h2>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th className='text-center'>Category</th>
              <th className='text-center'>Avg</th>
              <th className='text-center'>Num</th>
            </tr>
          </thead>
          <tbody>
            {this.props.podcasts.map(podcast => (
              <tr key={podcast.id}>
                <td>
                  <a href={podcast.url}>{podcast.title}</a>
                </td>
                <td className='text-center'>{podcast.category}</td>
                <td className='text-center'>{podcast.reviewsAvg && podcast.reviewsAvg.toFixed(2)}</td>
                <td className='text-center'>{podcast.reviewsCnt && podcast.reviewsCnt.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}