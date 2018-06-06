import React from 'react'

import knex from '../knex'

export default class extends React.Component {
  static async getInitialProps () {
    const podcasts = await knex('podcasts').orderBy('reviewsCnt', 'desc').limit(1000)
    return {podcasts}
  }

  render () {
    return (
      <div>
        <h1 className='text-center'>Podcasts</h1>

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
                <td className='text-center'>{podcast.reviewsAvg}</td>
                <td className='text-center'>{podcast.reviewsCnt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}