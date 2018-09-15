import {format as formatDate} from 'date-fns'
import * as React from 'react'

interface State {
  category: string,
  categories: any[],
  page: number,
  podcasts: any[],
  podcastsCnt: number,
  sort: string,
}

export default class extends React.Component<{}, State> {
  async componentDidMount () {
    const res = await window.fetch('/api/home')
    this.setState(await res.json())
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
                <span>{this.state.podcastsCnt.toLocaleString()} scraped</span>
              </small>
            </h2>
          </div>
          <div>
            <select name='category' onChange={this.handleCategoryChange} value={encodeURIComponent(this.state.category)}>
              <option value=''></option>
              {this.state.categories.map(c => (
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
            {this.state.podcasts.map(podcast => (
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
          {this.state.page > 1 && <a className='padding-1' href={this.pagePrevHref()}>Prev</a>}
          <a className='padding-1' href={this.pageNextHref()}>Next</a>
        </div>
      </div>
    )
  }

  handleCategoryChange = e => {
    window.location.href = e.target.value ? `/?category=${e.target.value}` : '/'
  }

  hrefBuilder = ({page, sort}: any) => {
    const {category} = this.state
    const sortQuery = sort || this.state.sort
    const query = [
      category && `category=${encodeURIComponent(category)}`, 
      page && `page=${page}`,
      sortQuery && `sort=${sortQuery}`,
    ].filter(p => p).join('&')
    return query ? `/?${query}` : '/'
  }

  pageNextHref = () => this.hrefBuilder({page: this.state.page + 1})
  pagePrevHref = () => this.hrefBuilder({page: this.state.page > 2 && this.state.page - 1})

  sortHref = (sort) => this.hrefBuilder({sort})

  state = {
    category: '',
    categories: [],
    page: 1,
    podcasts: [],
    podcastsCnt: 0,
    sort: '',
  }
}
