// import Layout from '../components/ui/Layout'
import dynamic from 'next/dynamic'
const Scene = dynamic(() => import('../components/xr/index'), { ssr: false })

export const IndexPage = () => {
  return (
      <Scene />
  )
}

export default IndexPage
