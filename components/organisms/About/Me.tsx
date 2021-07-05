import React from "react";
import { MapPin, Gift } from "react-feather";
import { SNSButton } from "components/atoms/SNSButton";
import { Card } from "components/molecules/Card";
import { Icon } from "components/atoms/Icon";

export const AboutMe = () => {
  return (
    <Card
      tag="section"
      itemScope
      itemType="http://schema.org/Person"
      icon={
        <img
          src="https://s.gravatar.com/avatar/3af6af8a2790b9882b8468759a4a3a29?s=256"
          alt=""
          width="256"
          height="256"
          className="avatar"
        />
      }
      cardTitle="「えくす」と言います。"
    >
      <ul className="info">
        <li>
          <span className="icon">
            <MapPin aria-label="Location" />
          </span>
          <span itemProp="homeLocation">Arakawa-ku, Tokyo</span>
        </li>
        <li>
          <span className="icon">
            <Gift aria-label="Birthday" />
          </span>
          <span itemProp="birthDate">
            <time dateTime="1994-12-01">1994/12/01</time>
          </span>
        </li>
      </ul>

      <p itemProp="description">
        えくすの他に<span itemProp="alternateName">シューニャ(sunya)</span>
        も使います。IDとしては
        <b>_X_y_z_</b>や<b>sunya9</b>と言ったものが多めです。
      </p>
      <p>甘いものと可愛いものが好き。</p>
      <ul className="linkList">
        <li>
          <SNSButton
            href="https://twitter.com/_X_y_z_"
            rel="nofollow"
            aria-label="Twitter"
          >
            <Icon icon="Twitter" />
          </SNSButton>
        </li>
        <li>
          <SNSButton
            href="https://github.com/sunya9"
            rel="nofollow"
            aria-label="GitHub"
          >
            <Icon icon="GitHub" />
          </SNSButton>
        </li>
        <li>
          <SNSButton
            href="https://instagram.com/_x_y_z_"
            rel="nofollow"
            aria-label="Instagram"
          >
            <Icon icon="Instagram" />
          </SNSButton>
        </li>
      </ul>
      <style jsx>{`
        .info {
          margin: 0 -0.5rem;
          padding: 0;
          display: flex;
          font-size: 1rem;
          list-style: none;
          > li {
            margin: 0 0.5rem;
          }
          color: var(--secondary-color);
        }
        .icon {
          vertical-align: middle;
          :global(svg) {
            width: 1rem;
            height: auto;
            margin-right: 0.2rem;
          }
        }

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
        .avatar {
          transition: transform 1s var(--easing);
          &:hover {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Card>
  );
};
