import { CSSProperties } from "react";
import { Column } from "components/atoms/Column";
import { Columns } from "components/atoms/Columns";
import styles from "./product.module.scss";

interface Props {
  id: string;
  name: string;
  icon: string;
  url: string;
  itemType: string;
  applicationCategory: string;
  operatingSystem: string;
  desc: string;
  reverse?: boolean;
  screenshot: string;
  imgOption: {
    style?: CSSProperties;
    width: number;
    height: number;
  };
}

export const Product = (props: Props) => {
  const order = +!!props.reverse;
  return (
    <div className={styles.root}>
      <Columns itemScope itemType={props.itemType}>
        <Column style={{ order }}>
          <img
            src={props.screenshot}
            alt={`${props.name}'s screenshot`}
            className={styles.ss}
            width={props.imgOption.width}
            height={props.imgOption.height}
            loading="lazy"
            style={props.imgOption.style}
          />
        </Column>
        <Column centering>
          <section id={props.id}>
            <a href={props.url} itemProp="url" className={styles.blockAnchor}>
              <div className={styles.media}>
                <div className={styles.left}>
                  <img
                    loading="lazy"
                    src={props.icon}
                    width="64"
                    className={styles.icon}
                    height="64"
                    alt=""
                    itemProp="image"
                  />
                </div>
                <div className={styles.right}>
                  <h3 className={styles.title} itemProp="name">
                    <span className={styles.titleText}>{props.name}</span>
                  </h3>
                  <meta
                    itemProp="applicationCategory"
                    content={props.applicationCategory}
                  />
                  <meta
                    itemProp="operatingSystem"
                    content={props.operatingSystem}
                  />
                  <p className={styles.desc} itemProp="description">
                    {props.desc}
                  </p>
                </div>
              </div>
            </a>
          </section>
        </Column>
      </Columns>
    </div>
  );
};
