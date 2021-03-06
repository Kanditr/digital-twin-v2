import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Explore.module.sass";
import { Range, getTrackBackground } from "react-range";
import Icon from "../../components/Icon";
import Card from "../../components/Card/card";
import Dropdown from "../../components/Dropdown/dropdown";

const navLinks = ["All items", "Art", "Game", "Photography", "Music", "Video"];

const dateOptions = ["Newest", "Oldest"];
const likesOptions = ["Most liked", "Least liked"];
const colorOptions = ["All colors", "Black", "Green", "Pink", "Purple"];
const creatorOptions = ["Verified only", "All", "Most liked"];
const priceOptions = ["Highest price", "The lowest price"];

const Search = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [date, setDate] = useState(dateOptions[0]);
  const [likes, setLikes] = useState(likesOptions[0]);
  const [color, setColor] = useState(colorOptions[0]);
  const [creator, setCreator] = useState(creatorOptions[0]);
  const [price, setPrice] = useState(priceOptions[0]);

  const [search, setSearch] = useState("");

  const [values, setValues] = useState([5]);

  const handleSubmit = (e: void) => {
    alert();
  };

  const STEP = 0.1;
  const MIN = 0.0;
  const MAX = 10;

  const [items, setItems] = useState([]) as any[];
  const [filtered, setFiltered] = useState([]) as any[];

  useEffect(() => {
    getItems(dateOptions[0]);
  }, []);

  const getItems = async (query: any) => {
    try {
      const res = await fetch(`/api/items?sort=${query}`, {
        method: "GET",
      });
      const items = await res.json();
      setItems(items);
      setFiltered(items);
    } catch (err) {
      console.log(err);
    }
  };

  function changeQuery(e: any) {
    getItems(e);
  }

  // filter on click nav
  function filter(nav: any) {
    var filtered = items.filter((e: any) => e.category === nav);
    nav === "All items" ? setFiltered(items) : setFiltered(filtered);
  }

  return (
    <>
      <div className={cn("section-pt80", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.top}>
            <div className={styles.title}>Type your keywords</div>
            <form
              className={styles.search}
              action=""
              onSubmit={() => handleSubmit()}
            >
              <input
                className={styles.input}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                name="search"
                placeholder="Search ..."
                required
              />
              <button className={styles.result}>
                <Icon name="search" size="16" />
              </button>
            </form>
          </div>
          <div className={styles.sorting}>
            <div className={styles.dropdown}>
              <Dropdown
                className={styles.dropdown}
                value={date}
                setValue={setDate}
                options={dateOptions}
                fx={(date: any) => changeQuery(date)}
              />
            </div>
            <div className={styles.nav}>
              {navLinks.map((nav, index) => (
                <button
                  className={cn(styles.link, {
                    [styles.active]: index === activeIndex,
                  })}
                  onClick={() => {
                    setActiveIndex(index);
                    filter(nav);
                  }}
                  key={index}
                >
                  {nav}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.filters}>
              <div className={styles.range}>
                <div className={styles.label}>Price range</div>
                <Range
                  values={values}
                  step={STEP}
                  min={MIN}
                  max={MAX}
                  onChange={(values) => setValues(values)}
                  renderTrack={({ props, children }) => (
                    <div
                      onMouseDown={props.onMouseDown}
                      onTouchStart={props.onTouchStart}
                      style={{
                        ...props.style,
                        height: "36px",
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <div
                        ref={props.ref}
                        style={{
                          height: "8px",
                          width: "100%",
                          borderRadius: "4px",
                          background: getTrackBackground({
                            values,
                            colors: ["#3772FF", "#E6E8EC"],
                            min: MIN,
                            max: MAX,
                          }),
                          alignSelf: "center",
                        }}
                      >
                        {children}
                      </div>
                    </div>
                  )}
                  renderThumb={({ props, isDragged }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "24px",
                        width: "24px",
                        borderRadius: "50%",
                        backgroundColor: "#3772FF",
                        border: "4px solid #FCFCFD",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-33px",
                          color: "#fff",
                          fontWeight: "600",
                          fontSize: "14px",
                          lineHeight: "18px",
                          fontFamily: "Poppins",
                          padding: "4px 8px",
                          borderRadius: "8px",
                          backgroundColor: "#141416",
                        }}
                      >
                        {values[0].toFixed(1)}
                      </div>
                    </div>
                  )}
                />
                <div className={styles.scale}>
                  <div className={styles.number}>0.01 ETH</div>
                  <div className={styles.number}>10 ETH</div>
                </div>
              </div>
              <div className={styles.group}>
                <div className={styles.item}>
                  <div className={styles.label}>Price</div>
                  <Dropdown
                    className={styles.dropdown}
                    value={price}
                    setValue={setPrice}
                    options={priceOptions}
                    fx={(price: any) => changeQuery(price)}
                  />
                </div>
                <div className={styles.item}>
                  <div className={styles.label}>Like</div>
                  <Dropdown
                    className={styles.dropdown}
                    value={likes}
                    setValue={setLikes}
                    options={likesOptions}
                    fx={function () {}}
                  />
                </div>
                <div className={styles.item}>
                  <div className={styles.label}>Color</div>
                  <Dropdown
                    className={styles.dropdown}
                    value={color}
                    setValue={setColor}
                    options={colorOptions}
                    fx={function () {}}
                  />
                </div>
                <div className={styles.item}>
                  <div className={styles.label}>Creator</div>
                  <Dropdown
                    className={styles.dropdown}
                    value={creator}
                    setValue={setCreator}
                    options={creatorOptions}
                    fx={function () {}}
                  />
                </div>
              </div>
              <div className={styles.reset}>
                <Icon name="close-circle-fill" size="24" />
                <span>Reset filter</span>
              </div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.list}>
                {filtered.map((x: any, index: any) => (
                  <Card className={styles.card} item={x} key={index} />
                ))}
              </div>
              <div className={styles.btns}>
                <button className={cn("button-stroke", styles.button)}>
                  <span>Load more</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
