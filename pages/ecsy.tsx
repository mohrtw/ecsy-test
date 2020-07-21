import dynamic from 'next/dynamic'
const Scene = dynamic(() => import('../components/xr/ecsy'), { ssr: false })

export const IndexPage = () => {
  return (
      <Scene />
  )
}

export default IndexPage
