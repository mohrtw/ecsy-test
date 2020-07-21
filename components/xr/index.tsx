/* eslint-disable no-case-declarations */
import React, { useEffect } from 'react'
// import { Component, System, TagComponent } from 'ecsy'
import { connect } from 'react-redux'

interface Props {
}

// const mapStateToProps = (state: any): Partial<Props> => {
//   return {
//   }
// }

// const mapDispatchToProps = (): Partial<Props> => ({
// })

const IndexComponent: React.FC<Props> = (props: Props) => {
  useEffect(() => {
    // init(projectId).catch((e) => { console.log(e) })
  }, [])

  return (<div> Hello, World! </div>)
}

const IndexComponentWrapper: React.FC<Props> = (props: any) => {
  return <IndexComponent {...props} />
}

export default IndexComponentWrapper

// export default connect(mapStateToProps, mapDispatchToProps)(IndexComponentWrapper)
