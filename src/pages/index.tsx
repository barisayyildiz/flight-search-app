import FlightList from "@/components/FlightList"
import { SearchForm } from "@/components/SearchForm"

export default function Home() {
  return (
    <div style={{
      // margin: '100px',
      margin: '100px auto',
      maxWidth: '1200px'
    }}>
      <SearchForm />
      <FlightList></FlightList>
    </div>
  )
}
