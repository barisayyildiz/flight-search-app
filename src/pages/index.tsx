import FlightList from "@/components/FlightList"
import { SearchForm } from "@/components/SearchForm"

export default function Home() {
  return (
    <div style={{
      marginTop: '100px'
    }}>
      <SearchForm />
      <FlightList></FlightList>
    </div>
  )
}
