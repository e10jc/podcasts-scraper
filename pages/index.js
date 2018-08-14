import {format as formatDate} from 'date-fns'
import React from 'react'

import knex from '../knex'

const PER_PAGE = 100

export default class extends React.Component {
  static async getInitialProps ({query}) {
    const {category} = query
    const page = parseInt(query.page || '1', 10)
    const sort = query.sort
    const podcasts = await knex('podcasts').orderBy(sort || 'reviewsCnt', 'desc').where(category ? {category} : {}).limit(PER_PAGE).offset((page - 1) * PER_PAGE)
    const podcastsCnt = (await knex('podcasts').count('* as cnt'))[0].cnt
    const categories = (await knex('podcasts').distinct('category')).map(c => c.category)
    return {category, categories, page, podcasts, podcastsCnt, sort}
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
              <small>
                <span>{this.props.podcastsCnt.toLocaleString()} scraped</span>
              </small>
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
              <th className='text-center'>Publisher</th>
              <th className='text-center'>Category</th>
              <th className='text-center'>
                <a href={this.sortHref('reviewsCnt')}>Num</a>
              </th>
              <th className='text-center'>Avg</th>
              <th className='text-center'>
                <a href={this.sortHref('trending')}>Change</a>
              </th>
              <th className='text-center'>Updated</th>
            </tr>
          </thead>
          <tbody>
            {this.props.podcasts.map(podcast => (
              <tr key={podcast.id}>
                <td>
                  <a href={podcast.url}>{podcast.title}</a>
                </td>
                <td className='text-center text-nowrap'>{podcast.publisher}</td>
                <td className='text-center text-nowrap'>{podcast.category}</td>
                <td className='text-center text-nowrap'>{podcast.reviewsCnt && podcast.reviewsCnt.toLocaleString()}</td>
                <td className='text-center text-nowrap'>{podcast.reviewsAvg && podcast.reviewsAvg.toFixed(2)}</td>
                <td className='text-center text-nowrap'>{podcast.trending || '-'}</td>
                <td className='text-center text-nowrap'>
                  <a href={`/scrapes?id=${podcast.id}`}>{formatDate(podcast.updated_at, 'MMMM D')}</a>
                </td>
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

  hrefBuilder = ({page, sort}) => {
    const {category} = this.props
    const sortQuery = sort || this.props.sort
    const query = [
      category && `category=${encodeURIComponent(category)}`, 
      page && `page=${page}`,
      sortQuery && `sort=${sortQuery}`,
    ].filter(p => p).join('&')
    return query ? `/?${query}` : '/'
  }

  pageNextHref = () => this.hrefBuilder({page: this.props.page + 1})
  pagePrevHref = () => this.hrefBuilder({page: this.props.page > 2 && this.props.page - 1})

  sortHref = (sort) => this.hrefBuilder({sort})
}
