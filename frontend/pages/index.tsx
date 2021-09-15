import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import beersData from "../beers-data.json";
import { AnyBeer } from "../beerTypes";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      {(beersData as AnyBeer[]).map((beer) => {
        return (
          <div key={beer.name} className={styles["beer-tile"]}>
            <h1>{beer.name}</h1>
            <div>
              <img src={beer.img} height="150" />
            </div>
            <p>
              <a
                href={beer.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {beer.owner}
              </a>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
