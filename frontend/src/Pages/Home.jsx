import Banner from '../Components/Banner/Banner'
import Footer from '../Components/Footer/Footer'
import Products from './Products/Products'

export default function Home() {
  return (
    <div>
      <div className="banner">
        <Banner />
      </div>
      <div>
        <Products />
      </div>
        <Footer />
    </div>
  )
}
