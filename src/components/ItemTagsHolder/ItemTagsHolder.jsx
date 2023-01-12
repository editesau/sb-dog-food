/* eslint-disable react/no-array-index-key */
import ItemTag from '../ItemTag/ItemTag'
import styles from './ItemTagsHolder.module.scss'

const ItemTagsHolder = ({ tags, productDiscount }) => {
  return (
    <div className={styles.itemTags}>
      {productDiscount !== 0 && <ItemTag tag={`-${productDiscount}%`} />}
      {tags && tags.map((tag, idx) => <ItemTag key={idx} tag={tag} />)}
    </div>
  )
}

export default ItemTagsHolder
