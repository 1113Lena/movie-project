import {useState,useEffect} from 'react';
import { Select,Input, Pagination,Col,Row,Divider} from 'antd';
export default function Movie3 (){
    const { Search } = Input;
    const [selectvalue,setSelectvalue]=useState("movie")
    const [searchvalue,setSearchvalue]=useState('')
    const [showings,setShowings]=useState(null)
    const [newpage, setNewpage] = useState(1)
    const [totals,setTotals]=useState(1)
    


  
   const getnewdata=(c,a,b)=>{
  
    fetch(`https://api.themoviedb.org/3/search/${c}?query=${a}&api_key=04b256f451c0e618b5735841206fdedc&include_adult=false&language=en-US&page=${b}`)
   //'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1
  // api_key=04b256f451c0e618b5735841206fdedc
  .then(response => response.json())
  .then(data=>{
     setShowings(data)
     setTotals(data.total_results)
     console.log('b',data.total_results)
     console.log(data)
     
  })
  
  }
    useEffect(()=>{
     
        getnewdata(selectvalue,searchvalue,newpage)
       
   },[selectvalue])

    const onSearch = (value) =>{
       console.log("aa",value)
        getnewdata(selectvalue,value,newpage)
        setSearchvalue(value)
        
   
    }
    const changeselect = (value) => {
        console.log(`selected ${value}`);
        getnewdata(value,searchvalue,newpage)
        setSelectvalue(value)
       
        setSearchvalue('') 
        console.log('c',searchvalue)  
        
      
      
    }; 
      
      
    const changepage = (page) => {
        console.log("a",page);
        setNewpage(page);
        getnewdata(selectvalue,searchvalue,page)
    };

    const getshowing=()=>{
       if(showings!==null){
        let arr=[];
        let arr1=[];
        for(let i=0;i<showings.results.length;i++){
          arr.push(showings.results[i])
          if(arr.length %4===0){
            arr1.push(arr)
            arr=[];
          }
        }
        console.log(arr1)
        let p=[];
        let final=[];
        for(let i=0;i<arr1.length;i++){
          let m=arr1[i];
          for(let j=0;j<m.length;j++){
            p.push(
            
              <Col span={6} >
             <div className='grid2'>
              <div >{m[j].backdrop_path===null ? null :<img className='poster'style={{height:320 ,width:250}}  src={`https://image.tmdb.org/t/p/w500/${m[j].backdrop_path}`}></img>}</div>
              <div className='content2' >Name:<span >{m[j].title || m[j].name}</span></div>
              <div className='content2'>Release Date: <span >{m[j].release_date || m[j].first_air_date}</span></div>
              <div className='content2' >Vote Average: <span >{m[j].vote_average }</span></div>
              </div>
              </Col>
             
            )
          }
        

        }
        final.push(<Row>{p}</Row>)
        return final;
       }
    }
    
     
    
    return (
    <div className='m3'>
     <Select
     
     style={{
      width: 120,
    }}
     onChange={changeselect}
     value={selectvalue}
     options={[
        {
        value:"movie",
        label:"Movie",
        },
        {
          value:"tv",
          label:"TV Show"
        }
     ]}
    />
    <Input.Search
     
      placeholder="Search"
      allowClear 
      onSearch={onSearch}
   /*    value={searchvalue} */
      style={{
        width: 200,
      }}
    />
   {searchvalue==='' ? null : <Pagination defaultPageSize={20} current={newpage} onChange={changepage} total={totals} />} 
  
   <Divider orientation="left"></Divider>
   { getshowing()}

{/*     <Row >
    {showings===null ? null : showings.results.map((show)=>{
      return <div className='grid2' key={show.id}>
      
        <Col span={4}  >
        
            <div >{show.backdrop_path===null ? null :<img className='poster'style={{height:300 ,width:250}}  src={`https://image.tmdb.org/t/p/w500/${show.backdrop_path}`}></img>}</div>
            <div className='content2' >Name:<span >{show.title || show.name}</span></div>
            <div className='content2'>Release Date: <span >{show.release_date || show.first_air_date}</span></div>
            <div className='content2' >Vote Average: <span >{show.vote_average }</span></div>
        
        </Col>
      
        </div>
    })}
  </Row>
 */}
  </div>
    )   
}