import React from "react"
import {lessons} from "../../data/lessons";
const Home = () => {
  return (
    <div>
      <h1> Home </h1>
      <p className="p-4 text-xs">
        {JSON.stringify(lessons[0], null, 2)}
      </p>
    </div>
  )
}

export default Home



