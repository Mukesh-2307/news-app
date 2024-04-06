import React from "react";

const NewsItems = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card" style={{ width: "18rem" }}>
        <span className="position-absolute top-0 translate-middle badge bg-secondary" style={{ left: "20%", zIndex: 1 }}>
          {source}
        </span>
        <img src={imageUrl ? imageUrl : "https://cdn.pixabay.com/photo/2015/02/15/09/33/news-636978_1280.jpg"} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">
            {description}...
          </p>
          <p className="card-text"><small className="text-body-secondary">by {author ? author : "null"} Updated on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark">
            Expand
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsItems;