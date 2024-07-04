import Head from 'next/head'

import { SimpleLayout } from '@/components/SimpleLayout'

import homepage from '../data/homepage.json'

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>{`Kamu Berlangganan - ${homepage.tabTitle}`}</title>
        <meta
          name="description"
          content="Terima kasih sudah berlangganan ke Blog Saya."
        />
      </Head>
      <SimpleLayout
        title="Terima kasih sudah berlangganan."
        intro="Saya akan mengirim email ketika Blog ter-publish. Kamu dapat berhenti berlangganan kapanpun."
      />
    </>
  )
}
