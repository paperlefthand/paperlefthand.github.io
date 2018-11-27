import React from 'react'
import Link from 'gatsby-link'

const SecondPage = () => (
  <div>
      <button class="primary-button">
        Click me
      </button>
    <p>Welcome to page 3</p>
    <Link to="/">Go back to the homepage</Link>
  </div>
)

export default SecondPage
