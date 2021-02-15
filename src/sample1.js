import React,{useState} from 'react'
import './App.css';

function List()
{
const [list, setList] = useState('');
const [listArr, setListArr] = useState([]);
const [tot,setTot] = useState(0);
const handler = (e) =>{
   e.preventDefault();
    setList(e.target.value)
}
const addlists =(e)=>{
  e.preventDefault();
    const duplist = [...listArr]
    if (list!=='') {
        const details = {
            id:Date.now(),
            active : true,
            text : list,
            quantity : 0
        }
        setListArr([...duplist,details])
    }
}
const decrementor= key =>{ 
    const duplist = [...listArr];
    const ind = duplist.findIndex(item => item.id===key )
    if (duplist[ind].quantity > 0) {
        duplist[ind].quantity--;
        setListArr([...duplist])  
        totadd();
    }
} 
const incrementor=(key)=>{
    const duplist = [...listArr];
    const ind = duplist.findIndex(item => item.id===key )
    duplist[ind].quantity++;
    setListArr([...duplist])
    totadd();
}
const totadd= ()=>{
    const duplist = listArr;
    var totall=0;
    for (let idex = 0; idex < duplist.length; idex++) {
        var qtity = duplist[idex].quantity;
        if (qtity >= 0) {
            totall += qtity; 
        } 
    }
    setTot(totall)
}
const checking = (key) =>{
    const duplist = [...listArr];
    const ind = duplist.findIndex(item => item.id===key )
    duplist[ind]= {
        ...duplist[ind], 
        active : false
    }
    setListArr([...duplist])
}
return ( 
       <div>
           <div className='container'>
                 <form className='formmain'>
                    <input placeholder='Enter item.....' type='text' onChange={(e)=>handler(e)} value={list}/>  
                        <button type='submit' onClick={e=>addlists(e)}>+</button>
                </form>
                <ul className='submain' >
                    {listArr.map(item =>   
                                    <li key={item.id} className='active'>
                                    <section>
                                    <p className={(item.active?'tive':'nottive')}>{item.text}</p> 
                                    <div className='sets'>
                                    <button  onClick={()=>decrementor(item.id)}>-</button>
                                    <button>{item.quantity}</button>
                                    <button onClick={()=>incrementor(item.id)}>+</button>
                                    <button className='last' onClick={()=>{checking(item.id)}}>a</button>
                                    </div>
                                    </section>
                                    </li>
                     )}
                </ul>
                   <p className='total' onChange={()=>totadd()}>Total Items =  <button> { tot}</button></p> 
            </div> 
        </div>             
    )
}

export default List
