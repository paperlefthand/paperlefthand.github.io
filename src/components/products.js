import React from 'react'
import Link from 'gatsby-link'

export default() => (
    <div>
    <h2>-Products-</h2>
    <ul>
      <li>スカラネットスクショくん (<a href="https://github.com/paperlefthand/Scholarnet" target="_blank">GitHub</a>)</li>
      <li>ClickPost (<a href="https://github.com/paperlefthand/click_post" target="_blank">GitHub</a>)</li>
      <li>オレ達の妹シリーズ</li>
          <ul>
              <li>流行に敏感な妹bot (<a href="https://twitter.com/sister_trend" target="_blank">Twitter</a>)</li>
              <li><Link to="/page-2/">グルメ通な妹bot </Link> (LINEbot)</li>
              <li><Link to="/page-3/">面倒見がよい反面お節介でもある妹bot </Link> (LINEbot)</li>
          </ul>
    </ul>
    </div>
)