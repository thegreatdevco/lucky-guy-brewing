import React from 'react'
import Title from './title'
import { useStaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/react'

const query = graphql`
  {
    allContentfulBeerCard {
      nodes {
        abv
        category
        desc
        ibv
        id
        price
        title
      }
    }
  }
`

const BeerSection = () => {
  const data = useStaticQuery(query)
  const beers = data.allContentfulBeerCard.nodes

  return (
    <section
      className="section"
      id="beer"
      css={css`
        .cards-wrap {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1rem;
        }

        .beer-card {
          background: var(--color-secondary);
          padding: 1rem;
          border-radius: var(--border-radius);
          display: flex;
          flex-direction: column;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.25rem;
        }

        .desc {
          font-weight: 100;
          padding: 2rem 0;
        }

        .card-footer {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          align-items: end;
          margin-top: auto;
        }

        .purchase-btn {
          margin-top: 0;
        }

        @media screen and (min-width: 1100px) {
          .percent-info {
            display: flex;
            justify-content: space-between;
          }
        }
      `}
    >
      <Title titleName="our beers" />
      <div className="cards-wrap">
        {beers.map(beer => {
          return (
            <div key={beer.id} className="beer-card">
              {/* header */}
              <div className="card-header">
                <h4>{beer.title}</h4>
                <div className="percent-info">
                  <p>ABV: {beer.abv}%</p>
                  <p>IBV: {beer.ibv}</p>
                </div>
              </div>
              <div className="underline"></div>

              {/* desc */}
              <div className="desc">
                <p>{beer.desc}</p>
              </div>

              {/* footer */}
              <div className="card-footer">
                <div className="price">
                  <p>Price: ${beer.price}</p>
                </div>

                <button
                  aria-label="purchase beer"
                  className="btn btn-small btn-dark purchase-btn snipcart-add-item"
                  data-item-id={beer.id}
                  data-item-price={beer.price}
                  data-item-url="https://luckyguybrewing.netlify.app/"
                  data-item-description={beer.desc}
                  data-item-name={beer.title}
                >
                  <a href="#cart">Purchase</a>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default BeerSection
