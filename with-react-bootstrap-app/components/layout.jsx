import Navbar from './navbar'
import Footer from './footer'
 
export default function Layout({ children }) {
  return (
    <>
    <link src="../index.css"></link>
      <Navbar />
      <main>{children}</main>
      <Footer class="mt-auto"/>
    </>
  )
}