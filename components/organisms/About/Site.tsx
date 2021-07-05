import React from "react";
import { Card } from "components/molecules/Card";

export const AboutSite = () => {
  return (
    <Card
      tag="section"
      icon={
        <div
          style={{
            background: "#2c3e50",
            borderRadius: "50%",
            padding: "7px",
          }}
        >
          <img src="/images/logo.svg" alt="logo" width="64" height="64" />
        </div>
      }
      cardTitle="このサイトについて。"
    >
      <meta content="https://unsweets.net/" itemProp="url" />
      <meta
        content="https://unsweets.net/images/large-logo.png"
        itemProp="thumbnailUrl"
      />
      <p>
        <em>
          Since
          <time dateTime="2010-06-10" itemProp="datePublished">
            &nbsp;2010/06/10
          </time>
        </em>
      </p>
      <p itemProp="description about">
        <b itemProp="name">&lt;unsweets/&gt;</b>は
        <span itemProp="author editor publisher">_X_y_z_</span>
        が趣味で運営している個人のウェブサイトです。
      </p>
      <p>ブログもやっています。</p>
      <ul itemScope itemType="http://schema.org/Blog" className="linkList">
        <li itemProp="name">
          <a href="http://blog.unsweets.net/" itemProp="url">
            unsweets.log
          </a>
        </li>
        <li itemProp="name">
          <a href="http://private.unsweets.net/" itemProp="url">
            Konamikan.
          </a>
        </li>
        <li>
          <a href="http://tumblr.unsweets.net/" rel="nofollow" itemProp="url">
            xi
          </a>
        </li>
      </ul>
      <p>
        問い合わせなどは<a href="mailto:mugen.xyz@gmail.com">メール</a>か
        <a href="#contact" className="scroll-down">
          Contact
        </a>
        からどうぞ。
      </p>
      <style jsx>{`
        .linkList {
          list-style: none;
          padding: 0;
          margin: 0 0 1rem;
          display: flex;
          > li {
            display: block;
            margin-right: 1rem;
          }
        }
      `}</style>
    </Card>
  );
};
