import React from 'react';
import styles from './index.less';

// eslint-disable-next-line no-unused-vars
const TableWrapper = ({ table, pagination, actions, ...restProps }) => (
  <div className={styles.wrapper}>
    {table || null}
    <div className={styles[`advanced-footer`]}>
      <div className={styles[`actions-wrapper`]}>{actions || null}</div>
      <div className={styles[`pagination-wrapper`]}>{pagination || null}</div>
    </div>
  </div>
);

export default TableWrapper;
