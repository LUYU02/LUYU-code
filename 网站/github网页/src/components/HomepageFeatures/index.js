import React from "react"
import clsx from "clsx"
import styles from "./styles.module.css"

const FeatureList = [
  {
    title: "易于使用",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>DoDocusaurus的设计从地面上很容易安装和使用，让你的网站快速运行。</>
    ),
  },
  {
    title: "专注于重要的事情",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        Docusaurus让你专注于你的文档，而我们将做这些杂事。去吧，把你的文档移到{" "}
        <code>文档</code>目录中。
      </>
    ),
  },
  {
    title: "由React提供技术支持",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        通过重用React扩展或自定义网站布局。Docusaurus可以在重复使用相同的页眉和页脚时进行扩展。
      </>
    ),
  },
]

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className='text--center'>
        <Svg className={styles.featureSvg} role='img' />
      </div>
      <div className='text--center padding-horiz--md'>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className='container'>
        <div className='row'>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
