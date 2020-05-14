import React, { Component } from 'react';
import { Icon, Carousel } from 'antd';
import styles from './index.less';

const HeartSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);
const HeartIcon = props => <Icon component={HeartSvg} {...props} />;

class Page extends Component {
  state = {};

  render() {
    const pageHtml = (
      <div className={styles.noHead} style={{ backgroundColor: '#232455' }}>
        <div>
          <img
            className={styles.titleTopImg}
            src={require('./img/publicity_top_title.jpg')}
            alt=""
          />
        </div>
        <div className={styles.ruleContentDiv}>
          <div className={styles.ruleDiv}>
            <div className={styles.ruleTitleDiv}>
              <img className={styles.ruleImg} src={require('./img/ruleImg.png')} alt="" />
            </div>
            <div className={styles.ruleTextDiv}>
              <p>1、加入全球通俱乐部即可报名参与骑士学院活动 </p>
              <p>2、推荐小朋友年龄为4~12岁、身高为110cm ~ 160cm、体重不超过120斤</p>
            </div>
          </div>

          <div className={styles.bottomTextDiv}>
            <HeartIcon style={{ color: '#b348b3', fontSize: '16px' }} />
            <span className={styles.text}>14:30-15:00 骑士入营</span>
            <HeartIcon style={{ color: '#b348b3', fontSize: '16px' }} />
          </div>
          <img className={styles.lineImg} src={require('./img/early_look_line.png')} alt="" />
        </div>

        <div className={styles.content1}>
          <div className={styles.titleDiv}>
            <div className={styles.titleText}>14:30-15:00 骑士入营</div>
          </div>
          <div className={styles.imgDiv1}>
            <Carousel autoplay>
              <img className={styles.imgImg} src={require(`./img/pic2.png`)} alt="" />
              <img className={styles.imgImg} src={require(`./img/pic2.png`)} alt="" />
            </Carousel>
          </div>
          <div className={styles.textDiv1}>
            为小骑士举办入营仪式，集合准备开展后续活动为小骑士举办入营仪式，集合准备开展后续活动
          </div>
        </div>
        <div className={styles.content1}>
          <div className={styles.titleDiv}>
            <div className={styles.titleText}>14:30-15:00 骑士入营骑士入营</div>
          </div>
          <div className={styles.imgDiv1}>
            <img className={styles.imgImg} src={require(`./img/pic2.png`)} alt="" />
          </div>
          <div className={styles.textDiv1}>为小骑士举办入营仪式，集合准备开展后续活动</div>
        </div>
      </div>
    );

    return <div>{pageHtml}</div>;
  }
}

export default Page;
