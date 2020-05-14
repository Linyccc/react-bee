import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './css/style.less';
import Pic from './img/pic.png';

const Welcome = () => {
  return (
    <>
      <div className={styles.welcome}>
        <div className={styles.txt}>
          <div className={styles['middle-item']}>
            <b className={styles['middle-item-hack']} />
            <div className={styles['middle-item-body']}>
              <h1>欢迎来到</h1>
              <h2>{formatMessage({ id: 'app.title' })}</h2>
              <p>您的工作台暂未配置模板</p>
            </div>
          </div>
        </div>
        <div className={styles.pic}>
          <div className={styles['middle-item']}>
            <b className={styles['middle-item-hack']} />
            <div className={styles['middle-item-body']}>
              <div className={styles['middle-item-img']}>
                <img src={Pic} width="400" height="306" alt="pic" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
