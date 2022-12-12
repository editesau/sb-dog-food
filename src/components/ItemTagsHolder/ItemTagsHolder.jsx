/* eslint-disable react/no-array-index-key */
import ItemTag from '../ItemTag/ItemTag'
import itemTagsHolderStyles from './itemTagsHolder.module.css'

const ItemTagsHolder = ({ tags }) => {
  return (
    <div className={`${itemTagsHolderStyles.tags} d-flex flex-row justify-content-start`}>
      {tags && tags.map((tag, idx) => <ItemTag key={idx} tag={tag} />)}
    </div>
  )
}

export default ItemTagsHolder
