import React, { Component } from 'react'
import styled from '@emotion/styled'

const Container = styled('div', {
  height: '100%',
  width: '100%'
})

export class Mobile extends Component {
  render() {
    return <Container>mobile!</Container>
  }
}

export default Mobile
