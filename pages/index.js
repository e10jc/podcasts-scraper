import React from 'react'

import knex from '../knex'

const PER_PAGE = 100

export default class extends React.Component {
  static async getInitialProps ({query}) {
    const {category} = query
    const page = parseInt(query.page || '1', 10)
    const podcasts = await knex('podcasts').orderBy('reviewsCnt', 'desc').where(category ? {category} : {}).limit(PER_PAGE).offset((page - 1) * PER_PAGE)
    const podcastsCnt = (await knex('podcasts').count('* as cnt'))[0].cnt
    const categories = (await knex('podcasts').distinct('category')).map(c => c.category)
    return {category, categories, page, podcasts, podcastsCnt}
  }

  render () {
    return (
      <div>
        <div className="grid-x padding-1 align-justify align-middle">
          <div>
            <h1 className="margin-0 h2">
              <a href='/'>Podcasts</a>
            </h1>
            <h2 className="h5">
              <small>{this.props.podcastsCnt.toLocaleString()} in database</small>
            </h2>
          </div>
          <div>
            <select name='category' onChange={this.handleCategoryChange} value={encodeURIComponent(this.props.category)}>
              <option value=''></option>
              {this.props.categories.map(c => (
                <option key={c} value={encodeURIComponent(c)}>{c}</option>
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

        <div className='grid-x align-center'>
          {this.props.page > 1 && <a className='padding-1' href={this.pagePrevHref()}>Prev</a>}
          <a className='padding-1' href={this.pageNextHref()}>Next</a>
        </div>
      </div>
    )
  }

  handleCategoryChange = e => {
    window.location.href = e.target.value ? `/?category=${e.target.value}` : '/'
  }

  pageHrefBuilder = (page) => {
    const {category} = this.props
    const query = [
      category && `category=${encodeURIComponent(category)}`, 
      page && `page=${page}`
    ].filter(p => p).join('&')
    return query ? `/?${query}` : '/'
  }

  pageNextHref = () => this.pageHrefBuilder(this.props.page + 1)

  pagePrevHref = () => this.pageHrefBuilder(this.props.page > 2 && this.props.page - 1)
}
