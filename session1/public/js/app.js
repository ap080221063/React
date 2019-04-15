class ProductList extends React.Component {

    /* constructor(props) {
        super(props)
        
        this.state={
            products: [],
        }

        this.handleProductUpVote = this.handleProductUpVote.bind(this);
        
    } */


    state = {
        products: [],
    }

    
    componentDidMount() {
        this.setState({
            products: Seed.products,
        })
    }
    
    

    handleProductUpVote = (productId) =>{
        console.log(`O Produto com o id: ${productId} foi votado.....`);
       /*  Seed.products.forEach( product => {
            if(product.id === productId){
                product.votes = product.votes + 1;
                debugger;
            }
        }) */
        const newProducts = this.state.products.map( product => {
            if( product.id === productId ){
                return Object.assign({}, product, {votes: product.votes + 1});
            } else {
                return product;
            }
        });
        this.setState({
            products: newProducts,
        })

    }

  render() {
    const sortedProducts = this.state.products.sort( (a,b) => (b.votes - a.votes) );
    const products = sortedProducts.map( product => (
        <Product 
            id={product.id}
            key={'product-'+product.id}
            title={product.title}
            description= {product.description}
            url={product.url}
            votes={product.votes}
            submitterAvatarUrl={product.submitterAvatarUrl}
            productImageUrl={product.productImageUrl}
            onVote={this.handleProductUpVote}
        />
    ));
    /* const products = sortedProducts.map( function(product){
        return (
        <Product 
            id={product.id}
            key={'product-'+product.id}
            title={product.title}
            description= {product.description}
            url={product.url}
            votes={product.votes}
            submitterAvatarUrl={product.submitterAvatarUrl}
            productImageUrl={product.productImageUrl}
            onVote={this.handleProductUpVote}
        />
    )}.bind(this)); */
    return (
      <div className='ui unstackable items'>
        {products} 
      </div>
    )
  }
}

class Product extends React.Component {

    /* constructor(props) {
        super(props)
        
        this.handleUpVote = this.handleUpVote.bind(this);
    } */
    


  handleUpVote = () => {
    this.props.onVote(this.props.id);
  }


  render() {
    return (
        <div className='item'>
                <div className='image'>
                    <img src={this.props.productImageUrl} />
                </div>
                <div className='middle aligned content'>
                    <div className='header'>
                        <a onClick={this.handleUpVote}><i className='large caret up icon'></i>
                        {this.props.votes}
                        </a>
                    </div>
                    <div className='description'>
                        <a href={this.props.url}> {this.props.title} </a>
                        <p> {this.props.description} </p>
                    </div>
                    <div className='extra'>
                        <span>Submitted by: </span>
                        <img className='ui avatar image' src={this.props.submitterAvatarUrl} />
                    </div>
                </div>
        </div>
    )
  }
}


ReactDOM.render(
    <ProductList />,
    document.getElementById('content')
)