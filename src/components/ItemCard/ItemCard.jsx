import {
  AddShoppingCart, FavoriteBorder, Favorite,
} from '@mui/icons-material'
import {
  Grid, Card, CardMedia, CardContent,
  Typography, Box, CardActions, CardActionArea, IconButton, Divider,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../../store/slices/cartSlice'
import ItemTagsHolder from '../ItemTagsHolder/ItemTagsHolder'

const ItemCard = ({ product }) => {
  const dispatch = useDispatch()

  const cart = useSelector((store) => store.cart)
  // const isInCart = cart.findIndex((cartItem) => cartItem.id === product._id) !== -1

  const cartHandler = () => {
    dispatch(addItem({ id: product._id, count: 1 }))
  }

  const isFavorite = true

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CardActionArea>
          <ItemTagsHolder tags={product.tags} />
          <CardMedia sx={{ height: 200 }} image={product.pictures} className="card-img-top" alt={product.name} />

          <CardContent>
            <Typography align="center" noWrap variant="body1" component="h3">{product.name}</Typography>
            <Divider sx={{ my: 2 }} />
            {product.wight && (
            <Typography variant="body2">
              Capacity:
              {' '}
              {product.wight}
            </Typography>
            )}
            <Box>
              <Typography
                variant="body1"
                sx={product.discount ? { textDecoration: 'line-through' } : {}}
              >
                {product.price}
                {' '}
                ₽
              </Typography>
              {product.discount !== 0 && (
              <Typography variant="body1" sx={{ color: 'red' }}>
                {Math.round(product.price * ((100 - product.discount) / 100))}
                {' '}
                ₽
              </Typography>
              )}
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ mt: 'auto' }}>
          {isFavorite
            ? (
              <IconButton sx={{ ml: 'auto' }} color="error">
                <Favorite />
              </IconButton>
            )
            : (
              <IconButton color="primary">
                <FavoriteBorder />
              </IconButton>
            )}
          <IconButton
            color="primary"
            disabled={product.stock <= cart.find(
              (cartItem) => cartItem.id === product._id,
            )?.count}
            onClick={cartHandler}
          >
            <AddShoppingCart />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default ItemCard
