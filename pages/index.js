import Link from "next/link"

const Pokemon = ({ pokemon }) => {

  // console.log(pokemon.url.split('/').filter(x => x).pop())
  const id = pokemon.url.split('/').filter(x => x).pop()
  return (
    <li><Link href={`/pokemones/${id}`}>{pokemon.name}</Link></li>
  )
}

export default function Pokemones({ pokemones }) {
  // console.log(pokemones)
  return (
    <div>
      <p>Pokemones</p>
      <ul>
        {pokemones.map(pokemon => <Pokemon pokemon={pokemon} key={pokemon.name} />)}
      </ul>
    </div>
  )
}

// getStaticProps is a function that allows us to tell Next that this page is going to be generated statically when we run npm run build
export const getStaticProps = async () => {
// we call a free pokeAPI API, to get a list of pokemon, we define a maximum of 151 pokemon
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  const data = await response.json()

  return {
// must have the props property, otherwise the properties will not be passed to the Pokemon component.
    props: { pokemones: data.results }
  }

}
