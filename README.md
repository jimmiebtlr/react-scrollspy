# Why

Existing solutions pollute the global space.

# Use

Scrollspy clone for react

 
   class App extends React.Component {
      constructor(props) {
        super(props);
        this.state = {};
      }

      render() {
        return (<ScrollSpy navType="Nav">
          <Nav isNav="true"/>
          <Section navRoute="section1">Section 1</Section>
          <Section navRoute="section2">Section 2</Section>
          <Section navRoute="section3">Section 3</Section>
          <Section navRoute="section4">Section 4</Section>
          <Section navRoute="section5">Section 5</Section>
        </ScrollSpy>);
      }
    }


    class Nav extends React.Component {
      render(){
        // To smooth scroll to one of the sections
        // this.props.navTo('section1');

        // Active Route
        return this.props.active
      }
    }


# Design

Scrolling must happen in the scrollspy component.  This allows us to keep all login in the scrollspy component, and keep things clean.
