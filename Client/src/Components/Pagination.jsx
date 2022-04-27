import './pagination.css'

export default function Pagination({allMovement, movpp, pagination}){
    let pages = []

    for(let i=1; i <= Math.ceil(allMovement / movpp); i++){
        pages.push(i)
    }
   
    return(
        <div>           
            <ol className='ol'>
                {pages.map(x=> {
                    return <li key={x} className='li'>
                        <button onClick={()=> pagination(x)}> {x} </button>
                    </li>
                })}
            </ol>
        </div>
    )
}