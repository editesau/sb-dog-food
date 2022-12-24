const CounterControl = ({ count, setCount }) => {
  const changeCountHandler = (e) => {
    setCount(parseInt(e.target.value, 10))
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <input type="number" min={1} max={10} className="form-control mx-2" value={count} onChange={changeCountHandler} />
    </div>
  )
}

export default CounterControl
