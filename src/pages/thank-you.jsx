import { SimpleLayout } from '@/components/SimpleLayout'
import SEO from '@/components/SEO'

import homepage from '../data/homepage.json'

export default function ThankYou() {
  return (
    <>
      <SEO
        title={`Kamu Berlangganan - ${homepage.tabTitle}`}
        description="Terima kasih sudah berlangganan ke Blog H. Ayep Zaki. Dapatkan informasi terbaru seputar kegiatan Wali Kota Sukabumi."
        canonical="/thank-you"
        noindex={true}
      />
      <SimpleLayout
        title="Terima kasih sudah berlangganan."
        intro="Saya akan mengirim email ketika Blog ter-publish. Kamu dapat berhenti berlangganan kapanpun."
      />
    </>
  )
}
