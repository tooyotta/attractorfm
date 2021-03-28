import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"


const Nav = () => {

  return (
    <div className="nav">
      <nav>
        <p>this is nav</p>
        {/* <Link to="/about">about</Link> */}
      </nav>
    </div>
  )
}

export default Nav