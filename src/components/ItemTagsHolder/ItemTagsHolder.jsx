/* eslint-disable react/no-array-index-key */
import { List, Chip } from '@mui/material'

const ItemTagsHolder = ({ tags }) => {
  return (
    <List sx={{ position: 'absolute' }}>
      {tags && tags.map((tag, idx) => <Chip color="success" key={idx} label={tag} sx={{ mr: 1 }} />)}
    </List>
  )
}

export default ItemTagsHolder
