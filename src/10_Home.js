import { useState,useEffect } from "react";
import { Carousel,List,Rate } from 'antd';


export default function Home(){
  const [movies,setMovies]=useState([])

   useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=04b256f451c0e618b5735841206fdedc&page=1`)
      .then(response => response.json())
      .then(data=>{
        setMovies(data)
       console.log(data)

      })},[])
      
    
        

    return (
        <div  style={{backgroundColor:"black"}}>
       

{/*   {movies.results.map((result)=>{
  return <div key={result.id}>
  <div>{result.title}</div>
 <img src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} alt="image"/>  
    </div>
})}  
 */}
    
   
 
<Carousel autoplay style={{color:"white",fontSize:20}}>
 {movies.length!==0  && movies.results.map(result=>{
  return <div key={result.id}>
    <img style={{height:550 ,width:1000,margin:"auto"}} src={`https://image.tmdb.org/t/p/w500/${result.backdrop_path
}`}></img> 
    <div className="movietitle">{result.title}</div>

  </div>
})}

</Carousel>  


<div  className="box"style={{color:"white",fontFamily: "monospace",fontSize:15}}>
<h2 className="title">Now Playing List</h2>
    <List
      dataSource={movies.results}
      renderItem={(item) => 
     
    <List.Item >
    
    <div className="grid-container">
    
     <div className="group1">Name: {item.title}</div> 
     <div className="group1">Release Date: {item.release_date}</div> 
     <div className="group1">Review: <Rate  allowHalf  defaultValue={item.vote_average/2} /> </div> 
     <div className="image1" ><img style={{height:110 ,width:95,float:"left",paddingLeft:20,paddingBottom:20}}src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}></img></div>
   
    </div>
    </List.Item>}
    
    />   
    </div>
        </div>
    )
}