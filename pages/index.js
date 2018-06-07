import React from 'react'

import knex from '../knex'

export default class extends React.Component {
  static async getInitialProps ({query}) {
    const podcasts = await knex('podcasts').orderBy('reviewsCnt', 'desc').where(query.category ? {category: query.category} : {}).limit(100)
    const podcastsCnt = (await knex('podcasts').count('* as cnt'))[0].cnt
    const categories = (await knex('podcasts').distinct('category')).map(c => c.category)
    return {categories, podcasts, podcastsCnt, query}
  }

  render () {
    return (
      <div>
        <div className="grid-x padding-1 align-justify align-middle">
          <div>
            <h1 className="margin-0 h2">Podcasts</h1>
            <h2 className="h5">
              <small>{this.props.podcastsCnt.toLocaleString()} in database</small>
            </h2>
          </div>
          <div>
            <select name='category' onChange={this.handleCategoryChange}>
              <option value=''></option>
              {this.props.categories.map(c => (
                <option key={c} selected={c === this.props.query.category} value={encodeURIComponent(c)}>{c}</option>
              ))}
            </select>
          </div>
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

  handleCategoryChange = e => {
    window.location.href = `/?category=${e.target.value}`
  }
}