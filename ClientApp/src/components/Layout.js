import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { Footer } from './Footer'
import { Header } from './Header'
import { IncludedScripts } from './IncludedScripts'

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
        <>
            <Header></Header>  
            <div>
                <Container tag="main">
                    {this.props.children}
                </Container>
            </div>
            <Footer></Footer>
        </>
    );
  }
}
