import React, { useEffect } from 'react'
import { Button, Card, Col, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../Redux/slice/productSlice'
import { addToWishList } from '../Redux/slice/wishListSlice'
import { addToCart } from '../Redux/slice/cartSlice'
import Header from '../Components/Header'

function Home() {
  const dispatch = useDispatch()
 const{loading,products,error}=useSelector((state)=>state.productReducer)
 const wishlist=useSelector((state)=>state.wishlistReducer.wishlist)
 const cart=useSelector((state)=>state.cartReducer)

 
 useEffect(()=>{
  dispatch(fetchProducts())
 },[])

const handleWishlist=(product)=>{
  const existingProduct = wishlist.find(item=>item?.id==product?.id)
  if(existingProduct){
    alert("product already exist in wishlist")
  }else{
     dispatch(addToWishList(product))
  }
}

const handleCart=(product)=>{
  const existingProduct = cart?.find(item=>item.id==product.id)
if(existingProduct){
  dispatch(addToCart(product))
  alert("items added")
}else{
  dispatch(addToCart(product))
  alert("item added")
}

}




  return (
    
   <>
   <Header insideHome={true}/>
   
    <div style={{marginTop:"70px"}} className='mt-5 container d-flex justify-content-center align-ietms-center'>
   
   {
   loading?
   <div className='text-center mt-5'>
   <Spinner animation="border" variant="warning" /> Loading...
   </div>:
   
   <Row className='mt-5 container d-flex justify-content-between'>
    {
     products?.length>0?products.map((product,index)=>(
       <Col key={index} className="mt-5" sm={12} md={6} lg={4} xl={3}>
       <Card style={{ width: '18rem',height:"350px" }}>
    <Link to={`/view/${product.id}`}> <Card.Img variant="top" style={{width:"100%",height:"166px"}} src={product.thumbnail} /></Link>
     <Card.Body>
       <Card.Title>{product.title}</Card.Title>
       <Card.Text>
       {product.description.slice(0,20)}
       </Card.Text>
       <div className='d-flex justify-content-between'>
            <Button className='btn btn-light' onClick={()=>handleWishlist(product)} ><i className='fa-solid fa-heart text-danger '></i></Button>
            <Button className='btn btn-light' onClick={()=>handleCart(product)} ><i className='fa-solid fa-cart-shopping text-warning '></i></Button>
            </div>
     </Card.Body>
   </Card>
       </Col>
     )):<div className='fw-bolder mt-5 mb-5'>
       <p className='text-danger'>Nothing to Display</p>
     </div>
  }
   </Row>}
 </div>
   
   </>
  )
}

export default Home