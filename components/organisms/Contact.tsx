import React from "react";
import { Columns } from "components/atoms/Columns";
import { Column } from "components/atoms/Column";

export const Contact = () => {
  return (
    <>
      <form
        action="//formspree.io/mugen.xyz@gmail.com"
        method="post"
        className="form"
      >
        <input type="text" name="_gotcha" hidden />
        <Columns>
          <Column>
            <label className="label" htmlFor="form-name">
              Name
            </label>
            <input className="input" type="text" id="form-name" name="name" />
          </Column>
          <Column>
            <label className="label" htmlFor="form-email">
              Email
            </label>
            <input
              className="input"
              type="email"
              id="form-email"
              name="email"
            />
          </Column>
        </Columns>
        <label className="label" htmlFor="form-message">
          Message
        </label>
        <textarea
          className="textarea"
          rows={8}
          name="message"
          id="form-message"
          required
        ></textarea>
        <input className="submit" type="submit" value="Submit" />
      </form>
      <style jsx>{`
        @import "css/mixins";

        .form {
          margin: 2rem auto 5rem;
          position: relative;
          width: 100%;
          @include mqMin(md) {
            max-width: 80%;
          }
        }
        .label {
          display: block;
          padding: 0 0.8rem;
          line-height: 2.2;
          font-size: 0.9rem;
          position: absolute;
          color: var;
          width: 100%;
          box-sizing: border-box;
          text-transform: uppercase;
          &:hover {
            cursor: pointer;
          }
        }
        .input,
        .textarea {
          border: 0;
          margin-bottom: 1rem;
          border-radius: 0.8rem;
          background: transparent;
          display: block;
          width: 100%;
          padding: 1.5rem 0.8rem 0.8rem;
          line-height: 1.7;
          outline: none;
          box-sizing: border-box;
          transition: var(--default-transition);
          appearance: none;
          color: inherit;
          background: var(--bg-color);
          box-shadow: inset 5px 5px 10px var(--shadow-color),
            inset -5px -5px 10px var(--light-color);
          &:last-of-type {
            border-bottom-width: 1px;
          }
          &:hover,
          &:focus {
            background-color: var(--bg-color--focus);
          }
        }
        .textarea {
          resize: vertical;
        }
        .submit {
          width: 100%;
          font-family: var(--font-family);
          display: block;
          font-size: 0.85rem;
          font-weight: bold;
          margin: 1rem 0;
          padding: 0.8rem 0;
          text-align: center;
          text-transform: uppercase;
          border: 0;
          border-radius: 999px;
          outline: none;
          transition: var(--default-transition);
          background: var(--bg-color);
          box-shadow: var(--box-shadow);
          color: inherit;
          &:active {
            box-shadow: var(--box-shadow--active);
          }
        }
      `}</style>
    </>
  );
};
