/* eslint-disable react/no-array-index-key */
import ItemTag from '../ItemTag/ItemTag'
import styles from './ItemTagsHolder.module.scss'

const ItemTagsHolder = ({ tags, productDiscount }) => {
  const renderDiscountTag = () => {
    if (productDiscount) return <ItemTag tag={`-${productDiscount}%`} />
    return undefined
  }
  const renderTagsList = () => {
    if (tags) return tags.map((tag, idx) => <ItemTag key={idx} tag={tag} />)
    return undefined
  }
  return (
    <div className={styles.itemTags}>
      {renderDiscountTag()}
      {renderTagsList()}
    </div>
  )
}

export default ItemTagsHolder
