import React from 'react';
import Link from 'gatsby-link';
import yellow from './yellow.jpg';
import Outside from "../components/outside";
import Products from "../components/products";

const IndexPage = () => (
  <div>
    <img src={yellow} width="100" height="100"></img>
    
  <section>
      <Products />
  </section>
  <section>
      <Outside />
  </section>
  
  <section>
    <h2>-InSide-</h2>
    <ul>
      <li><Link to="/page-sandbox/">sandbox</Link></li>
    </ul>
  </section>
  </div>
)

export default IndexPage
