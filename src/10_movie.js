import {useEffect, useState} from 'react'
import { Radio,List,Pagination,Col,  Row } from 'antd';
export default function Movie2 (){

   const [newvalue, setNewvalue] = useState("now_playing");
   const [playings,setPlayings]=useState(null)
   const [totalitems,setTotalitems]=useState(1)
   const [newpage,setNewpage]=useState(1)

  const getdata=(a,b)=>{
    fetch(`https://api.themoviedb.org/3/movie/${a}?api_key=04b256f451c0e618b5735841206fdedc&page=${b}`)
    .then(response=>response.json())
    .then(data=>{
      setPlayings(data)
      setTotalitems(data.total_results)
      console.log(data)
     
  })
  }

  useEffect(()=>{
  //console.log("f",newpage)
   getdata(newvalue,newpage)
},[]) 
    
    
    const onChange = (e) => {
      console.log('radio checked', e.target.value);
      setNewvalue(e.target.value);
      
      getdata(e.target.value,newpage)
      setNewpage(1)
      
    
   /*    fetch(`https://api.themoviedb.org/3/movie/${newvalue}?api_key=04b256f451c0e618b5735841206fdedc&page=${newpage}`)
            .then(response=>response.json())
            .then(data=>{
             setPlayings(data)
             setTotalpages(data.total_pages)
             console.log(data)
            }) */
      };
 
   const changepage=(page)=>{
     setNewpage(page)
     console.log("bbb",page,newpage)
     getdata(newvalue,page)
     console.log("aa",page)
   }
 
   const getmovietitle=()=>{
  //[Row,Row,Row,Row,Row]
    let newarr=[];
    let newarr1=[];
    if(playings!==null){
      for(let i=0;i<playings.results.length;i++){
        newarr.push(playings.results[i])
        //console.log(playings.results[i])
      
        if(newarr.length %4===0 ){
          newarr1.push(newarr)
          newarr=[];
        }
    }
    
    let m=[];
    let result=[];
    for(let i=0;i<newarr1.length;i++){
    let p=newarr1[i];
    for(let j=0;j<p.length;j++){
      m.push(
      <Col span={6}>
        <div className='grid2'>
       <div>{p[j].backdeop_path ===null ?  null : <img className="poster"style={{height:300 ,width:250}} src={`https://image.tmdb.org/t/p/w500/${p[j].backdrop_path}`}></img>}</div>
       <div className='content2'>Name: {p[j].title}</div>
       <div className='content2'>Release Date: {p[j].release_date}</div>
       <div className='content2'>Vote Average: {p[j].vote_average}</div>
       </div>
      </Col>
      )
      
    }
   
   }
   result.push(<Row>{m}</Row>)
   return result;
  

  }
  /* let arr=[];

  let arr2=[];
  if(playings!==null){
  for(let i=0;i<playings.results.length;i++){
    let a=playings.results[i].title;

    arr.push(a);
   
 } //console.log(arr)
 for(let j=0;j<arr.length;j=j+4){

  //console.log(arr.slice(j,j+4))
 
  arr2[j/4]=arr.slice(j,j+4)
  }
 
 
 }
 console.log(arr2)
  return arr2 ;
   */
}  

  

    return(
  <div className='m3'>
   <div className='top'>
    <Radio.Group onChange={onChange} value={newvalue} >
      <Radio value="now_playing">Now Playing</Radio>
      <Radio value="popular">Popular</Radio>
      <Radio value="top_rated">Top Rated</Radio>
      <Radio value="upcoming">Upcoming</Radio>
    </Radio.Group>  
  
    <Pagination defaultPageSize={20} onChange={changepage}  current={newpage} total={totalitems}/>
  </div>
{/* 
    <List
      bordered
      dataSource={playings.results}
      renderItem={(item) => 
        
    <List.Item>
     <div className='flex-container2'>
     <div>{item.backdrop_path===null ? null :<img style={{height:100 ,width:100}}  src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}></img>}</div>
     <div style={{display:"inline-block"}}>Name: {item.title}</div>
     <div>Release Date: {item.release_date}</div>
     <div style={{display:"block"}}>Vote Average: {item.vote_average}</div>
     </div> 
    </List.Item>}
    
    /> */}
  
   {getmovietitle()} 

  {/* <Row gutter={[16, 24]}>
  {playings===null ?  null : playings.results.map((playing)=>{
    return <div  className="grid2"  key={playing.id}>
     <Col span={6}>
     <div>{playing.backdeop_path ===null ?  null : <img className="poster"style={{height:300 ,width:250}} src={`https://image.tmdb.org/t/p/w500/${playing.backdrop_path}`}></img>}</div>
     <div className='content2'>Name: {playing.title}</div>
     <div className='content2'>Release Date: {playing.release_date}</div>
     <div className='content2'>Vote Average: {playing.vote_average}</div>

     </Col>
</div>
  })}

     
    </Row>  */}
    </div>
    )
}