// @ts-ignore
import React, { useEffect } from 'react';
import NewsList from '../../components/NewsList';
import NavBar from '../../components/NavBar';

const News: React.FC = () => {
  useEffect(() => {
    //getNewsList();
  },[]);
  return(
    <div>
      <NavBar/>
      <NewsList newsList={[]}/>
    </div>
  )
}

export default News;
