import './globals.css';
import { ReactNode } from 'react';
import Script from 'next/script';

export const metadata = {
  title: '体脂肪率から理想体重を計算｜減量シミュレーター',
  description:
    '体脂肪率を入力するだけで、脂肪だけを減らした理想体重を自動計算できる無料ツール。減量やボディメイクの計画に活用できます。',
  keywords: [
    '体脂肪率',
    '理想体重',
    '減量シミュレーター',
    'ボディメイク',
    'ダイエット計算',
    '除脂肪体重',
    '脂肪量',
  ],
  openGraph: {
    title: '体脂肪率から理想体重を計算｜減量シミュレーター',
    description:
      '脂肪だけを減らした理想体重を自動計算！ボディメイクや減量の道しるべに。',
    url: 'https://fat-loss-calc.vercel.app', // あなたの本番URLに変更してください
    siteName: '脂肪減少シミュレーター',
    locale: 'ja_JP',
    type: 'website',
  },
  metadataBase: new URL('https://fat-loss-calc.vercel.app'), // 本番URLに必ず変更
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        {/* ✅ title / description / keywords */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(', ')} />

        {/* ✅ Google Search Console 所有権確認用（↓この content 値はご自身のに変更） */}
        <meta name="google-site-verification" content="44tlgfxO8Fea-BwnUK5BSRIatba6d9H6-CarKK5ek8s" />

        {/* ✅ OGP設定 */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:locale" content={metadata.openGraph.locale} />
        <meta property="og:type" content={metadata.openGraph.type} />

        {/* Google Analytics 4 スクリプト（G-XXXXXXX を自分のIDに変更） */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-611HQDEQM7"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-611HQDEQM7', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* favicon（任意） */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
