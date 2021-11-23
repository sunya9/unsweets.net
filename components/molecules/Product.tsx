import { CSSProperties } from "react";
import { Column } from "components/atoms/Column";
import { Columns } from "components/atoms/Columns";

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
    <div className="root">
      <Columns itemScope itemType={props.itemType}>
        <Column style={{ order }}>
          <img
            src={props.screenshot}
            alt={`${props.name}'s screenshot`}
            className="ss"
            width={props.imgOption.width}
            height={props.imgOption.height}
            loading="lazy"
            style={props.imgOption.style}
          />
        </Column>
        <Column centering>
          <section id={props.id}>
            <a href={props.url} itemProp="url" className="blockAnchor">
              <div className="media">
                <div className="left">
                  <img
                    loading="lazy"
                    src={props.icon}
                    width="64"
                    className="icon"
                    height="64"
                    alt=""
                    itemProp="image"
                  />
                </div>
                <div className="right">
                  <h3 className="title" itemProp="name">
                    <span className="titleText">{props.name}</span>
                  </h3>
                  <meta
                    itemProp="applicationCategory"
                    content={props.applicationCategory}
                  />
                  <meta
                    itemProp="operatingSystem"
                    content={props.operatingSystem}
                  />
                  <p className="desc" itemProp="description">
                    {props.desc}
                  </p>
                </div>
              </div>
            </a>
          </section>
        </Column>
      </Columns>

      <style jsx>
        {`
          @import "css/mixins";

          .title {
            margin: 0 0 0rem;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            font-size: 2rem;
            font-weight: bold;
            padding: 0;
          }

          .desc {
            margin: 0;
          }

          .root :global(.icon) {
            max-width: 48px;
            height: auto;
            padding: 0 0.5rem;
            margin-top: 0.5rem;
            @include mqMin(md) {
              max-width: 64px;
              padding: 0 1rem;
            }
          }
          .left {
            display: flex;
            align-items: center;
          }
          .right {
            flex: 1;
            padding: 0 0.5rem;
          }

          .blockAnchor {
            display: block;
            text-decoration: inherit;
            color: inherit;
          }

          .media {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: start;
          }

          .root :global(.ss) {
            max-height: 50vh;
            width: auto;
            margin: 0 auto;
            display: block;
            max-width: 100%;
            transition: all ease 0.2s;
            position: relative;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            transform: scale(0.95);
            @include mqMin(md) {
              max-height: 80vh;
              width: auto;
              max-width: none;
            }
            &:hover {
              transform: scale(1);
            }
            ${props.imgOption.style}
          }
        `}
      </style>
    </div>
  );
};
