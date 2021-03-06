import React from "react";
import Link from "next/link";
import cn from "classnames";
// import styles from "./UploadVariants.module.sass";
import styles from "./UploadVariants.module.sass";
import Control from "../../components/Control/control";
import Footers from "../../components/Footer/footer";
import Headers from "../../components/Header/header";

const breadcrumbs = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Upload Item",
  },
];

const control = {
  title: "Back to home",
  url: "/",
};

const items = [
  {
    url: "/upload/digital",
    buttonText: "Create Digital",
    image: "/images/content/upload-pic-1.jpg",
    image2x: "/images/content/upload-pic-1@2x.jpg",
  },
  {
    url: "/upload/physical",
    buttonText: "Create Physical",
    image: "/images/content/upload-pic-2.jpg",
    image2x: "/images/content/upload-pic-2@2x.jpg",
  },
];

const Upload = () => {
  return (
    // page
    <>
      {/* <Headers /> */}
      <div className={styles.page}>
        <Control
          className={styles.control}
          item={breadcrumbs}
          control={control}
        />
        <div className={cn("section-pt80", styles.section)}>
          <div className={cn("container", styles.container)}>
            <div className={styles.top}>
              <h1 className={cn("h2", styles.title)}>Upload item</h1>
              <div className={styles.info}>
                Choose <span>&quot;Digital&quot;</span> if you want to create
                digital collectibles or <span>&quot;Physical&quot;</span> if you
                want to manifest digital NFTs in the physical world
              </div>
            </div>
            <div className={styles.list}>
              {items.map((x, index) => (
                <div className={styles.item} key={index}>
                  <div className={styles.preview}>
                    <img
                      srcSet={`${x.image2x} 2x`}
                      src={x.image}
                      alt="Upload"
                    />
                  </div>
                  <Link href={x.url}>
                    <button className={cn("button-stroke", styles.button)}>
                      {x.buttonText}
                    </button>
                  </Link>
                </div>
              ))}
            </div>
            <div className={styles.note}>
              We do not own your private keys and cannot access your funds
              without your confirmation.
            </div>
          </div>
        </div>
      </div>
      {/* <Footers /> */}
    </>
  );
};

export default Upload;
