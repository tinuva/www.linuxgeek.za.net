import clsx from 'clsx';
import Heading from '@theme/Heading';
import QRCode from "react-qr-code";
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Automation',
    description: (
      <>
        The Internet of things (IoT) describes physical sensors that connect and exchange data. 
        AI allows us to interpret the collected data and automate processes.
      </>
    ),
  },
  {
    title: 'Development',
    description: (
      <>
        Full-Stack Web development is the work involved in developing web services. 
        Web development ranges from backend engineering, Web servers & Databases, 
        Web content development, data visualization and network security.
      </>
    ),
  },
  {
    title: 'DevOps',
    description: (
      <>
        DevOps is a set of practices that combines software development (Dev) and IT operations (Ops). 
        It aims to shorten the systems development life cycle and provide continuous delivery with high software quality.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {/* <Svg className={styles.featureSvg} role="img" /> */}
        <QRCode value={title} size={150} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
