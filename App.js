import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Image, 
    Alert,  
    TextInput, 
    ScrollView } from 'react-native';
    import { 
    Container, 
    Header, 
    Content, 
    Footer, 
    FooterTab,
    Button, 
    Icon, 
    Thumbnail, 
    Fab, 
    Item, 
    Input, 
    Card, 
    CardItem, 
    Left,
    Right,
    Body } from 'native-base';
    import axios from 'axios';

class Ones extends Component {
    constructor(){
        super();
        this.state={nm:'', food:[],
        };
      }
      
      searching(){
        const search=this.state.nm;
        var url='https://developers.zomato.com/api/v2.1/search?q='+search
        var config={
            headers:{'user-key':'ed9fcbcf21efce3d06847907512f366d'}
            }
        axios.get(url, config)
        .then((getdata)=>{
          console.log(getdata.data.restaurants);
          this.setState({
            food:getdata.data.restaurants,
          })
        })
      };  
    
      render() {
          const data = this.state.food.map((item, index)=>{
            var name = item.restaurant.name;
            var city = item.restaurant.location.city;
            var img = item.restaurant.thumb;
            var addr = item.restaurant.location.address;
            var pay = item.restaurant.average_cost_for_two;
            var price = pay/2
            return ( 
                  <Card avatar key={index}>
                      <CardItem header>
                          <Left>
                              <Thumbnail source={{uri:img}} />
                                <Body>
                                  <Text>{name}</Text>
                                  <Text note>{city}</Text>
                                </Body>
                          </Left>
                          <Right>
                              <Text> Rp. {price} </Text>
                          </Right>
                      </CardItem>
                      <CardItem cardBody>
                          <Image source={{uri:img }} style={{height:300, width:300, flex:1}} />
                      </CardItem>
                      <CardItem footer>
                          <Left><Button transparent><Icon name="home" /><Text>{addr}</Text></Button></Left>
                      </CardItem>
                  </Card>  
            )
          })
        return (
          <Container>
              <Header searchBar rounded>
                  <Item>
                      <Icon name="search" />
                      <Input placeholder="Searching Food..." onChangeText={(x)=>{this.setState({nm:x})}} />
                      <Icon name="people" onPress={()=>{this.searching()}} />
                  </Item>
              </Header>
              <ScrollView>
                    {data}        
              </ScrollView>
                  <Footer><FooterTab>
                      <Button vertical active><Icon name="apps" />
                          <Text> Apps </Text>
                      </Button>
                      <Button vertical><Icon name="camera" />
                          <Text> Camera </Text>
                      </Button>
                      <Button vertical><Icon active name="navigate" />
                          <Text> Navigate </Text>
                      </Button>
                  </FooterTab></Footer>
          </Container>
        );
      }
    }
export default Ones;