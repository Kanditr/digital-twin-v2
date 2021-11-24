import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Item.module.sass";
import Users from "./Users/users";
import Control from "./Control/control";
import Options from "./Options/options";
import Header from "../../components/Header/header";
import Footers from "../../components/Footer/footer";
import { useRouter } from "next/router";

import { bids } from "../../mocks/bids";

const navLinks = ["Info", "Owners", "History", "Bids"];

const categories = [
  {
    category: "black",
    content: "art",
  },
  {
    category: "purple",
    content: "unlockable",
  },
];

const users = [
  {
    name: "Raquel Will",
    position: "Owner",
    avatar: "/images/content/avatar-2.jpg",
    reward: "/images/content/reward-1.svg",
  },
  {
    name: "Selina Mayert",
    position: "Creator",
    avatar: "/images/content/avatar-1.jpg",
  },
];

export const getStaticPaths = () => {
  const paths = bids.map((item) => {
    return {
      params: { id: item.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const res = bids.find((x: any) => x.id === id) as any;

  return {
    props: { res },
  };
};

const Item = ({ res }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const router = useRouter();
  const { id } = router.query;

  const item = bids.find((x: any) => x.id === id) as any;

  return (
    <>
      <Header />
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.bg}>
            <div className={styles.preview}>
              <div className={styles.categories}>
                {categories.map((x, index) => (
                  <div
                    className={cn(
                      { "status-black": x.category === "black" },
                      { "status-purple": x.category === "purple" },
                      styles.category
                    )}
                    key={index}
                  >
                    {x.content}
                  </div>
                ))}
              </div>
              <img srcSet={`${item.image2x} 2x`} src={item.image} alt="Item" />
            </div>
            <Options className={styles.options} />
          </div>
          <div className={styles.details}>
            <h1 className={cn("h3", styles.title)}>{item.title}</h1>
            <div className={styles.cost}>
              <div className={cn("status-stroke-green", styles.price)}>
                {item.price}
              </div>
              <div className={cn("status-stroke-black", styles.price)}>
                $4,429.87
              </div>
              <div className={styles.counter}>{item.counter}</div>
            </div>
            <div className={styles.info}>
              This NFT Card will give you Access to Special Airdrops. To learn
              more about digital asset please subscribe to our newsletter
            </div>
            <div className={styles.nav}>
              {navLinks.map((x, index) => (
                <button
                  className={cn(
                    { [styles.active]: index === activeIndex },
                    styles.link
                  )}
                  onClick={() => setActiveIndex(index)}
                  key={index}
                >
                  {x}
                </button>
              ))}
            </div>
            <Users className={styles.users} items={users} />
            <Control className={styles.control} />
          </div>
        </div>
      </div>
      <Footers />
    </>
  );
};

export default Item;