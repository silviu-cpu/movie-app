import React from 'react'

const SearchBox = (props) => {
    return (
        <div className='col'>
            <input className='form-control input-form' value={props.value} onChange={(event) =>props.setSearchValue(event.target.value)} placeholder='Type to search...'></input>
        </div>
    )
}

export default SearchBox