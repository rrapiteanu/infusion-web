import Link from 'next/link';
import * as React from 'react';
import Layout from './../components/ui/Layout/Layout';

const AboutPage: React.FunctionComponent = () => (
  <Layout>
    <p>This is the about page</p>
    <p><Link href='/'><a>Go home</a></Link></p>
  </Layout>
)

export default AboutPage;
