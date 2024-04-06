import React, { useEffect, useState } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import './News.css';

const News = (props) => {
  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  document.title = `${Capitalize(props.category)} - NewsMonkey`
  
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  
  
  
  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(65);
    setarticles(parsedData.articles)
    setloading(false)
    settotalResults(parsedData.totalResults)
    props.setProgress(100);
  }
  
  useEffect(() => {
    updateNews();
  }, [])
  
  
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setpage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json()
    setarticles(articles.concat(parsedData.articles))
    setloading(false)
    settotalResults(parsedData.totalResults)
  };

  // handleNxtClk = async () => {
  //   updateNews();
  //   setState({ page: state.page + 1 });
  // }

  // handlePrevClk = async () => {
  //   updateNews();
  //   setState({ page: state.page + 1 });
  // }
  return (
    <>
      <h2 className='mt-4'>NewsMonkey - Top Headlines on {Capitalize(props.category)}</h2>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-3" key={element.url}>
                <NewsItems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} cate={props.category} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
          <button type="button" disabled={state.page <= 1} className="btn btn-dark" onClick={handlePrevClk}> &larr; prev</button>
          <button type="button" disabled={state.page + 1 > Math.ceil(state.totalResults / props.pageSize)} className="btn btn-dark" onClick={handleNxtClk}>next &rarr;</button>
        </div> */}
    </>
  )
}


News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "science",
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News;