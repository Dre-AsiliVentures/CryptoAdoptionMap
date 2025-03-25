//app/page.tsx
import WorldMap from './components/app/WorldMap';
export default function Home() {
  return (
    <main className="min-h-screen p-10 bg-darkBg">
      <h1 className="text-4xl font-bold text-futuristic mb-10">⚡ World Crypto Adoption Summary </h1>
      <WorldMap/>
    </main>
  )
}
