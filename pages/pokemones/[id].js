import Image from "next/image"
import Link from 'next/link'
import { useRouter } from "next/router"

const Pokemon = ({ data }) => {
  const router = useRouter()
  console.log(router)

  return (
    <div>
      <h1>{data.name} number #{data.id}</h1>
      <Image src={data.sprites.front_default} width={400} height={400} alt="Imagen"/>
      <Link href='/'>Home</Link>
    </div>
  )
}

export default Pokemon

export const getStaticProps = async ({ params }) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
  const data = await response.json()

  return { props: { data } }
}

// we must indicate how many dynamic routes, or specifically which dynamic routes it has to generate
export const getStaticPaths = async () => {
// paths must be an array that complies with the following structures, params are the parameters to be received per URL
  const paths = [
    { params: { id: '1' } },
    { params: { id: '2' } },
  ]

  return {
    paths,
    fallback: 'blocking',
  }
}
