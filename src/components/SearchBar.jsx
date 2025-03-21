import React from 'react'

export default function SearchBar( {onSearch} ) {

    const handleSearch = async (e) => {
        const response = await fetch("http://localhost:5000/api/data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: e.target.value })
        });
        onSearch(await response.json())
    }

  return (
    <div>
        <input type="text" onChange={handleSearch}/>
    </div>
  )
}
