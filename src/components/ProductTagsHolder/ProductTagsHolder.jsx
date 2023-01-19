/* eslint-disable react/no-array-index-key */
import ProductTag from '../ProductTag/ProductTag'
import styles from './ProductTagsHolder.module.scss'

const ProductTagsHolder = ({ tags, productDiscount }) => {
  const renderDiscountTag = () => {
    if (productDiscount) return <ProductTag tag={`-${productDiscount}%`} />
    return undefined
  }
  const renderTagsList = () => {
    if (tags) return tags.map((tag, idx) => <ProductTag key={idx} tag={tag} />)
    return undefined
  }
  return (
    <div className={styles.productTags}>
      {renderDiscountTag()}
      {renderTagsList()}
    </div>
  )
}

export default ProductTagsHolder
