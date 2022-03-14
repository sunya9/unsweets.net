import { Columns } from "components/atoms/Columns";
import { Column } from "components/atoms/Column";
import styles from "./contact.module.scss";

export const Contact = () => {
  return (
    <>
      <form
        action="//formspree.io/mugen.xyz@gmail.com"
        method="post"
        className={styles.form}
      >
        <input type="text" name="_gotcha" hidden />
        <Columns>
          <Column>
            <label className={styles.label} htmlFor="form-name">
              Name
            </label>
            <input
              className={styles.input}
              type="text"
              id="form-name"
              name="name"
            />
          </Column>
          <Column>
            <label className={styles.label} htmlFor="form-email">
              Email
            </label>
            <input
              className={styles.input}
              type="email"
              id="form-email"
              name="email"
            />
          </Column>
        </Columns>
        <label className={styles.label} htmlFor="form-message">
          Message
        </label>
        <textarea
          className={styles.textarea}
          rows={8}
          name="message"
          id="form-message"
          required
        ></textarea>
        <input className={styles.submit} type="submit" value="Submit" />
      </form>
    </>
  );
};
