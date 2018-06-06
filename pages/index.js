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
        <h1>Podcasts</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Reviews</th>
            </tr>
          </thead>
          <tbody>
            {this.props.podcasts.map(podcast => (
              <tr key={podcast.id}>
                <td>
                  <a href={podcast.url}>{podcast.title}</a>
                </td>
                <td>{podcast.category}</td>
                <td>
                  {podcast.reviewsAvg && podcast.reviewsCnt && <span>{podcast.reviewsAvg} / {podcast.reviewsCnt} ratings</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}