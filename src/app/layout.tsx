import './globals.css'
import Header from '@/components/header/header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body >
        <Header></Header>
        {children}
      </body>
    </html>
  )
}
