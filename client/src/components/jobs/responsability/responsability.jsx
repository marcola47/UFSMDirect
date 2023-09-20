export default function JobResponsability({ itemData: responsability })
{
  return (
    <div className="responsability">
      <div className="responsability__comp">
        { responsability.name }
      </div>
    </div>
  )
}