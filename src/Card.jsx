const Card = ({title, value}) => {
  return (
    <div className="card">
        <p className="card-value">{value}</p>
        <p className="card-title">{title}</p>
    </div>
  )
}

export default Card